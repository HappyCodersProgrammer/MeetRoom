/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import {
  FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor,
  FiMessageSquare, FiMessageCircle, FiCopy, FiPhoneOff,
  FiCircle, FiSquare, FiX
} from "react-icons/fi";
import SignleChat from "../../../../components/Chat/SignleChat";
import auth from "../../../../firebase.init";
import SOCKET_URL from "../../../../config/socket";
import ICE_SERVERS from "../../../../config/iceServers";

const SingleRoom = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userImg = user?.photoURL || `https://img.icons8.com/?size=512&id=108296&format=png`;
  const userName = user?.displayName || "Anonymous";
  const { roomID } = useParams();

  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const userStream = useRef();
  const senders = useRef([]);
  const sendChannel = useRef();
  const usersID = useRef();

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPartner, setHasPartner] = useState(false); // ← FIX #1

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const animationRef = useRef(null);
  const isScreenSharing = useRef(false);
  const isRecordingRef = useRef(false);

  // ================== WEBRTC =================
  const handleICECandidateEvent = (e) => {
    if (e.candidate && peerRef.current) {
      socketRef.current.emit("ice-candidate", {
        target: usersID.current,
        candidate: e.candidate,
      });
    }
  };

  const handleTrackEvent = (e) => {
    if (partnerVideo.current) partnerVideo.current.srcObject = e.streams[0];
    setHasPartner(true); // ← FIX #1
  };

  const createPeer = useCallback((userID) => {
    const peer = new RTCPeerConnection(ICE_SERVERS);
    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    return peer;
  }, []);

  const handleNegotiationNeededEvent = useCallback((userID) => {
    if (!peerRef.current) return;
    peerRef.current.createOffer()
      .then((offer) => peerRef.current.setLocalDescription(offer))
      .then(() => {
        socketRef.current.emit("offer", {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleRecieveCall = useCallback((incoming) => {
    peerRef.current = createPeer();
    peerRef.current.ondatachannel = (event) => {
      sendChannel.current = event.channel;
      sendChannel.current.onmessage = handleReceiveMessage;
    };
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current.setRemoteDescription(desc)
      .then(() => {
        userStream.current.getTracks().forEach((track) => {
          const sender = peerRef.current.addTrack(track, userStream.current);
          senders.current.push(sender); // ← FIX #2: callee must store senders too
        });
      })
      .then(() => peerRef.current.createAnswer())
      .then((answer) => peerRef.current.setLocalDescription(answer))
      .then(() => {
        socketRef.current.emit("answer", {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        });
      })
      .catch((e) => console.error(e));
  }, [createPeer]);

  const callUser = useCallback((userID) => {
    peerRef.current = createPeer(userID);
    userStream.current.getTracks().forEach((track) =>
      senders.current.push(peerRef.current.addTrack(track, userStream.current))
    );
    sendChannel.current = peerRef.current.createDataChannel("sendChannel");
    sendChannel.current.onmessage = handleReceiveMessage;
    handleNegotiationNeededEvent(userID);
  }, [createPeer, handleNegotiationNeededEvent]);

  const handleAnswer = useCallback((message) => {
    if (!peerRef.current) return;
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.error(e));
  }, []);

  const handleNewICECandidateMsg = useCallback((incoming) => {
    if (!peerRef.current) return;
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate).catch((e) => console.error(e));
  }, []);

  const handleReceiveMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      setMessages((msg) => [...msg, { yours: false, data }]);
    } catch (e) {
      console.error("Chat parse error:", e);
    }
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socketRef.current.emit("join room", { roomID, userName, userImg });

      socketRef.current.on("old user", ({ userId, userName: name, userImg: img }) => {
        usersID.current = userId;
        callUser(userId);
      });

      socketRef.current.on("new user", ({ newUserId }) => {
        usersID.current = newUserId;
      });

      socketRef.current.on("offer", handleRecieveCall);
      socketRef.current.on("answer", handleAnswer);
      socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

      socketRef.current.on("user left", (id) => {
        try {
          if (partnerVideo.current) partnerVideo.current.srcObject = null;
          if (peerRef.current) {
            peerRef.current.close();
            peerRef.current = null;
          }
          senders.current = []; // ← FIX #2: clear senders on disconnect
          setMessages([]);
          setHasPartner(false); // ← FIX #1: reset overlay
          toast.info("Your call partner left");
        } catch (err) {
          console.error("Error handling peer leave:", err);
        }
      });
    } catch (error) {
      toast.error("Camera/microphone access denied or unavailable.");
      console.error(error);
    }
  }, [roomID, userName, userImg, callUser, handleRecieveCall, handleAnswer, handleNewICECandidateMsg]);

  useEffect(() => {
    if (user) {
      socketRef.current = io.connect(SOCKET_URL);
      startCamera();
    }
    return () => {
      if (isRecordingRef.current) {
        isRecordingRef.current = false;
        cancelAnimationFrame(animationRef.current);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          try { mediaRecorderRef.current.stop(); } catch (_) { }
        }
      }
      if (socketRef.current) socketRef.current.disconnect();
      if (peerRef.current) peerRef.current.close();
      if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
    };
  }, [user, startCamera]);

  // ================== CONTROLS =================
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
    if (isRecordingRef.current) {
      isRecordingRef.current = false;
      cancelAnimationFrame(animationRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try { mediaRecorderRef.current.stop(); } catch (_) { }
      }
    }
    if (sendChannel.current) sendChannel.current.close();
    if (peerRef.current) peerRef.current.close();
    if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
    if (socketRef.current) socketRef.current.disconnect();
    navigate("/conference");
  };

  const shareScreen = async () => {
    if (isScreenSharing.current) return;
    if (senders.current.length === 0) {
      toast.info("Wait for someone to join before sharing screen");
      return;
    }
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const videoSender = senders.current.find((s) => s.track?.kind === "video");
      if (!videoSender) {
        toast.error("No video track found to replace");
        return;
      }

      const cameraTrack = userStream.current?.getVideoTracks()[0];
      isScreenSharing.current = true;

      // ← Hide local PIP so your own camera isn't in the shared frame
      if (userVideo.current) userVideo.current.style.display = "none";

      await videoSender.replaceTrack(screenTrack);
      toast.success("You are now presenting");

      screenTrack.onended = () => {
        if (!isScreenSharing.current) return;
        isScreenSharing.current = false;
        if (cameraTrack && videoSender) {
          videoSender.replaceTrack(cameraTrack).catch(() => { });
        }
        // ← Restore local PIP when sharing stops
        if (userVideo.current) userVideo.current.style.display = "block";
        setIsVideoEnabled(true);
        toast.info("Screen sharing stopped");
      };
    } catch (error) {
      toast.error("Screen sharing failed or was cancelled.");
    }
  };
  
  const getUrl = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  // ================== RECORDING =================
  const stopRecording = useCallback(() => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;
    setIsRecording(false);
    cancelAnimationFrame(animationRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try { mediaRecorderRef.current.stop(); } catch (_) { }
    }
  }, []);

  const startRecording = useCallback(() => {
    if (isRecordingRef.current) return;
    if (!userStream.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dest = audioCtx.createMediaStreamDestination();

    try {
      const localSrc = audioCtx.createMediaStreamSource(userStream.current);
      localSrc.connect(dest);
    } catch (_) { }

    if (partnerVideo.current?.srcObject) {
      try {
        const remoteSrc = audioCtx.createMediaStreamSource(partnerVideo.current.srcObject);
        remoteSrc.connect(dest);
      } catch (_) { }
    }

    const canvasStream = canvas.captureStream(30);
    dest.stream.getAudioTracks().forEach((t) => canvasStream.addTrack(t));

    const recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm; codecs=vp9" });
    recordedChunksRef.current = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MeetRoom-${roomID}-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Recording saved!");
    };

    const draw = () => {
      if (!isRecordingRef.current) return;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (partnerVideo.current?.videoWidth) {
        ctx.drawImage(partnerVideo.current, 0, 0, canvas.width, canvas.height);
      }
      if (userVideo.current?.videoWidth) {
        ctx.drawImage(userVideo.current, canvas.width - 280, canvas.height - 210, 280, 210);
      }
      ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
      ctx.beginPath();
      ctx.arc(40, 40, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("REC", 60, 46);
      animationRef.current = requestAnimationFrame(draw);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    isRecordingRef.current = true;
    setIsRecording(true);
    draw();
    toast.info("Recording started");
  }, [roomID]);

  // ================== CHAT =================
  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const payload = { name: userName, image: userImg, message: text };
    if (sendChannel.current?.readyState === "open") {
      sendChannel.current.send(JSON.stringify(payload));
      setMessages((m) => [...m, { yours: true, data: payload }]);
      setText("");
    } else {
      toast.info("Wait for partner to connect");
    }
  };

  const renderMessage = (message, index) => {
    const isMine = message.yours;
    return (
      <div key={index} className={`flex mb-3 ${isMine ? "flex-row-reverse" : ""}`}>
        <img src={message.data.image} alt="" className="w-8 h-8 rounded-full border border-slate-600 mx-2 flex-shrink-0" />
        <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isMine ? "bg-emerald-600 text-white rounded-br-none" : "bg-slate-700 text-slate-100 rounded-bl-none"}`}>
          <p className="text-xs opacity-80 mb-0.5">{message.data.name}</p>
          <p>{message.data.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full relative bg-slate-950 overflow-hidden">
      {/* Video Area */}
      <div className={`flex-1 relative flex items-center justify-center p-4 ${showChat ? "lg:pr-[380px]" : ""}`}>
        <video ref={partnerVideo} autoPlay playsInline className="w-full h-full max-h-[90vh] rounded-2xl bg-slate-900 object-cover shadow-2xl" />

        {/* Local PIP */}
        <video ref={userVideo} muted autoPlay playsInline className="video-pip" />

        {/* Empty state — FIX #1: use hasPartner state instead of ref */}
        {!hasPartner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity opacity-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="text-3xl text-slate-500" />
              </div>
              <p className="text-slate-400">Waiting for someone to join...</p>
            </div>
          </div>
        )}

        {/* Top Bar Info */}
        <div className="absolute top-4 left-4 flex items-center gap-3 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 z-20">
          <span className="text-xs text-slate-300 font-medium">Room: {roomID?.slice(0, 8)}...</span>
          {copySuccess ? (
            <span className="text-xs text-emerald-400 font-semibold">{copySuccess}</span>
          ) : (
            <button onClick={getUrl} className="text-slate-300 hover:text-white"><FiCopy size={14} /></button>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700 shadow-2xl z-50 pointer-events-auto">
          <button type="button" onClick={toggleAudio} className={isAudioEnabled ? "btn-control" : "btn-control-active"} title="Mic">
            {isAudioEnabled ? <FiMic /> : <FiMicOff />}
          </button>
          <button type="button" onClick={toggleVideo} className={isVideoEnabled ? "btn-control" : "btn-control-active"} title="Camera">
            {isVideoEnabled ? <FiVideo /> : <FiVideoOff />}
          </button>
          <button type="button" onClick={shareScreen} className="btn-control" title="Share Screen">
            <FiMonitor />
          </button>
          <button type="button" onClick={() => setShowChat((p) => !p)} className={showChat ? "btn-control-active" : "btn-control"} title="Chat">
            {showChat ? <FiMessageCircle /> : <FiMessageSquare />}
          </button>
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? "btn-control-danger animate-pulse" : "btn-control"}
            title={isRecording ? "Stop Recording" : "Record"}
          >
            {isRecording ? <FiSquare /> : <FiCircle />}
          </button>
          <button type="button" onClick={hangUp} className="btn-control-danger" title="End Call">
            <FiPhoneOff />
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[380px] bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl z-40">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">In-call Messages</h3>
            <button
              type="button"
              onClick={() => setShowChat(false)}
              className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors text-sm"
            >
              <FiX size={16} /> <span className="lg:hidden">Close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && <p className="text-center text-slate-500 text-sm mt-10">No messages yet</p>}
            {messages.map(renderMessage)}
          </div>
          <SignleChat
            text={text}
            handleChange={(e) => setText(e.target.value)}
            sendMessage={sendMessage}
            showEmojiPicker={showEmojiPicker}
            toggleEmojiPicker={() => setShowEmojiPicker((p) => !p)}
            handleEmojiSelect={(emoji) => { setText((t) => t + emoji.native); setShowEmojiPicker(false); }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleRoom;