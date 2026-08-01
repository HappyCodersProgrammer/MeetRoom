import { useEffect, useRef, useState } from "react";
import { BsRecordCircle, BsShare } from "react-icons/bs";

const VideoHeader = ({
	userVideo,
	socketRef,
	copySuccess,
	onShare,
	roomLabel,
}) => {
	const [isRecording, setIsRecording] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const mediaRecorderRef = useRef(null);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const handleStartRecording = () => {
		if (!userVideo.current) return;

		try {
			const stream = userVideo.current.captureStream();
			const chunks = [];

			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.ondataavailable = (event) => {
				chunks.push(event.data);
			};

			mediaRecorderRef.current.onstop = () => {
				const recordedBlob = new Blob(chunks, { type: "video/webm" });
				socketRef?.current?.emit("recorded-video", recordedBlob);
				chunks.length = 0;
			};

			mediaRecorderRef.current.start();
			setIsRecording(true);
		} catch (error) {
			console.error("Error starting recording:", error);
		}
	};

	const handleStopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
			setElapsedTime(0);
		}
	};

	useEffect(() => {
		let timerId;
		if (isRecording) {
			timerId = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);
		} else {
			setElapsedTime(0);
		}
		return () => clearInterval(timerId);
	}, [isRecording]);

	return (
		<div className="bg-slate-800 text-slate-200 flex justify-between items-center px-4 py-2.5 rounded-t-xl">
			<div className="flex items-center gap-3">
				<div
					className={`w-2.5 h-2.5 rounded-full transition-colors ${
						isRecording ? "bg-red-500" : "bg-slate-600"
					}`}
				/>
				<span className="text-sm font-medium">
					{isRecording ? `REC ${formatTime(elapsedTime)}` : "Ready to record"}
				</span>
				{roomLabel && (
					<span className="text-sm text-slate-400 hidden sm:inline">
						{roomLabel}
					</span>
				)}
			</div>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={isRecording ? handleStopRecording : handleStartRecording}
					className="flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-sky-300 transition-colors duration-200"
				>
					<BsRecordCircle
						size={14}
						className={`${isRecording ? "text-red-500" : "text-red-400"}`}
					/>
					<span>{isRecording ? "Stop" : "Start"} Recording</span>
				</button>

				<div className="relative group">
					<button
						type="button"
						onClick={onShare}
						className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-sky-300 transition-colors duration-200"
					>
						<BsShare size={14} />
						<span>Share</span>
					</button>
					<div className="absolute hidden group-hover:block top-full right-0 mt-1 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
						{copySuccess || "Copy meeting link"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoHeader;
