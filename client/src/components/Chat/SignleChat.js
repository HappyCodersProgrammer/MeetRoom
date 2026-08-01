import React from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const SignleChat = ({ text, handleChange, sendMessage, showEmojiPicker, toggleEmojiPicker, handleEmojiSelect }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 bg-slate-900 border-t border-slate-700">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button type="button" onClick={toggleEmojiPicker} className="p-2.5 text-slate-400 hover:text-emerald-400 transition-colors">
          <FiSmile size={20} />
        </button>
        <button type="submit" className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors active:scale-95">
          <FiSend size={18} />
        </button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-full right-4 mb-2 z-999">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}
    </div>
  );
};

export default SignleChat;