import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { FiMaximize, FiPhoneOff, FiRadio, FiVolume2, FiVolumeX } from "react-icons/fi"; // ← FIX #5
import SOCKET_URL from "../../../../config/socket";
import ICE_SERVERS from "../../../../config/iceServers";

const BroadcastViewer = () => {
    const { broadcastID } = useParams();
    const navigate = useNavigate();
    const roomID = broadcastID;

    const [connected, setConnected] = useState(false);
    const [broadcasterLeft, setBroadcasterLeft] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // ← FIX #5

    const socketRef = useRef();
    const videoRef = useRef();
    const peerRef = useRef();
    const broadcasterIdRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect(SOCKET_URL);

        socketRef.current.emit("join broadcast", {
            roomID,
            userName: "Viewer",
            userImg: "",
        });

        socketRef.current.on("broadcaster signal", ({ signal, broadcasterId }) => {
            broadcasterIdRef.current = broadcasterId;
            handleBroadcasterSignal(signal);
        });

        socketRef.current.on("broadcast ended", () => {
            setBroadcasterLeft(true);
            cleanup();
        });

        return () => {
            cleanup();
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [roomID]);

    const cleanup = () => {
        if (peerRef.current) {
            peerRef.current.close();
            peerRef.current = null;
        }
    };

    const handleBroadcasterSignal = async (signal) => {
        if (!peerRef.current) {
            peerRef.current = new RTCPeerConnection(ICE_SERVERS);

            peerRef.current.ontrack = (e) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = e.streams[0];
                    setConnected(true);
                }
            };

            peerRef.current.onicecandidate = (e) => {
                if (e.candidate && broadcasterIdRef.current) {
                    socketRef.current.emit("viewer signal", {
                        broadcasterId: broadcasterIdRef.current,
                        signal: { type: "ice", candidate: e.candidate },
                    });
                }
            };
        }

        if (signal.type === "sdp" && signal.sdp.type === "offer") {
            try {
                await peerRef.current.setRemoteDescription(
                    new RTCSessionDescription(signal.sdp),
                );
                const answer = await peerRef.current.createAnswer();
                await peerRef.current.setLocalDescription(answer);
                socketRef.current.emit("viewer signal", {
                    broadcasterId: broadcasterIdRef.current,
                    signal: { type: "sdp", sdp: peerRef.current.localDescription },
                });
            } catch (err) {
                console.error("Error handling offer:", err);
            }
        } else if (signal.type === "ice" && signal.candidate) {
            try {
                await peerRef.current.addIceCandidate(
                    new RTCIceCandidate(signal.candidate),
                );
            } catch (err) {
                console.error("Error adding ICE candidate:", err);
            }
        }
    };

    const toggleFullscreen = () => {
        const el = videoRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen?.().catch(() => { });
        } else {
            document.exitFullscreen?.().catch(() => { });
        }
    };

    const leave = () => {
        cleanup();
        if (socketRef.current) socketRef.current.disconnect();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={isMuted} // ← FIX #5: controlled mute
                    className="w-full h-full object-cover block"
                />

                {!connected && !broadcasterLeft && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90">
                        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-white">
                            Joining broadcast...
                        </h2>
                        <p className="text-slate-400 mt-2">
                            Waiting for the stream to start
                        </p>
                    </div>
                )}

                {broadcasterLeft && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90">
                        <FiRadio className="text-4xl text-slate-500 mb-4" />
                        <h2 className="text-xl font-bold text-white">Broadcast ended</h2>
                        <p className="text-slate-400 mt-2">
                            The broadcaster has left
                        </p>
                        <button
                            onClick={leave}
                            className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Go Home
                        </button>
                    </div>
                )}

                {connected && (
                    <>
                        <div className="absolute top-4 left-4 flex items-center gap-3">
                            <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                                <span className="w-2 h-2 bg-white rounded-full" /> LIVE
                            </span>
                        </div>

                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            {/* ← FIX #5: explicit unmute toggle */}
                            <button
                                onClick={() => setIsMuted((m) => !m)}
                                className="bg-slate-900/80 backdrop-blur text-white p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                            </button>
                            <button
                                onClick={toggleFullscreen}
                                className="bg-slate-900/80 backdrop-blur text-white p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors"
                                title="Fullscreen"
                            >
                                <FiMaximize size={16} />
                            </button>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700 shadow-2xl z-50">
                            <button
                                type="button"
                                onClick={leave}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 active:scale-95"
                                title="Leave"
                            >
                                <FiPhoneOff />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BroadcastViewer;