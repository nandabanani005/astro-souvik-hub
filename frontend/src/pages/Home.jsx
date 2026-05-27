import React, { useState } from 'react';
import { Sparkles, Calendar, Compass } from 'lucide-react';
import BookingModal from './BookingModal'; 
import ReviewSection from '../components/ReviewSection'; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // 🌟 LINE 9: This is where pt-20 goes (changed from pt-28)
    <div className="relative min-h-screen bg-[#020105] text-white pt-20 pb-16 overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* --- PREMIUM COSMIC LIGHTING & MESH BACKGROUNDS --- */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)] opacity-70 mix-blend-screen pointer-events-none blur-3xl animate-pulse" />
      <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-indigo-600/10 via-purple-900/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* --- CENTRAL MAIN HERO MATRIX WRAPPER --- */}
      {/* 🌟 LINE 18: Changed this to remove 'mt-4' entirely so the badge moves up */}
      <section className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12 px-4 sm:px-8 md:px-16">
        
        {/* --- TOP ROW: CENTRALIZED HERO HEADLINE --- */}
        <div className="text-center max-w-4xl space-y-5">
          {/* Spiritual Verification Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/30 backdrop-blur-md rounded-full px-5 py-2 text-xs text-amber-300 font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.05)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> প্রাচীন বৈদিক জ্যোতিষ রহস্য
          </div>

          {/* ... Rest of your code down below remains exactly the same! */}

          {/* Majestic Top-Centered Title Banner */}
          {/* Majestic Top-Centered Title Banner */}
{/* Majestic Top-Centered Title Banner */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-wide leading-[1.4] text-gray-100 antialiased">
  আপনার ভাগ্যের রহস্য উন্মোচন করুন{' '}
  <span className="block mt-2 pt-3 pb-3 bg-gradient-to-r from-yellow-400 via-amber-200 to-amber-400 bg-clip-text text-transparent font-black tracking-normal drop-shadow-[0_2px_30px_rgba(245,158,11,0.3)] filter contrast-125">
    জ্যোতিষাচার্য সৌভিক শাস্ত্রীর সাথে
  </span>
</h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto rounded-full mt-4" />
        </div>

        {/* --- BOTTOM ROW: SPLIT LAYOUT COLUMNS --- */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 mt-6">
          
          {/* LEFT COLUMN: BRAND STORY & PREMIUM ACTION TRIGGERS */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">
            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              আপনার জীবনের সঠিক দিশা, ব্যবসা ও ক্যারিয়ারের উন্নতি, দাম্পত্য সুখ এবং মানসিক শান্তি ফিরিয়ে আনতে প্রাচীন বৈদিক গণনা, সংখ্যাতত্ত্ব এবং শক্তিশালী গ্রহ-নক্ষত্রের নিখুঁত বিচার। হাজারো মানুষের বিশ্বস্ত ও নির্ভরযোগ্য আধ্যাত্মিক গাইড।
            </p>

            {/* Premium Interlocking Navigation Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 relative z-20">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-black font-bold tracking-widest text-xs uppercase shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-black" /> Book Consultation
              </button>
              <a 
                href="/services" 
                className="group w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-amber-500/40 font-bold tracking-widest text-xs uppercase transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-sm flex items-center justify-center text-white gap-2"
              >
                Explore Services <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              </a>
            </div>

            {/* Quick Micro-Trust Badges Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 text-gray-400 text-center lg:text-left">
              <div className="space-y-1">
                <div className="text-amber-400 font-bold text-lg sm:text-xl">12+</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Years Exp</div>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold text-lg sm:text-xl">15K+</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Happy Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold text-lg sm:text-xl">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Privacy Safe</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PROFESSIONAL GLASS PORTRAIT & DUAL ORBIT GLOW */}
          <div className="flex-1 w-full flex justify-center items-center relative min-h-[350px] sm:min-h-[420px]">
            {/* Layered Orbit Tracing Astrological Rings */}
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] border border-dashed border-amber-500/10 rounded-full animate-[spin_160s_linear_infinite] pointer-events-none" />
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 border border-white/5 rounded-full animate-[spin_100s_linear_infinite] pointer-events-none" />
            <div className="absolute w-60 h-60 sm:w-85 sm:h-85 bg-amber-500/10 mix-blend-screen filter blur-[70px] animate-pulse pointer-events-none" />
            
            {/* Glassmorphic Picture Frame Box */}
            <div className="w-68 h-80 sm:w-85 sm:h-96 rounded-2xl bg-gradient-to-b from-amber-500/15 via-white/[0.01] to-transparent border border-amber-500/30 flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Overlay Shimmer Flare Effect Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-20" />
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent transform rotate-45 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out z-20" />
              
              {/* Image Profile Frame Component */}
              <img 
                src="/images/astro-souvik.jpg" 
                alt="Astro Guru Souvik Mishra"
                className="object-cover w-full h-full object-top transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 z-10"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80";
                }}
              />

              {/* Status Badge Tag */}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-amber-400 font-bold font-mono border border-amber-500/30 rounded-lg px-3 py-1 bg-black/70 backdrop-blur-md z-20 whitespace-nowrap shadow-xl">
                Aura Matrix Active
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🌟 AUTOMATED PUBLIC REVIEW CARDS INJECTION DECK */}
      <div className="relative z-20 mt-12">
        <ReviewSection />
      </div>

      {/* --- POPUP DIALOG GATEWAY --- */}
      {isModalOpen && (
        <BookingModal 
          service={{ id: "SRV-GEN", title: "General Consultation", price: "2000" }} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}