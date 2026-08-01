import React from "react";
import { FiHeadphones, FiShield, FiZap, FiBarChart2, FiCheckCircle } from "react-icons/fi";

const SupportPage = () => {
  const features = [
    {
      icon: FiHeadphones,
      title: "Support 24/7",
      desc: "Our team is available around the clock to help you with any issues. Whether it is a connection problem or a feature question, we have got you covered.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: FiShield,
      title: "Safe & Secure",
      desc: "All calls use encrypted peer-to-peer connections. Your data never touches our servers unless you choose to use chat relay or broadcast features.",
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      icon: FiZap,
      title: "Extremely Fast",
      desc: "Optimized WebRTC signaling with global TURN relay support means low latency even across continents. No lag, no dropped frames.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: FiBarChart2,
      title: "Live Analytics",
      desc: "Monitor call quality, participant engagement, and bandwidth usage in real-time. Perfect for educators and enterprise hosts.",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why we are the <span className="text-emerald-400">best</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            MeetRoom is engineered for reliability, speed, and simplicity. 
            Here is what sets us apart from the rest.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className={`shrink-0 w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center`}>
                  <f.icon className={`text-2xl ${f.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="px-6 lg:px-12 py-16 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-900/20 to-sky-900/20 border border-slate-700 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-emerald-400 mb-1">99.9%</p>
                <p className="text-slate-400 text-sm">Uptime Guarantee</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400 mb-1">&lt; 50ms</p>
                <p className="text-slate-400 text-sm">Average Latency</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-violet-400 mb-1">Zero</p>
                <p className="text-slate-400 text-sm">Install Required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I need to install anything?", a: "No. MeetRoom runs entirely in your browser. Just sign in and start a meeting." },
              { q: "Is my data secure?", a: "Yes. 1-to-1 calls are peer-to-peer encrypted. Group calls use secure Socket.IO relay for signaling only." },
              { q: "How many people can join a group call?", a: "MeetRoom uses a mesh architecture. For best performance, we recommend up to 6-8 participants per room." },
              { q: "Can I record my meetings?", a: "Yes. Click the record button during any call. The recording auto-downloads as a .webm file when you stop." },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium mb-1">{item.q}</p>
                    <p className="text-slate-400 text-sm">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;