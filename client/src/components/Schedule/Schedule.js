import React, { useState } from "react";
import user from "../../assets/images/user.png";
import useSchedules from "../../hooks/useSchedules";
import Loading from "../../../features/auth/pages/Loading";

const Schedule = () => {
	const [copySuccess, setCopySuccess] = useState("");
	const { schedules, isLoad } = useSchedules();
	const posts = [...schedules].reverse();
	const copyToClipBoard = async (copyMe) => {
		try {
			await navigator.clipboard.writeText(copyMe);
			<small>{setCopySuccess(`Copied!`)}</small>;
		} catch (err) {
			setCopySuccess("Failed to copy!");
		}
	};
	// const {_id ,meetingPurpose,timeZone,startTime,endTime}= schedule
	if (isLoad) {
		<Loading/>
	}

	return (
		<div className="bg-slate-900">
			{posts?.slice(0, 4).map((item) => (
				<div className="border border-slate-700 p-2 my-2 rounded-md" key={Math.random()}>
					<div className="flex justify-between">
						<h2 className="text-xl text-white">{item?.meetingPurpose}</h2>
						<button>
							<i className=" fad fa-ellipsis-h-alt bg-slate-800 text-xs px-3 py-1 hover:bg-slate-700 rounded font-medium text-white"></i>
						</button>
					</div>
					<div className="flex my-2">
						<button>
							<i className=" fal fa-clock text-gray-200 text-xs font-small mr-2"></i>
						</button>
						<p>
							<small className="text-white">{item?.startTime}</small>
						</p>
						<div className=" text-white mx-2">|</div>
						<p>
							<small className="text-white">{item?.endTime} </small>
						</p>
					</div>

					<div className="flex justify-between mt-2">
						<div className="flex gap-2">
							<img
								src={user}
								alt="Main user"
								className="w-8 h-8 border border-slate-600 rounded-full"
							/>
							<img
								src={user}
								alt="Main user"
								className="w-8 h-8 border border-slate-600 rounded-full"
							/>
							<img
								src={user}
								alt="Main user"
								className="w-8 h-8 border border-slate-600 rounded-full"
							/>
						</div>
						<div className="flex">
							<div
								className="tooltip mr-1 py-1 px-2 rounded text-white hover:bg-slate-700"
								data-tip={copySuccess ? copySuccess : "COPY ID"}
							>
								<button
									type="button"
									className="text-gray-300"
									onClick={() => copyToClipBoard(`xsks-2exk-2klse`)}
								>
									<small>xsks-2exk-2klse</small>
								</button>
							</div>
							<button
								type="button"
								className="ml-1 bg-green-600 py-1 px-2 rounded shadow-green-200 text-gray-200 hover:bg-blue-500"
							>
								Start
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Schedule;
