import React, { useEffect, useState } from "react";
import UserRow from "./components/UserRow";

const AllUser = () => {
	const [users, setUsers] = useState([]);
	// const [isLoad, setIsLoad] = useState(true)
	// const [refetch, setRefetch] = useState(true)
	const [refetch, setRefetch] = useState(true);

	useEffect(() => {
		if (users?.length <= 0) {
			fetch("https://meetroom-server.onrender.com/user")
				.then((res) => res.json())
				.then((data) => setUsers(data));
		}
	}, [users]);
	return (
		<div className="pt-0">
			<h2 className="text-center py-2 my-4 text-gray-200 bg-green-600 font-semibold text-xl">
				All user:{" "}
				<span className="text-green-900 bg-gray-100 p-2 m-2 rounded-full">
					{users.length}
				</span>
			</h2>
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>Email</th>
							<th>Made Admin</th>
							<th>Favorite Color</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user, index) => (
							<UserRow
								key={user._id}
								user={user}
								index={index}
								refetch={refetch}
								setRefetch={setRefetch}
							></UserRow>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUser;
