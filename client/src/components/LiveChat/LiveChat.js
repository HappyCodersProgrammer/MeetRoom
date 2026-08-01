import React, { useState } from "react";
import io from "socket.io-client";
import { FiLogIn, FiMessageSquare, FiUser, FiHash } from "react-icons/fi";
import SOCKET_URL from "../../config/socket";
import Chat from "./Chat";

const LiveChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      const newSocket = io.connect(SOCKET_URL);
      newSocket.emit("join-room", { room: room.trim(), username: username.trim() });
      setSocket(newSocket);
      setShowChat(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") joinRoom();
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit("leave-room", { room });
      socket.disconnect();
    }
    setShowChat(false);
    setSocket(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {!showChat ? (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="text-3xl text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Join Chat Room</h2>
            <p className="text-slate-400 mt-2">Enter your details to start chatting</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Room ID</label>
              <div className="relative">
                <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter room ID"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={joinRoom}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FiLogIn /> Join Room
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} onLeave={leaveRoom} />
      )}
    </div>
  );
};

export default LiveChat;