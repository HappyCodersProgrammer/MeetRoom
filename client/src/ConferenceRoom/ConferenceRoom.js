import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logo from '../assets/images/logo.png';
import LeftNavbar from '../components/LeftNavbar/LeftNavbar';

const ConferenceRoom = () => {
  const location = useLocation();
  const isCallActive = location.pathname.includes('/room/') || location.pathname.includes('/broadcast/');

  return (
    <section className="h-screen w-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 z-40">
        <Link to="/" className="flex items-center gap-2 text-slate-100 font-semibold text-lg">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          MeetRoom
        </Link>
        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-sm border border-slate-700">
          <FiMenu className="text-xl" />
        </label>
      </div>

      <div className="flex-1 drawer drawer-mobile overflow-hidden">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
        <div className={`drawer-content flex flex-col relative ${isCallActive ? 'bg-slate-950' : 'bg-slate-900'} h-full`}>
          <Outlet />
        </div>

        <LeftNavbar />
      </div>
    </section>
  );
};

export default ConferenceRoom;