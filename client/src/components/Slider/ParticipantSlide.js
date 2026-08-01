import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ParticipantSlide.css";

import { FreeMode, Navigation, Pagination } from "swiper";
import VideoTile from "../Video/VideoTile";

const ParticipantSlide = ({ peers, Video }) => {
	return (
		<>
			{peers.length > 0 && (
				<Swiper
					modules={[FreeMode, Navigation, Pagination]}
					slidesPerView={6}
					spaceBetween={8}
					freeMode={true}
					navigation={true}
					className="participantSwiper mt-3"
				>
					{peers.map((peer) => (
						<SwiperSlide key={peer.peerID}>
							<VideoTile
								variant="slider"
								label={peer.name || peer.peerID.slice(0, 6)}
								className="w-20 h-24 border border-slate-700"
							>
								<Video peer={peer.peer} />
							</VideoTile>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
};

export default ParticipantSlide;
