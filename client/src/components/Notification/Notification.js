import React from "react";
import notificationsBan from "../../assets/images/group.png";

const Notification = () => {
	return (
		<>
			<div className="md:w-12/12 lg:w-6/12">
				<div className="text-center text-gray-200">
					<div className="flex flex-col gap-2 items-center">
						<div className="w-12/12">
							<h1 className="lg:text-4xl text-2xl font-semibold">
								Notify Your Users
							</h1>
							<p className="py-4">
								Provident cupiditate voluptatem et in. Quaerat fugiat ut
								assumenda excepturi exercitationem quasi. In deleniti eaque aut
								repudiandae et a id nisi.
							</p>
						</div>
						<div className="w-12/12">
							<img
								src={notificationsBan}
								className="w-full rounded shadow-2xl"
								alt="hero-imgs"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="md:w-12/12 lg:w-6/12">
				<div className="mt-4">
					<div className="flex flex-col gap-4">
						<textarea
							type="text"
							className="textarea textarea-bordered"
							placeholder="Type your messege"
							rows={5}
						></textarea>
						<button type="button" className="btn bg-green-600 rounded-md">
							Send Notification
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Notification;
