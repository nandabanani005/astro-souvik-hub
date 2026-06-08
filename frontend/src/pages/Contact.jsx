import React, { useState } from 'react';

export default function Contact() {
  // 🌐 PRODUCTION LIVE SERVER ROUTING ADDRESS:
  const BACKEND_API_URL = "https://astro-souvik-hub.onrender.com";
  
  const WHATSAPP_NUMBER = "918535879134"; 
  const INSTAGRAM_HANDLE = "astrosouvik_official"; 
  const FACEBOOK_HANDLE = "astrosouvik.astrology"; 
  const DISPLAY_PHONE = "+91 85358 79134";
  const BUSINESS_EMAIL = "Astrologersouvik369@gmail.com";

  // Premium UI State Monitors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  // Form Processing Engine
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = {
      name: document.getElementById('clientName').value.trim(),
      email: document.getElementById('clientEmail').value.trim(),
      message: document.getElementById('clientMessage').value.trim()
    };

    try {
      // ✅ FIXED: Configured to target your permanent live Render cloud instance
      const response = await fetch(`${BACKEND_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'আপনার বার্তাটি সফলভাবে আমাদের ডাটাবেজে পাঠানো হয়েছে!'
        });
        e.target.reset(); 
      } else {
        setSubmitStatus({
          success: false,
          message: `সার্ভার ত্রুটি: ${responseData.detail || 'ত্রুটি সনাক্ত করা হয়েছে।'}`
        });
      }
    } catch (error) {
      console.error("Network Link Error Details:", error);
      setSubmitStatus({
        success: false,
        message: 'যোগাযোগ নেটওয়ার্ক বিচ্ছিন্ন হয়েছে। অনুগ্রহ করে নিশ্চিত করুন যে আপনার পাইথন সার্ভারটি চালু আছে।'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const encodedText = encodeURIComponent("নমস্কার শ্রী সৌভিক শাস্ত্রী মহাশয়, আমি জ্যোতিষ পরামর্শের জন্য কিছু তথ্য জানতে চাই।");
  const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  const instagramLink = `https://instagram.com/${INSTAGRAM_HANDLE}`;
  const facebookLink = `https://facebook.com/${FACEBOOK_HANDLE}`;

  return (
    <div className="min-h-screen bg-[#030208] text-white pt-28 pb-16 px-4">
      <section id="contact" className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-yellow-400 font-serif">
          সরাসরি যোগাযোগ করুন
        </h2>
        <div className="h-0.5 w-24 bg-yellow-500/40 mx-auto rounded-full mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT CARD: CONTACT INFO */}
          <div className="glass-panel rounded-2xl p-8 border border-white/5 backdrop-blur-xl bg-white/[0.01] flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">চেম্বার ও কার্যালয়</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                বুকিং করার আগে কোষ্ঠী বিচার, গ্রহের dasha বা যেকোনো প্রতিকার সংক্রান্ত বিষয়ে কোনো প্রশ্ন থাকলে নিচে দেওয়া মাধ্যমগুলির সাহায্যে সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন।
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-xl bg-white/5 p-3 rounded-xl border border-white/5 text-yellow-400">📍</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">প্রধান চেম্বার</p>
                  <p className="font-medium text-base">Argoal, purba Medinipur, west bengal</p>
                </div>
              </div>

              <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-4 text-gray-300 hover:text-yellow-400 transition-colors group">
                <span className="text-xl bg-white/5 p-3 rounded-xl border border-white/5 text-yellow-400 group-hover:border-yellow-500/30 transition-colors">✉️</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">ইমেল আইডি</p>
                  <p className="font-medium text-base">{BUSINESS_EMAIL}</p>
                </div>
              </a>

              <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-4 text-gray-300 hover:text-yellow-400 transition-colors group">
                <span className="text-xl bg-white/5 p-3 rounded-xl border border-white/5 text-yellow-400 group-hover:border-yellow-500/30 transition-colors">📞</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">সরাসরি কল করুন</p>
                  <p className="font-medium text-base">{DISPLAY_PHONE}</p>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3 text-xs text-gray-400 items-center">
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 text-yellow-400 font-bold transition-colors duration-200 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <span>WhatsApp</span> <span className="text-sm">💬</span>
              </a>

              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-gray-300 font-medium transition-colors duration-200 flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span>Instagram</span> <span className="text-xs opacity-70">📸</span>
              </a>

              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-gray-300 font-medium transition-colors duration-200 flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span>Facebook</span> <span className="text-xs opacity-70">👥</span>
              </a>
            </div>
          </div>

          {/* RIGHT CARD: CONTACT FORM */}
          <div className="glass-panel rounded-2xl p-8 border border-white/5 backdrop-blur-xl bg-white/[0.01]">
            <h3 className="text-xl font-bold text-white mb-4 font-serif">আপনার বার্তা পাঠান</h3>
            
            {submitStatus && (
              <div className={`p-4 rounded-xl text-xs border mb-4 font-sans leading-relaxed ${
                submitStatus.success 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}>
                {submitStatus.success ? '✓ ' : '✕ '} {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 tracking-wider mb-1">আপনার সম্পূর্ণ নাম</label>
                <input id="clientName" type="text" required placeholder="উদাঃ সুরজিৎ মুখার্জী" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors" />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-400 tracking-wider mb-1">আপনার ইমেল ঠিকানা</label>
                <input id="clientEmail" type="email" required placeholder="name@domain.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors" />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-400 tracking-wider mb-1">আপনার বার্তা বা সমস্যা</label>
                <textarea id="clientMessage" rows="4" required placeholder="আপনার সমস্যাটি সংক্ষেপে এখানে লিখুন..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-yellow-600/10 disabled:opacity-50"
              >
                {isSubmitting ? 'বার্তা পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}