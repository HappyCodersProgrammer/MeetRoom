import React from 'react';
import { AiOutlinePushpin } from "react-icons/ai";
import { BsPlus, BsRecordCircle } from "react-icons/bs";
import { FaCreativeCommons } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";

const GroupVideo = ({
	userVideo,
	hostUser,
    getUrl,
	copySuccess,
	hangUp,
	toggleAudio,
	toggleVideo,
	shareScreen,
	stopShare,
}) => {
    console.log(hostUser);
	return (
		<div className="w-full mx-auto">
			<div className="flex items-center justify-between text-gray-200">
				<div className="flex gap-0 lg:gap-1">
					{/* <h2 className='text-sm lg:text-xl text-gray-200'>Now: </h2> */}
					<div className="flex items-center rounded bg-green-900 list-none">
						<li className="px-2 text-lg text-semibold">
							<IoPeopleOutline />
						</li>
						<li className="pr-1 text-md">4+ </li>
					</div>
				</div>
				<div
					className="tooltip mr-1 py-1 px-2 rounded text-white hover:bg-slate-700"
					data-tip={copySuccess ? copySuccess : "COPY ID"}
				>
					<button
						type="button"
						className="text-gray-300"
						onClick={() => {
							getUrl();
						}}
					>
						<small>Copy Link</small>
					</button>
				</div>
			</div>
			<div className="text-gray-200 flex justify-between my-2">
				<div className="flex list-none items-center">
					<li className="bg-red-500 rounded-full">
						<BsRecordCircle />
					</li>
					<li className="text-sm lg:text-md px-1 lg:px-2">REQ : 00.02.36s </li>
				</div>

				<div className="flex list-none items-center text-gray-200">
					<li className="bg-green-900 rounded-full cursor-pointer">
						<BsPlus />
					</li>
					<li className="text-sm lg:text-md px-2">Add user to the class</li>
				</div>
			</div>

			<div className="rounded-xl bg-green-600 relative w-full">
				<div className="text-gray-200 list-none text-xl flex gap-3 justify-start p-4 absolute">
					<li className="bg-green-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-xl p-1 ">
						<FaCreativeCommons />
					</li>
					<li className="bg-green-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-xl p-1 ">
						<AiOutlinePushpin />
					</li>
				</div>

				{/* =======Video Player======= */}
				<div className="grid grid-cols-1 rounded-xl gap-2 p-2">
					<video
						className="group-one"
						muted
						ref={userVideo}
						autoPlay
						playsInline
					/>
					{/* {peers.map((peer) => {
                        return (
                            <Video className="groupVideo" key={peer.peerID} peer={peer.peer} />
                        );
                    })} */}
					{/* 
                    <div className="flex items-center justify-center">
                        <video className="oneVideo" muted ref={userVideo} autoPlay playsInline />
                        {peers.map((peer) => {
                            return (
                                <Video className="oneVideo" key={peer.peerID} peer={peer.peer} />
                            );
                        })}
                    </div> */}
				</div>

				{/* =======Video Controller======= */}
				<div className="flex flex-row justify-center items-baseline relative">
					<div className="flex gap-2 md:gap-4 justify-center place-items-end text-gray-200 font-bold cursor-pointer list-none absolute bottom-8 left-1/3">
						<button type="button" onClick={toggleAudio}>
							<li className="bg-green-400 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-2 lg:px-4 py-1 lg:py-2 font-bold">
								<i className="fas fa-microphone font-bold" id="btn-a"></i>
							</li>
						</button>
						<button type="button" onClick={toggleVideo}>
							<li className="bg-green-400 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-2 lg:px-4 py-1 lg:py-2 font-bold">
								<i className="fal fa-video font-bold" id="btn-v"></i>
							</li>
						</button>
						<button type="button" onClick={hangUp}>
							<li className="bg-red-500 rounded-md text-lg lg:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-2 lg:px-4 py-2 lg:py-2">
								<i className="far fa-phone-alt font-bold" id="btn-phone"></i>
							</li>
						</button>
						<button type="button" onClick={shareScreen}>
							<li className="bg-green-400 rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 px-2 lg:px-4 py-1 lg:py-2 ">
								<i className="fal fa-share-square font-bold" id="btn-share"></i>
							</li>
						</button>
						<button type="button" onClick={stopShare}>
							<li className="bg-green-400 rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 px-2 lg:px-4 py-1 lg:py-2 ">
								<i className="far fa-ban font-bold" id="btn-stop"></i>
							</li>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupVideo;