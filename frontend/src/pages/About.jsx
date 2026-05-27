import React from 'react';
import { Phone, MessageSquare, Calendar, Compass, Briefcase, GraduationCap, Heart, ShieldAlert, Sparkles } from 'lucide-react';

export default function About() {
  const phone_number = "8535879134";

  const services = [
    { icon: <Briefcase className="w-5 h-5 text-emerald-400" />, title: "ব্যবসা ও বাণিজ্য", desc: "Business & Commerce Consultation" },
    { icon: <Compass className="w-5 h-5 text-amber-400" />, title: "ক্যারিয়ার ও চাকরি", desc: "Career & Job Solutions" },
    { icon: <GraduationCap className="w-5 h-5 text-purple-400" />, title: "পড়াশোনা ও শিক্ষা", desc: "Education & Academic Progress" },
    { icon: <Heart className="w-5 h-5 text-rose-400" />, title: "দাম্পত্য অশান্তি ও বিবাহ", desc: "Marital & Relationship Alignment" },
    { icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />, title: "দোষ নির্ণয় ও প্রতিকার", desc: "Dosha Analysis & Remedy Tracing" },
    { icon: <Sparkles className="w-5 h-5 text-yellow-400" />, title: "কোষ্ঠী তৈরি ও গ্রহ-নক্ষত্র বিচার", desc: "Kundali & Birth Chart Calculation" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* --- HERO SECTION WITH BANNER PROFILE LAYOUT --- */}
        <div className="relative border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Representation Box */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30 flex-shrink-0 flex items-center justify-center relative shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-70 animate-pulse" />
            
            <img 
              src="/images/astro-souvik2.jpg" 
              className="object-cover w-full h-full object-top" 
              alt="Sri Souvik Shastri" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80";
              }}
            />
          </div>

          {/* --- PROFILE TEXT AND INFO BLOCK (FIXED SPACING & CUT-OFF ISSUE) --- */}
          <div className="flex-grow w-full text-center md:text-left flex flex-col justify-center space-y-4">
            
            {/* Badge Element Wrapper */}
            <div className="block w-full">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 text-xs text-yellow-400 font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-400" /> 
                <span>অভিজ্ঞ জ্যোতিষাচার্য</span>
              </div>
            </div>

            {/* Majestic Heading Title Banner (FIXED FOR CLIP-TEXT CUT OFF) */}
            <h1 className="text-4xl md:text-5xl font-black font-serif tracking-wide bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent block leading-normal py-2 px-1">
              শ্রী সৌভিক শাস্ত্রী
            </h1>

            {/* Main Descriptive Bio Paragraph Node */}
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed font-medium pt-1">
              জীবনের বিভিন্ন সমস্যার সমাধান জ্যোতিষ শাস্ত্রের মাধ্যমে সঠিক পরামর্শ ও দিক নির্দেশনার সাহায্যে করা হয়।
            </p>
            
            {/* Micro-Badges Navigation Triggers */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 text-xs font-bold text-amber-300">
              <span className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-sm">✦ জ্যোতিষ পরামর্শ</span>
              <span className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-sm">✦ সঠিক দিশা</span>
              <span className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-sm">✦ সফল জীবন</span>
            </div>

          </div>
        </div>

        {/* --- DATA CAPTURE NOTICE MODAL BLOCK --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3 text-yellow-400 font-bold text-base">
              <Calendar className="w-5 h-5" /> কুষ্ঠী ও হরফ প্রস্তুতি
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              আপনার জন্ম তারিখ, জন্ম সময়, জন্মস্থান ও নামের ভিত্তিতে সঠিকভাবে কোষ্ঠী বিচার ও রেখা বিশ্লেষণ প্রস্তুত করা হয়।
            </p>
          </div>

          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3 text-yellow-400 font-bold text-base">
              <MessageSquare className="w-5 h-5" /> অনলাইন হ্যান্ড রিডিং কনসাল্টেশন
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              যাদের জন্ম সময় বা জন্মতারিখ জানা নেই, তারা হাতের ছবি পাঠিয়েও অনলাইনের মাধ্যমে সম্পূর্ণ সঠিক দিক-নির্দেশনামূলক কনসাল্টেশন করতে পারবেন।
            </p>
          </div>
        </div>

        {/* --- SERVICES GRID DISPLAY PANELS --- */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-yellow-400 inline-block border-b-2 border-yellow-500/30 pb-2 px-6">
              আমাদের পরিষেবাসমূহ (Our Sacred Offerings)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((item, index) => (
              <div key={index} className="border border-white/5 bg-white/[0.02] hover:border-yellow-500/20 p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CALL TO ACTION PANEL --- */}
        <div className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-500/10 to-transparent rounded-2xl p-6 text-center space-y-4">
          <p className="text-base font-bold tracking-wide text-amber-200">
            নির্ভুল ও নিখুঁত ভবিষ্যৎ জানতে আজই সরাসরি যোগাযোগ করুন
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={`https://wa.me/91${phone_number}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white rounded-xl shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp: {phone_number}
            </a>
            <a 
              href={`tel:+91-8535879134`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-sm text-white rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" /> Direct Call: 8535879134
            </a>
          </div>
          <p className="text-xs text-gray-400">অনলাইন ও অফলাইন— উভয় মাধ্যমেই পরামর্শ প্রদান করা হয়।</p>
        </div>

      </div>
    </div>
  );
}