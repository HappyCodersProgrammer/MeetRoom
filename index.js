require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const socket = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = socket(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

/* ====== ROOM DATA STORES ====== */
// 1-to-1 video call rooms
const singleRooms = {};
// Group video call rooms
const groupRooms = {};
// Chat rooms (online chat)
const chatRooms = {};
// Map socket id -> room id (for chat rooms)
const socketToRoom = {};
// Map socket id -> room id (for group video rooms)
const socketToGroup = {};

io.on("connection", (socket) => {
	const socketId = socket.id;
	console.log(`[SOCKET] User connected: ${socketId}`);

	/* =========== 1-TO-1 VIDEO CALL ========== */

	socket.on("join room", ({ roomID, userName, userImg }) => {
		if (!singleRooms[roomID]) {
			singleRooms[roomID] = [];
		}

		const existingUser = singleRooms[roomID].find(
			(user) => user.id === socketId,
		);
		if (!existingUser) {
			singleRooms[roomID].push({ id: socketId, userName, userImg });
		}

		socketToRoom[socketId] = roomID;

		const otherUser = singleRooms[roomID].find((user) => user.id !== socketId);
		if (otherUser) {
			// Tell the existing user that a new user joined
			socket.to(otherUser.id).emit("new user", {
				newUserId: socketId,
				userName,
				userImg,
			});
			// Tell the new user about the existing (old) user
			socket.emit("old user", {
				userId: otherUser.id,
				userName: existingUser ? userName : otherUser.userName,
				userImg: existingUser ? userImg : otherUser.userImg,
			});
		}
	});

	// Relay WebRTC offer from caller to callee
	socket.on("offer", (payload) => {
		io.to(payload.target).emit("offer", payload);
	});

	// Relay WebRTC answer from callee back to caller
	socket.on("answer", (payload) => {
		io.to(payload.target).emit("answer", payload);
	});

	// Relay ICE candidates between peers
	socket.on("ice-candidate", (incoming) => {
		io.to(incoming.target).emit("ice-candidate", incoming.candidate);
	});

	/* =========== GROUP VIDEO CALL ========== */

	socket.on("join room group", ({ roomID, userName, userImg, isHost }) => {
		if (!groupRooms[roomID]) {
			groupRooms[roomID] = [];
		}

		const userIndex = groupRooms[roomID].findIndex(
			(user) => user.socketId === socketId,
		);
		if (userIndex !== -1) {
			groupRooms[roomID][userIndex] = { socketId, userName, userImg, isHost };
		} else {
			groupRooms[roomID].push({ socketId, userName, userImg, isHost });
		}

		socketToGroup[socketId] = roomID;
		socket.join(roomID);

		// Send all existing users in the room to the newly-joined user
		const usersInRoom = groupRooms[roomID].filter(
			(user) => user.socketId !== socketId,
		);
		socket.emit("all users", usersInRoom);

		// Inform the joining user whether they are the host (first to join)
		socket.emit("host status", usersInRoom.length === 0);

		// Notify existing users that a new user joined
		socket.broadcast
			.to(roomID)
			.emit("user joined", {
				callerID: socketId,
				userName,
				userImg,
				isHost: isHost,
			});
	});

	// Relay WebRTC signaling between group members
	socket.on("sending signal", (payload) => {
		io.to(payload.userToSignal).emit("user joined", {
			signal: payload.signal,
			callerID: payload.callerID,
			isHost: payload.isHost,
		});
	});

	socket.on("returning signal", (payload) => {
		io.to(payload.callerID).emit("receiving returned signal", {
			signal: payload.signal,
			socketId: socketId,
			isHost: payload.isHost,
		});
	});

	/* =========== GROUP VIDEO CHAT (in-call messaging) ========== */

	socket.on("group-message", (payload) => {
		// Broadcast chat message to all other members in the group room
		socket.to(payload.roomID).emit("group-message", payload);
	});

	/* =========== ONLINE CHAT (LiveChat) ========== */

	socket.on("join-room", ({ room, username }) => {
		socket.join(room);

		// Track the chat room for this socket
		if (!chatRooms[room]) {
			chatRooms[room] = [];
		}
		const exists = chatRooms[room].find((u) => u.socketId === socketId);
		if (!exists) {
			chatRooms[room].push({ socketId, username });
		}

		socketToRoom[socketId] = room;

		// Notify the room that a new user joined
		const roomUsers = chatRooms[room].map((u) => u.username);
		socket.to(room).emit("room-users", roomUsers);
		socket.emit("room-users", roomUsers);

		console.log(`[CHAT] ${username} joined chat room: ${room}`);
	});

	socket.on("send_message", (messageData) => {
		// Broadcast the message to everyone in the same room
		socket.to(messageData.room).emit("receive_message", messageData);
	});

	socket.on("leave-room", ({ room }) => {
		socket.leave(room);
		console.log(`[CHAT] User left chat room: ${room}`);
	});

	/* =========== BROADCAST ========== */
	const broadcastRooms = {}; // roomID -> { broadcaster, viewers: [] }

	socket.on("join broadcast", ({ roomID, userName, userImg }) => {
		socket.join(roomID);
		if (!broadcastRooms[roomID]) {
			broadcastRooms[roomID] = { broadcaster: socketId, viewers: [] };
			socket.emit("broadcaster status", true);
		} else {
			broadcastRooms[roomID].viewers.push({ socketId, userName, userImg });
			socket.emit("broadcaster status", false);
			socket.to(broadcastRooms[roomID].broadcaster).emit("new viewer", {
				viewerId: socketId,
				userName,
				userImg,
			});
		}
	});

	socket.on("broadcaster signal", ({ viewerId, signal }) => {
		io.to(viewerId).emit("broadcaster signal", { signal, broadcasterId: socketId });
	});

	socket.on("viewer signal", ({ broadcasterId, signal }) => {
		io.to(broadcasterId).emit("viewer signal", { signal, viewerId: socketId });
	});

	/* =========== DISCONNECT CLEANUP ========== */

	socket.on("disconnect", () => {
		console.log(`[SOCKET] User disconnected: ${socketId}`);

		// Clean up from single room
		for (const roomID in singleRooms) {
			const room = singleRooms[roomID];
			const index = room.findIndex((user) => user.id === socketId);
			if (index !== -1) {
				const leavingUser = room[index];
				room.splice(index, 1);
				// Notify the other user that this peer left
				room.forEach((remainingUser) => {
					socket.to(remainingUser.id).emit("user left", socketId);
				});
				if (room.length === 0) {
					delete singleRooms[roomID];
				}
				break;
			}
		}

		// Clean up from group room
		if (socketToGroup[socketId] && groupRooms[socketToGroup[socketId]]) {
			const disconnectedRoomID = socketToGroup[socketId];
			groupRooms[disconnectedRoomID] = groupRooms[
				disconnectedRoomID
			].filter((user) => user.socketId !== socketId);

			if (groupRooms[disconnectedRoomID].length === 0) {
				delete groupRooms[disconnectedRoomID];
			} else {
				// Notify remaining members that this user left
				socket.broadcast
					.to(disconnectedRoomID)
					.emit("user left group", socketId);
			}
		}

		// Clean up chat room tracking
		delete socketToRoom[socketId];
		delete socketToGroup[socketId];

		for (const roomID in broadcastRooms) {
			const room = broadcastRooms[roomID];
			if (room.broadcaster === socketId) {
				socket.to(roomID).emit("broadcast ended");
				delete broadcastRooms[roomID];
			} else {
				room.viewers = room.viewers.filter((v) => v.socketId !== socketId);
			}
		}

	});
});

/* ====== SERVER STARTUP ====== */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`[SERVER] MeetRoom server running on port ${PORT}`);
});