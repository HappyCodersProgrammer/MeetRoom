"use client";

import VideoHeader from "./VideoHeader";
import VideoTile from "./VideoTile";
import CallControls from "./CallControls";

const SingleVideo = ({
	messages,
	containerVideo,
	socketRef,
	userVideo,
	partnerVideo,
	getUrl,
	copySuccess,
	toggleAudio,
	toggleVideo,
	hangUp,
	shareScreen,
	resPonsiveChat,
	isVideoEnabled,
	isAudioEnabled,
}) => {
	return (
		<div className="w-full mx-auto">
			<VideoHeader
				userVideo={userVideo}
				socketRef={socketRef}
				copySuccess={copySuccess}
				onShare={getUrl}
			/>

			<div
				className="bg-slate-900 border border-slate-700 rounded-b-xl relative"
				ref={containerVideo}
				style={{ minHeight: "400px" }}
			>
				<video
					className="w-full min-h-[350px] object-cover"
					autoPlay
					playsInline
					ref={partnerVideo}
				/>

				<div className="absolute top-4 right-4 w-44">
					<VideoTile variant="pip" label="You" isSelf>
						<video
							className="w-full h-auto"
							muted
							autoPlay
							playsInline
							ref={userVideo}
						/>
					</VideoTile>
				</div>

				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
					<CallControls
						isAudioEnabled={isAudioEnabled}
						isVideoEnabled={isVideoEnabled}
						onToggleAudio={toggleAudio}
						onToggleVideo={toggleVideo}
						onHangUp={hangUp}
						onShareScreen={shareScreen}
						onToggleChat={resPonsiveChat}
						messageCount={messages?.length || 0}
					/>
				</div>
			</div>
		</div>
	);
};

export default SingleVideo;
