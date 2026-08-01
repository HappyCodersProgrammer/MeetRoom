import React, { useEffect, useState } from "react";
import TeamsCard from "./TeamsCard";

const Teams = () => {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetch("https://meetroom-server.onrender.com/member")
			.then((res) => res.json())
			.then((data) => setMembers(data));
	}, []);
	return (
		<div className="relative bg-gray-100 rounded-md">
			<div className="container">
				<div className="text-center my-4">
					<h2 className="text-3xl leading-normal font-bold text-gray-600 dark:text-gray-200">
						<span className="font-light">Our</span>{" "}
						<span className="border-b">Team!</span>
					</h2>
				</div>
				<div className="grid grid-cols-2 lg:grid-cols-6">
					{members.slice(0, 6).map((member) => (
						<TeamsCard key={member._id} member={member}></TeamsCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default Teams;
