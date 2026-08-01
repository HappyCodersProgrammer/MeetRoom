import { signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiVideo, FiLogOut } from "react-icons/fi";
import auth from "../../firebase.init";

const navItems = [
  { to: "/conference", icon: FiHome, label: "Home" },
];

const LeftNavbar = () => {
  const location = useLocation();
  const logout = () => signOut(auth);

  return (
    <div className="drawer-side z-999">
      <label htmlFor="my-drawer-2" className="drawer-overlay bg-black/60"></label>
      <div className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 h-full">
        {/* Logo */}
        <Link to="/" className="mb-10">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <FiVideo className="text-white text-xl" />
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-6 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-center w-full py-3 rounded-xl transition-all duration-200 group relative ${
                  active ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className="text-xl" />
                {!active && (
                  <span className="absolute left-14 bg-slate-800 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-3 rounded-xl transition-all duration-200"
          title="Logout"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default LeftNavbar;