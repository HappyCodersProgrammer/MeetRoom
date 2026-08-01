import React from "react";
import { FiVideo, FiShield, FiZap, FiGlobe } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-emerald-400">MeetRoom</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            MeetRoom is a modern real-time communication platform built for teams, educators, 
            and creators who need reliable, high-quality video conferencing without the clutter.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 lg:px-12 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center">
                  <p className="text-3xl font-bold text-emerald-400">99.9%</p>
                  <p className="text-xs text-slate-500 mt-1">Uptime</p>
                </div>
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center">
                  <p className="text-3xl font-bold text-sky-400">&lt;50ms</p>
                  <p className="text-xs text-slate-500 mt-1">Latency</p>
                </div>
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center">
                  <p className="text-3xl font-bold text-violet-400">End-to-End</p>
                  <p className="text-xs text-slate-500 mt-1">Encrypted</p>
                </div>
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center">
                  <p className="text-3xl font-bold text-pink-400">Global</p>
                  <p className="text-xs text-slate-500 mt-1">Relay Network</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-2xl font-bold">Built for reliability</h2>
            <p className="text-slate-400 leading-relaxed">
              Powered by WebRTC and a global network of STUN/TURN servers, MeetRoom ensures 
              your calls connect even through strict firewalls and NATs. Our mesh architecture 
              for group calls keeps latency low without requiring expensive SFU infrastructure.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Whether you are hosting a 1-on-1 interview, a team standup, or a live broadcast 
              to hundreds, MeetRoom adapts to your needs with automatic quality adjustment 
              and bandwidth optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-12 py-16 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why teams choose MeetRoom</h2>
            <p className="text-slate-400">Designed with simplicity and performance in mind.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiVideo, title: "Crystal Clear", desc: "HD video and audio with adaptive bitrate", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: FiShield, title: "Secure", desc: "Peer-to-peer encryption for 1-to-1 calls", color: "text-sky-400", bg: "bg-sky-500/10" },
              { icon: FiZap, title: "Lightning Fast", desc: "Low-latency connections worldwide", color: "text-violet-400", bg: "bg-violet-500/10" },
              { icon: FiGlobe, title: "Accessible", desc: "Works on any modern browser — no installs", color: "text-pink-400", bg: "bg-pink-500/10" },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/60 transition-colors">
                <div className={`w-11 h-11 ${item.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className={`text-lg ${item.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="px-6 lg:px-12 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Built with modern tech</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["React 18", "WebRTC", "Socket.IO", "Tailwind CSS", "Firebase Auth", "Node.js", "Express"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;