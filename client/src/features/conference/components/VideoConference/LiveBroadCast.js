import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff,
  FiRadio, FiUsers, FiCopy, FiMaximize, FiMonitor
} from "react-icons/fi";
import { toast } from "react-toastify";
import SOCKET_URL from "../../../../config/socket";
import ICE_SERVERS from "../../../../config/iceServers";

const LiveBroadCast = () => {
  const navigate = useNavigate();
  const { broadcastID } = useParams();
  const roomID = broadcastID;

  const [started, setStarted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState("");
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const userStream = useRef();
  const socketRef = useRef();
  const peerRefs = useRef([]);
  const videoContainerRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(SOCKET_URL);
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
      peerRefs.current.forEach((p) => {
        try { p.peer?.close(); } catch (_) { }
      });
      peerRefs.current = [];
    };
  }, []);

  const createPeer = (viewerId, stream) => {
    const peer = new RTCPeerConnection(ICE_SERVERS);
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.emit("broadcaster signal", {
          viewerId,
          signal: { type: "ice", candidate: e.candidate },
        });
      }
    };

    peer.createOffer()
      .then((offer) => peer.setLocalDescription(offer))
      .then(() => {
        socketRef.current.emit("broadcaster signal", {
          viewerId,
          signal: { type: "sdp", sdp: peer.localDescription },
        });
      })
      .catch((err) => console.error("[BROADCASTER] Offer error:", err));

    return peer;
  };

  const startBroadCast = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      userStream.current = stream;
      setStarted(true);

      socketRef.current.emit("join broadcast", { roomID, userName: "Broadcaster", userImg: "" });

      // Register listeners ONCE here, nowhere else
      socketRef.current.on("new viewer", ({ viewerId }) => {
        console.log("[BROADCASTER] New viewer:", viewerId);
        const peer = createPeer(viewerId, stream);
        peerRefs.current.push({ viewerId, peer });
        setViewerCount((c) => c + 1);
      });

      socketRef.current.on("viewer signal", ({ signal, viewerId }) => {
        console.log("[BROADCASTER] Viewer signal:", signal.type, "from", viewerId);
        const item = peerRefs.current.find((p) => p.viewerId === viewerId);
        if (!item) return;
        if (signal.type === "sdp" && signal.sdp?.type === "answer") {
          item.peer.setRemoteDescription(new RTCSessionDescription(signal.sdp))
            .catch((err) => console.error("[BROADCASTER] Answer error:", err));
        } else if (signal.type === "ice" && signal.candidate) {
          item.peer.addIceCandidate(new RTCIceCandidate(signal.candidate))
            .catch((err) => console.error("[BROADCASTER] ICE error:", err));
        }
      });
    } catch (err) {
      toast.error("Failed to start broadcast.");
      console.error(err);
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled((prev) => {
      const next = !prev;
      userStream.current?.getVideoTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => {
      const next = !prev;
      userStream.current?.getAudioTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  };

  const hangUp = () => {
    if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
    peerRefs.current.forEach((p) => p.peer?.close());
    if (socketRef.current) socketRef.current.disconnect();
    navigate("/conference", { replace: true });
  };

  const getUrl = () => {
    const url = `${window.location.origin}/broadcast-view/${roomID}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopySuccess("Viewer link copied!");
      setTimeout(() => setCopySuccess(""), 2500);
    });
  };

  const toggleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => { });
    } else {
      document.exitFullscreen?.().catch(() => { });
    }
  };

  const shareScreenBroadcast = async () => {
    if (isSharingScreen) return;
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const camTrack = userStream.current?.getVideoTracks()[0];

      peerRefs.current.forEach(({ peer }) => {
        const sender = peer.getSenders().find((s) => s.track?.kind === "video");
        if (sender) sender.replaceTrack(screenTrack);
      });

      if (videoRef.current) {
        const newStream = new MediaStream([
          screenTrack,
          ...userStream.current.getAudioTracks(),
        ]);
        videoRef.current.srcObject = newStream;
      }
      setIsSharingScreen(true);

      screenTrack.onended = () => {
        peerRefs.current.forEach(({ peer }) => {
          const sender = peer.getSenders().find((s) => s.track?.kind === "video");
          if (sender && camTrack) sender.replaceTrack(camTrack);
        });
        if (videoRef.current && userStream.current) {
          videoRef.current.srcObject = userStream.current;
        }
        setIsSharingScreen(false);
        setIsVideoEnabled(true);
      };
    } catch {
      toast.error("Screen share failed.");
    }
  };

  return (
    <div className="flex h-full w-full relative bg-slate-950 items-center justify-center p-4">
      <div
        ref={videoContainerRef}
        className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
      >
        <video ref={videoRef} muted autoPlay playsInline className="w-full h-full object-cover" />

        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <FiRadio className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Start Live Broadcast</h2>
            <p className="text-slate-400 mb-6">Stream your video to viewers in real-time</p>
            <button
              onClick={startBroadCast}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2"
            >
              <FiRadio /> Go Live
            </button>
          </div>
        )}

        {started && (
          <>
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full" /> LIVE
              </span>
              <span className="bg-slate-900/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5">
                <FiUsers size={12} /> {viewerCount}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              {copySuccess ? (
                <span className="bg-emerald-600/90 text-white text-xs px-3 py-1.5 rounded-full">{copySuccess}</span>
              ) : (
                <button
                  onClick={getUrl}
                  className="bg-slate-900/80 backdrop-blur text-white p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors"
                  title="Copy viewer link"
                >
                  <FiCopy size={16} />
                </button>
              )}
              <button
                onClick={toggleFullscreen}
                className="bg-slate-900/80 backdrop-blur text-white p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors"
                title="Fullscreen"
              >
                <FiMaximize size={16} />
              </button>
            </div>

            <div className="glass-bar">
              <button onClick={toggleAudio} className={isAudioEnabled ? "btn-control" : "btn-control-active"} title="Mic">
                {isAudioEnabled ? <FiMic /> : <FiMicOff />}
              </button>
              <button onClick={toggleVideo} className={isVideoEnabled ? "btn-control" : "btn-control-active"} title="Camera">
                {isVideoEnabled ? <FiVideo /> : <FiVideoOff />}
              </button>
              <button
                onClick={shareScreenBroadcast}
                className={isSharingScreen ? "btn-control-active" : "btn-control"}
                title="Share Screen"
              >
                <FiMonitor />
              </button>
              <button onClick={hangUp} className="btn-control-danger" title="End Broadcast">
                <FiPhoneOff />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveBroadCast;