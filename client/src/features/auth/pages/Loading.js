import React from "react";
import load from "../../../assets/images/load.gif";

const Loading = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<img src={load} alt="loading" className="w-1/6" />
		</div>
	);
};

export default Loading;
