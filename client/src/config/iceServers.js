const ICE_SERVERS = {
	iceServers: [
		{ urls: "stun:stun.l.google.com:19302" },
		{ urls: "stun:stun1.l.google.com:19302" },
		{ urls: "stun:stun2.l.google.com:19302" },
		{ urls: "stun:stun3.l.google.com:19302" },
		{ urls: "stun:stun4.l.google.com:19302" },
		{ urls: "stun:stun.relay.metered.ca:80" },
		{
			urls: "turn:a.relay.metered.ca:80",
			username: process.env.REACT_APP_TURN_USERNAME || "bab9ca25580d0235617aea7e",
			credential: process.env.REACT_APP_TURN_CREDENTIAL || "NVk1oJx3ogplGTuj",
		},
		{
			urls: "turn:a.relay.metered.ca:443",
			username: process.env.REACT_APP_TURN_USERNAME || "bab9ca25580d0235617aea7e",
			credential: process.env.REACT_APP_TURN_CREDENTIAL || "NVk1oJx3ogplGTuj",
		},
		{
			urls: "turn:a.relay.metered.ca:443?transport=tcp",
			username: process.env.REACT_APP_TURN_USERNAME || "bab9ca25580d0235617aea7e",
			credential: process.env.REACT_APP_TURN_CREDENTIAL || "NVk1oJx3ogplGTuj",
		},
		{
			urls: "turn:openrelay.metered.ca:80",
			username: "openrelayproject",
			credential: "openrelayproject",
		},
		{
			urls: "turn:openrelay.metered.ca:443",
			username: "openrelayproject",
			credential: "openrelayproject",
		},
	],
};

module.exports = ICE_SERVERS;
