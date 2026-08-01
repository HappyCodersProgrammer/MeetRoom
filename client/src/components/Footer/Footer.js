import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiHeart } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 flex items-center gap-1">
            &copy; 2022 - {currentYear} MeetRoom. Built with{" "}
            <FiHeart className="text-red-500 inline" size={14} /> for everyone.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://facebook.com/engr.hasanrafi" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors" aria-label="Facebook">
              <FiFacebook size={18} />
            </a>
            <a href="https://twitter.com/engr.hasanrafi" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors" aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
            <a href="https://instagram.com/engr.hasanrafi" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="https://github.com/hasan-mia" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;