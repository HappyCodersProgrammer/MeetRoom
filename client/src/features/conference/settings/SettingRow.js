import React from "react";

const SettingRow = ({ eUser, index, setRefetch }) => {
	const { email, role } = eUser;
	return (
		<tr>
			<th> {index + 1}</th>
			<td>{email}</td>
			<td>
				<button className="btn btn-xs">{role}</button>
			</td>
		</tr>
	);
};

export default SettingRow;
