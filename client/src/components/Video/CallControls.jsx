import {
	FaMicrophone,
	FaMicrophoneSlash,
	FaPhoneAlt,
	FaRocketchat,
	FaShareAlt,
	FaVideo,
	FaVideoSlash,
} from "react-icons/fa";

const btnBase =
	"w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:brightness-110";

const CallControls = ({
	isAudioEnabled,
	isVideoEnabled,
	onToggleAudio,
	onToggleVideo,
	onHangUp,
	onShareScreen,
	onToggleChat,
	messageCount,
}) => {
	return (
		<div className="flex items-center justify-center gap-3">
			<button
				type="button"
				onClick={onToggleAudio}
				className={`${btnBase} ${
					isAudioEnabled
						? "bg-slate-700 text-slate-200"
						: "bg-red-500 text-white"
				}`}
			>
				{isAudioEnabled ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
			</button>

			<button
				type="button"
				onClick={onToggleVideo}
				className={`${btnBase} ${
					isVideoEnabled
						? "bg-slate-700 text-slate-200"
						: "bg-red-500 text-white"
				}`}
			>
				{isVideoEnabled ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
			</button>

			<button
				type="button"
				onClick={onHangUp}
				className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 text-white transition-all duration-200 hover:brightness-110"
			>
				<FaPhoneAlt size={22} className="rotate-135" />
			</button>

			<button
				type="button"
				onClick={onShareScreen}
				className={`${btnBase} bg-slate-700 text-sky-400`}
			>
				<FaShareAlt size={20} />
			</button>

			{onToggleChat && (
				<button
					type="button"
					onClick={onToggleChat}
					className={`${btnBase} bg-slate-700 text-slate-200 relative`}
				>
					<FaRocketchat size={20} />
					{messageCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-sky-400 text-slate-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
							{messageCount}
						</span>
					)}
				</button>
			)}
		</div>
	);
};

export default CallControls;
