import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiZap } from 'react-icons/fi';

const CreateChatRoom = () => {
  return (
    <>
      <label htmlFor="chat-modal" className="cursor-pointer flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200">
        <FiMessageCircle />
        Open
      </label>

      <input type="checkbox" id="chat-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-800 border border-slate-700 text-slate-100">
          <h3 className="font-bold text-xl mb-4">Chat Options</h3>
          <div className="flex flex-col gap-3">
            <Link to="/conference/live-chat" className="btn bg-emerald-600 hover:bg-emerald-700 border-none text-white">
              <FiZap className="mr-2" /> Instant Chat
            </Link>
            <label htmlFor="chat-modal" className="btn btn-ghost border-slate-600 text-slate-300">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChatRoom;