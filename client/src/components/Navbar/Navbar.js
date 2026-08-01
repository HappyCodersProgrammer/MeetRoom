import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiLayout } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/support', label: 'Support' },
];

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    signOut(auth);
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="MeetRoom" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold text-slate-100 tracking-tight hidden sm:block">
              MeetRoom
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {admin && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors px-3 py-2"
              >
                <FiLayout size={16} /> Dashboard
              </Link>
            )}
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all"
              >
                <FiLogOut size={16} /> Sign out
              </button>
            ) : (
              <Link
                to="/signIn"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all active:scale-95"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {admin && (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-all"
              >
                <FiLayout size={16} /> Dashboard
              </Link>
            )}

            <div className="pt-2 border-t border-slate-800 mt-2">
              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all text-left"
                >
                  <FiLogOut size={16} /> Sign out
                </button>
              ) : (
                <Link
                  to="/signIn"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;