import React from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiExternalLink } from "react-icons/fi";

const Contact = () => {
  const contacts = [
    {
      dept: "General Inquiries",
      email: "hello@meetroom.app",
      phone: "+880-1617-892323",
      hours: "Mon – Fri, 9:00 – 18:00 BST",
    },
    {
      dept: "Technical Support",
      email: "support@meetroom.app",
      phone: "+880-1617-892324",
      hours: "24/7",
    },
    {
      dept: "Enterprise Sales",
      email: "sales@meetroom.app",
      phone: "+880-1617-892325",
      hours: "Mon – Fri, 9:00 – 18:00 BST",
    },
    {
      dept: "Careers",
      email: "careers@meetroom.app",
      phone: "+880-1617-892326",
      hours: "Mon – Fri, 10:00 – 17:00 BST",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-20 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-emerald-400">touch</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Have a question, need support, or want to partner with us? 
            Reach out to the right team below.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {contacts.map((c) => (
            <div
              key={c.dept}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">{c.dept}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <FiMail className="text-slate-500" />
                  <a href={`mailto:${c.email}`} className="hover:text-emerald-400 transition-colors">
                    {c.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <FiPhone className="text-slate-500" />
                  <span>{c.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <FiClock className="text-slate-500" />
                  <span>{c.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office / Map placeholder */}
      <section className="px-6 lg:px-12 py-16 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Office</h2>
            <p className="text-slate-400 leading-relaxed">
              MeetRoom is built by a distributed team, but our headquarters are open 
              for visits by appointment. Drop us a line if you are in the area.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-emerald-400 mt-1" />
                <div>
                  <p className="font-medium">Dhaka, Bangladesh</p>
                  <p className="text-slate-400 text-sm">House 12, Road 5, Gulshan Avenue</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-emerald-400 mt-1" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-slate-400 text-sm">Sunday – Thursday, 9:00 – 18:00 BST</p>
                </div>
              </div>
            </div>
            <a
              href="mailto:hello@meetroom.app"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Send an email <FiExternalLink size={16} />
            </a>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 h-72 flex items-center justify-center">
            <div className="text-center">
              <FiMapPin className="text-4xl text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;