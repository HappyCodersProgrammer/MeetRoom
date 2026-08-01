import VideoHeader from "./VideoHeader";
import VideoTile from "./VideoTile";
import CallControls from "./CallControls";

const GroupVideo = ({
	userVideo,
	getUrl,
	copySuccess,
	hangUp,
	toggleAudio,
	toggleVideo,
	shareScreen,
	isVideoEnabled,
	isAudioEnabled,
	peers,
	Video,
	socketRef,
}) => {
	return (
		<div className="w-full mx-auto">
			<VideoHeader
				userVideo={userVideo}
				socketRef={socketRef}
				copySuccess={copySuccess}
				onShare={getUrl}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-900 border border-slate-700 rounded-xl p-2">
				<VideoTile label="You" isSelf>
					<video
						className="w-full h-full object-cover"
						muted
						autoPlay
						playsInline
						ref={userVideo}
					/>
				</VideoTile>

				{peers.map((peerObj) => (
					<VideoTile
						key={peerObj.peerID}
						label={peerObj.name || peerObj.peerID.slice(0, 8)}
					>
						<Video peer={peerObj.peer} />
					</VideoTile>
				))}
			</div>

			<div className="flex justify-center py-4">
				<CallControls
					isAudioEnabled={isAudioEnabled}
					isVideoEnabled={isVideoEnabled}
					onToggleAudio={toggleAudio}
					onToggleVideo={toggleVideo}
					onHangUp={hangUp}
					onShareScreen={shareScreen}
				/>
			</div>
		</div>
	);
};

export default GroupVideo;
