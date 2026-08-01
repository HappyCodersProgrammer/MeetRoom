import { useEffect, useState } from "react";

const useSchedules = () => {
	const [schedules, setSchedules] = useState([]);
	const [isLoad, setIsLoad] = useState(true);
	useEffect(() => {
		fetch("https://meetroom-server.onrender.com/schedule")
			.then((res) => res.json())
			.then((data) => setSchedules(data, setIsLoad(false)));
	}, [schedules, isLoad]);
	return { schedules, setSchedules, isLoad, setIsLoad };
};

export default useSchedules;
