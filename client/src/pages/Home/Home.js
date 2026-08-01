import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { FiVideo, FiUsers, FiMessageSquare, FiRadio, FiArrowRight } from "react-icons/fi";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/conference");
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navbar spacer */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Now with Live Broadcast & Recording
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Video meetings
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                made simple.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Crystal-clear video conferencing with screen sharing, live chat, group calls, 
              and broadcasting — all in one beautifully simple platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/conference"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
              >
                Start Meeting <FiArrowRight />
              </Link>
              <Link
                to="/conference/live-chat"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all border border-slate-700"
              >
                Join Chat
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500 pt-4">
              <span className="flex items-center gap-1.5"><FiVideo /> HD Video</span>
              <span className="flex items-center gap-1.5"><FiUsers /> Group Calls</span>
              <span className="flex items-center gap-1.5"><FiRadio /> Broadcast</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FiVideo className="text-emerald-400 text-xl" />
                    </div>
                    <p className="text-xs text-slate-500">You</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FiUsers className="text-violet-400 text-xl" />
                    </div>
                    <p className="text-xs text-slate-500">Guest</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FiRadio className="text-sky-400 text-xl" />
                    </div>
                    <p className="text-xs text-slate-500">Live</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FiMessageSquare className="text-pink-400 text-xl" />
                    </div>
                    <p className="text-xs text-slate-500">Chat</p>
                  </div>
                </div>
              </div>
              {/* Fake control bar */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700" />
                <div className="w-10 h-10 rounded-full bg-slate-700" />
                <div className="w-10 h-10 rounded-full bg-red-500" />
                <div className="w-10 h-10 rounded-full bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-12 py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-slate-400">Professional-grade features, zero complexity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiVideo, title: "One-to-One", desc: "Private HD video calls with built-in chat", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: FiUsers, title: "Group Calls", desc: "Host up to multiple participants seamlessly", color: "text-violet-400", bg: "bg-violet-500/10" },
              { icon: FiRadio, title: "Broadcast", desc: "Go live and stream to your audience", color: "text-sky-400", bg: "bg-sky-500/10" },
              { icon: FiMessageSquare, title: "Live Chat", desc: "Instant chat rooms with emoji support", color: "text-pink-400", bg: "bg-pink-500/10" },
            ].map((f) => (
              <div key={f.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`text-xl ${f.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;