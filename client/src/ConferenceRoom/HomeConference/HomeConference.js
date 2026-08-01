import React from "react";
import RoomHome from "../../components/RoomHome/RoomHome";

const HomeConference = () => {
	return (
		<div className="h-full overflow-y-auto p-4 lg:p-8">
			<div className="max-w-6xl mx-auto">
				<header className="mb-8">
					<h1 className="text-2xl lg:text-3xl font-bold text-slate-100">Welcome back</h1>
					<p className="text-slate-400 mt-1">Start or join a meeting instantly</p>
				</header>
				<RoomHome />
			</div>
		</div>
	);
};

export default HomeConference;