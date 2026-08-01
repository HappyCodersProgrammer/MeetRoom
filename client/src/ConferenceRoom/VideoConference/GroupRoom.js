import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Peer from "simple-peer";
import io from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
	FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor,
	FiMessageSquare, FiUsers, FiCopy, FiPhoneOff,
	FiCircle, FiSquare, FiX
} from "react-icons/fi";
import ScrollToBottom from "react-scroll-to-bottom";
import auth from "../../firebase.init";
import SOCKET_URL from "../../config/socket";
import ICE_SERVERS from "../../config/iceServers";

function Video({ peer }) {
	const ref = useRef();
	useEffect(() => {
		if (ref.current && peer) peer.on("stream", (stream) => { ref.current.srcObject = stream; });
		return () => { if (peer) peer.destroy(); };
	}, [peer]);
	return <video className="w-full h-full object-cover rounded-xl bg-slate-900" playsInline autoPlay ref={ref} />;
}

const GroupRoom = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const userImg = user?.photoURL || `https://img.icons8.com/?size=512&id=108296&format=png`;
	const userName = user?.displayName || "Anonymous";
	const { roomGroupID } = useParams();

	const [peers, setPeers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showChat, setShowChat] = useState(false);
	const [showParticipants, setShowParticipants] = useState(false);
	const [copySuccess, setCopySuccess] = useState("");
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isRecording, setIsRecording] = useState(false);

	const socketRef = useRef();
	const userVideo = useRef();
	const peersRef = useRef([]);
	const userStream = useRef();
	const isHostRef = useRef(false);
	const roomID = roomGroupID;

	const mediaRecorderRef = useRef(null);
	const recordedChunksRef = useRef([]);
	const animationRef = useRef(null);
	const isRecordingRef = useRef(false);
	const isScreenSharing = useRef(false);

	const createPeer = useCallback((userToSignal, callerID, stream) => {
		const peer = new Peer({ initiator: true, trickle: false, config: ICE_SERVERS, stream });
		peer.on("signal", (signal) => {
			socketRef.current.emit("sending signal", { userToSignal, callerID, signal, isHost: isHostRef.current });
		});
		peersRef.current.push({ peerID: userToSignal, peer });
		return peer;
	}, []);

	const addPeer = useCallback((incomingSignal, callerID) => {
		const peer = new Peer({ initiator: false, trickle: false, config: ICE_SERVERS });
		peer.on("signal", (signal) => {
			socketRef.current.emit("returning signal", { signal, callerID, isHost: isHostRef.current });
		});
		peer.signal(incomingSignal);
		peersRef.current.push({ peerID: callerID, peer });
		return peer;
	}, []);

	const startCamera = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 1280, height: 720 } });
			userVideo.current.srcObject = stream;
			userStream.current = stream;

			socketRef.current.emit("join room group", { roomID, userName, userImg, isHost: isHostRef.current });

			socketRef.current.on("all users", (users) => {
				const newPeers = users.map((u) => {
					const peer = createPeer(u.socketId, socketRef.current.id, stream);
					return { peerID: u.socketId, peer, isHost: u.isHost, name: u.userName, image: u.userImg };
				});
				setPeers((p) => [...p, ...newPeers]);
			});

			socketRef.current.on("host status", (status) => { isHostRef.current = status; });

			socketRef.current.on("user joined", (payload) => {
				if (!payload.signal) return;
				const peer = addPeer(payload.signal, payload.callerID);
				setPeers((prev) => [...prev, { peerID: payload.callerID, peer, isHost: payload.isHost, name: payload.userName, image: payload.userImg }]);
			});

			socketRef.current.on("receiving returned signal", (payload) => {
				const item = peersRef.current.find((p) => p.peerID === payload.socketId);
				if (item) item.peer.signal(payload.signal);
			});

			socketRef.current.on("user left group", (id) => {
				try {
					const peerObj = peersRef.current.find((p) => p.peerID === id);
					if (peerObj) {
						try { peerObj.peer.destroy(); } catch (_) { }
					}
					peersRef.current = peersRef.current.filter((p) => p.peerID !== id);
					setPeers((prev) => prev.filter((p) => p.peerID !== id));
				} catch (err) {
					console.error("Error removing peer:", err);
				}
			});

			socketRef.current.on("group-message", (payload) => {
				setMessages((prev) => [...prev, { yours: false, data: payload }]);
			});
		} catch (error) {
			toast.error("MediaDevices not supported or denied.");
		}
	}, [roomID, userName, userImg, addPeer, createPeer]);

	// CRITICAL FIX: no stopRecording in deps
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
			const peersToDestroy = peersRef.current;
			peersToDestroy.forEach((p) => {
				try { p.peer.destroy(); } catch (_) { }
			});
			peersRef.current = [];
			if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
		};
	}, [user, startCamera]);

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
		peersRef.current.forEach((p) => {
			try { p.peer.destroy(); } catch (_) { }
		});
		peersRef.current = [];
		if (userStream.current) userStream.current.getTracks().forEach((t) => t.stop());
		if (socketRef.current) socketRef.current.disconnect();
		navigate("/conference");
	};

	const shareScreen = async () => {
		if (isScreenSharing.current) return;
		if (peersRef.current.length === 0) {
			toast.info("Wait for participants before sharing screen");
			return;
		}
		try {
			const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
			const screenTrack = screenStream.getVideoTracks()[0];
			peersRef.current.forEach((entry) => {
				const sender = entry.peer.getSenders().find((s) => s.track?.kind === "video");
				if (sender) sender.replaceTrack(screenTrack);
			});
			isScreenSharing.current = true;
			toast.success("You are now presenting");

			screenTrack.onended = () => {
				const camTrack = userStream.current?.getVideoTracks()[0];
				if (camTrack) {
					peersRef.current.forEach((entry) => {
						const sender = entry.peer.getSenders().find((s) => s.track?.kind === "video");
						if (sender) sender.replaceTrack(camTrack);
					});
				}
				isScreenSharing.current = false;
				setIsVideoEnabled(true);
				toast.info("Screen sharing stopped");
			};
		} catch {
			toast.error("Screen sharing failed.");
		}
	};

	const getUrl = () => {
		navigator.clipboard?.writeText(window.location.href).then(() => {
			setCopySuccess("Copied!");
			setTimeout(() => setCopySuccess(""), 2000);
		});
	};

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
		canvas.width = 1280; canvas.height = 720;
		const ctx = canvas.getContext("2d");
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const dest = audioCtx.createMediaStreamDestination();
		try {
			const localSrc = audioCtx.createMediaStreamSource(userStream.current);
			localSrc.connect(dest);
		} catch (_) { }

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
			a.download = `MeetRoom-Group-${roomID}-${Date.now()}.webm`;
			a.click();
			URL.revokeObjectURL(url);
			toast.success("Recording saved!");
		};

		const draw = () => {
			if (!isRecordingRef.current) return;
			ctx.fillStyle = "#0f172a";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			if (userVideo.current?.videoWidth) ctx.drawImage(userVideo.current, 10, 10, 240, 180);
			ctx.fillStyle = "rgba(220,38,38,0.8)";
			ctx.beginPath(); ctx.arc(40, 40, 10, 0, Math.PI * 2); ctx.fill();
			ctx.fillStyle = "#fff"; ctx.font = "bold 14px sans-serif"; ctx.fillText("REC", 58, 46);
			animationRef.current = requestAnimationFrame(draw);
		};

		recorder.start();
		mediaRecorderRef.current = recorder;
		isRecordingRef.current = true;
		setIsRecording(true);
		draw();
		toast.info("Recording started");
	}, [roomID]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		const now = new Date();
		const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
		const payload = { roomID, name: userName, image: userImg, message: text, time: timeStr };
		socketRef.current.emit("group-message", payload);
		setMessages((prev) => [...prev, { yours: true, data: payload }]);
		setText("");
	};

	const renderMessage = (message, index) => {
		const isMine = message.yours;
		return (
			<div key={index} className={`flex mb-3 ${isMine ? "flex-row-reverse" : ""}`}>
				<img src={message.data.image} alt="" className="w-8 h-8 rounded-full border border-slate-600 mx-2 flex-shrink-0" />
				<div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isMine ? "bg-emerald-600 text-white rounded-br-none" : "bg-slate-700 text-slate-100 rounded-bl-none"}`}>
					<p className="text-xs opacity-80 mb-0.5">{message.data.name} • {message.data.time}</p>
					<p>{message.data.message}</p>
				</div>
			</div>
		);
	};

	const totalVideos = 1 + peers.length;
	const gridClass = totalVideos === 1 ? "grid-cols-1" : totalVideos === 2 ? "grid-cols-1 md:grid-cols-2" : totalVideos <= 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";

	// Toggle helpers — clicking the same button again closes it
	const toggleChat = () => {
		setShowChat((prev) => !prev);
		setShowParticipants(false);
	};
	const toggleParticipants = () => {
		setShowParticipants((prev) => !prev);
		setShowChat(false);
	};

	return (
		<div className="flex h-full w-full relative bg-slate-950 overflow-hidden">
			<div className={`flex-1 flex flex-col ${(showChat || showParticipants) ? "lg:pr-[380px]" : ""}`}>
				<div className="flex-1 p-4 overflow-y-auto">
					<div className={`grid ${gridClass} gap-3 auto-rows-fr`}>
						<div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video">
							<video ref={userVideo} muted autoPlay playsInline className="w-full h-full object-cover" />
							<div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded-md text-xs text-white">
								{userName} (You)
							</div>
						</div>
						{peers.map((p) => (
							<div key={p.peerID} className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video">
								<Video peer={p.peer} />
								<div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded-md text-xs text-white">
									{p.name || "Guest"}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="absolute top-4 left-4 flex items-center gap-3 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 z-20">
					<span className="text-xs text-slate-300 font-medium">Group: {roomID?.slice(0, 8)}...</span>
					{copySuccess ? <span className="text-xs text-emerald-400 font-semibold">{copySuccess}</span> :
						<button type="button" onClick={getUrl} className="text-slate-300 hover:text-white"><FiCopy size={14} /></button>}
				</div>

				{/* Bottom Controls*/}
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700 shadow-2xl z-999 pointer-events-auto">
					<button type="button" onClick={toggleAudio} className={isAudioEnabled ? "btn-control" : "btn-control-active"} title="Mic">
						{isAudioEnabled ? <FiMic /> : <FiMicOff />}
					</button>
					<button type="button" onClick={toggleVideo} className={isVideoEnabled ? "btn-control" : "btn-control-active"} title="Camera">
						{isVideoEnabled ? <FiVideo /> : <FiVideoOff />}
					</button>
					<button type="button" onClick={shareScreen} className="btn-control" title="Share Screen">
						<FiMonitor />
					</button>
					<button type="button" onClick={toggleChat} className={showChat ? "btn-control-active" : "btn-control"} title="Chat">
						<FiMessageSquare />
					</button>
					<button type="button" onClick={toggleParticipants} className={showParticipants ? "btn-control-active" : "btn-control"} title="Participants">
						<FiUsers />
					</button>
					<button type="button" onClick={isRecording ? stopRecording : startRecording} className={isRecording ? "btn-control-danger animate-pulse" : "btn-control"} title={isRecording ? "Stop Recording" : "Record"}>
						{isRecording ? <FiSquare /> : <FiCircle />}
					</button>
					<button type="button" onClick={hangUp} className="btn-control-danger" title="Leave">
						<FiPhoneOff />
					</button>
				</div>
			</div>

			{/* Right Sidebar */}
			{(showChat || showParticipants) && (
				<div className="absolute inset-y-0 right-0 w-full lg:w-[380px] bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl z-40">
					<div className="p-4 border-b border-slate-700 flex items-center justify-between">
						<h3 className="font-semibold text-slate-100">
							{showChat ? "In-call Messages" : `Participants (${peers.length + 1})`}
						</h3>
						<button
							type="button"
							onClick={() => { setShowChat(false); setShowParticipants(false); }}
							className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors text-sm"
						>
							<FiX size={16} /> <span className="lg:hidden">Close</span>
						</button>
					</div>

					{showChat && (
						<>
							<ScrollToBottom className="flex-1 p-4 overflow-y-auto">
								{messages.length === 0 && <p className="text-center text-slate-500 text-sm mt-10">No messages yet</p>}
								{messages.map(renderMessage)}
							</ScrollToBottom>
							<div className="p-3 border-t border-slate-700 bg-slate-900 relative">
								<form onSubmit={sendMessage} className="flex items-center gap-2">
									<input
										value={text}
										onChange={(e) => setText(e.target.value)}
										onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(e); } }}
										placeholder="Type a message..."
										className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
									/>
									<button type="button" onClick={() => setShowEmojiPicker((p) => !p)} className="text-slate-400 hover:text-emerald-400 p-2">😀</button>
									<button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold">Send</button>
								</form>
								{showEmojiPicker && (
									<div className="absolute bottom-16 right-4 z-999">
										<Picker data={data} onEmojiSelect={(emoji) => { setText((t) => t + emoji.native); setShowEmojiPicker(false); }} theme="dark" />
									</div>
								)}
							</div>
						</>
					)}

					{showParticipants && (
						<div className="flex-1 overflow-y-auto p-4 space-y-3">
							<div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
								<img src={userImg} alt="" className="w-10 h-10 rounded-full border border-slate-600" />
								<div>
									<p className="text-sm font-medium text-slate-100">{userName} <span className="text-emerald-400 text-xs">(You)</span></p>
								</div>
							</div>
							{peers.map((p) => (
								<div key={p.peerID} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
									<img src={p.image || userImg} alt="" className="w-10 h-10 rounded-full border border-slate-600" />
									<div>
										<p className="text-sm font-medium text-slate-100">{p.name || "Guest"}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default GroupRoom;