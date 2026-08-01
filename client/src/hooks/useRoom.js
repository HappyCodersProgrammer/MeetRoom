import { useEffect, useState } from "react";

export default function useRoom() {
	const [id, setId] = useState(null);
	const [isHost, setIsHost] = useState(false);
	useEffect(() => {
		if (id) {
			setId(id);
		}
	}, [id]);
	return { id, setId, isHost, setIsHost };
}
