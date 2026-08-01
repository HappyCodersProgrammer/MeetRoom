import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ScrollToBottom from "react-scroll-to-bottom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FiSend, FiSmile, FiLogOut, FiArrowLeft } from "react-icons/fi";
import auth from "../../firebase.init";
import userPic from "../../assets/images/user.png";

const Chat = ({ socket, username, room, onLeave }) => {
  const [user] = useAuthState(auth);
  const userImg = user?.photoURL || userPic;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef();

  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const sendMessage = () => {
    if (currentMessage.trim() === "") return;
    const messageData = {
      room,
      author: username,
      message: currentMessage.trim(),
      time: formatTime(new Date()),
      userImg,
    };
    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const handleReceive = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [socket]);

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onLeave} className="lg:hidden text-slate-400 hover:text-white p-1">
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">Room: {room}</h2>
            <p className="text-xs text-emerald-400">● Live</p>
          </div>
        </div>
        <button
          onClick={onLeave}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiLogOut size={16} /> Leave
        </button>
      </div>

      {/* Messages */}
      <ScrollToBottom className="flex-1 overflow-y-auto p-4 space-y-3">
        {messageList.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-500">
            <p>No messages yet. Say hello! 👋</p>
          </div>
        )}
        {messageList.map((msg, index) => {
          const isMine = username === msg.author;
          return (
            <div key={index} className={`flex pt-2 ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                isMine
                  ? "bg-emerald-600 text-white rounded-br-none"
                  : "bg-slate-700 text-slate-100 rounded-bl-none"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold opacity-90">{msg.author}</span>
                  <span className="text-[10px] opacity-60">{msg.time}</span>
                </div>
                <p className="leading-relaxed">{msg.message}</p>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>

      {/* Input */}
      <div className="p-4 bg-slate-800 border-t border-slate-700 relative">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((p) => !p)}
            className="p-2.5 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <FiSmile size={22} />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />

          <button
            onClick={sendMessage}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors active:scale-95"
          >
            <FiSend size={18} />
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 z-999">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;