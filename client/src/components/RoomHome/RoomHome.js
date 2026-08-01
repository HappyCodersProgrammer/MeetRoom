import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { FiVideo, FiUsers, FiMessageSquare, FiRadio } from "react-icons/fi";
import CreateSingleRoom from "../../features/conference/components/ModalConference/CreateSingleRoom";
import CreateGroupRoom from "../../features/conference/components/ModalConference/CreateGroupRoom";
import CreateBroadcastRoom from "../../features/conference/components/ModalConference/CreateBroadcastRoom";
import CreateChatRoom from "../../features/conference/components/ModalConference/CreateChatRoom";

const RoomHome = () => {
  const [value, setValue] = useState(new Date());
  const current = new Date();
  const dateStr = current.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clock Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
              {value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </h2>
            <p className="text-slate-400 mt-2 text-lg">{dateStr}</p>
          </div>
          <div className="mt-6 md:mt-0 mr-4 scale-125 md:scale-150 origin-center">
            <Clock value={value} renderNumbers size={140} className="custom-clock" />
          </div>
        </div>

        {/* Single Call */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 border border-emerald-500/30 shadow-xl text-white flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <FiVideo className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">One to One</h3>
            <p className="text-emerald-100 text-sm mt-1">Start a private video call</p>
            <div className="mt-4">
              <CreateSingleRoom />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Group Call */}
        <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-6 border border-violet-500/30 shadow-xl text-white flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <FiUsers className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Group Call</h3>
            <p className="text-violet-100 text-sm mt-1">Meet with multiple people</p>
            <div className="mt-4">
              <CreateGroupRoom />
            </div>
          </div>
        </div>

        {/* Live Broadcast */}
        <div className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl p-6 border border-sky-500/30 shadow-xl text-white flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <FiRadio className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Broadcast</h3>
            <p className="text-sky-100 text-sm mt-1">Stream to your audience</p>
            <div className="mt-4">
              <CreateBroadcastRoom />
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-3xl p-6 border border-pink-500/30 shadow-xl text-white flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <FiMessageSquare className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Online Chat</h3>
            <p className="text-pink-100 text-sm mt-1">Join a chat room</p>
            <div className="mt-4 flex gap-2">
              <CreateChatRoom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHome;