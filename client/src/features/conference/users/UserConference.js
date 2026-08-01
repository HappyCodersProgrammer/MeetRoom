import React from "react";
import Participant from "../../../components/Participant/Participant";
import Users from "../../../components/Users/Users";

const UserConference = () => {
	return (
		<div className="flex justify-center gap-1 flex-col lg:flex-row">
			<div className="md:w-12/12 lg:w-8/12">
				<Users></Users>
			</div>
			{/* ========Right Sidebar ========*/}
			<div className="md:w-12/12 lg:w-4/12">
				<div className="text-gray-300 p-2">
					<h2 className="text-gray-200 bg-slate-800 text-center py-2 uppercase text-lg font-semibold rounded-md">
						All Participents
					</h2>
					<Participant></Participant>
				</div>
			</div>
		</div>
	);
};

export default UserConference;
