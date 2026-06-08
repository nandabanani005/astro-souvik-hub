import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Compass, Newspaper, Upload, FileImage, Link as LinkIcon, RefreshCw, MessageSquare, Star, User } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEWS BROADCAST INPUT STATES ---
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Daily Transit');
  const [newsImageUrl, setNewsImageUrl] = useState(''); 
  const [newsFile, setNewsFile] = useState(null);       
  const [newsStatus, setNewsStatus] = useState('');

  // 🌐 PRODUCTION LIVE SERVER ROUTING ADDRESS:
  const BACKEND_API_URL = "https://astro-souvik-hub.onrender.com";

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let bookingsData = [];
      let messagesData = [];
      let feedbackData = [];

      // 1. Session Bookings Fetch
      try {
        const bookingsRes = await fetch(`${BACKEND_API_URL}/api/all-bookings`);
        if (bookingsRes.ok) bookingsData = await bookingsRes.json();
      } catch (err) {
        console.error("Failed to parse booking records:", err);
      }

      // 2. General Contact Inquiries Fetch
      try {
        const messagesRes = await fetch(`${BACKEND_API_URL}/api/consultations`);
        if (messagesRes.ok) messagesData = await messagesRes.json();
      } catch (err) {
        console.error("Failed to parse consultation records:", err);
      }

      // 3. Client Testimonials Fetch
      try {
        const feedbackRes = await fetch(`${BACKEND_API_URL}/api/all-feedback`);
        if (feedbackRes.ok) feedbackData = await feedbackRes.json();
      } catch (err) {
        console.error("Failed to fetch customer reviews:", err);
      }

      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setMessages(Array.isArray(messagesData) ? messagesData : []);
      setFeedbacks(Array.isArray(feedbackData) ? feedbackData : []);

    } catch (globalErr) {
      setError("Critical synchronization fault on data parsing matrices.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ==========================================
  // 🧹 THE ACTIVE ARCHIVE STATE DISPATCHER
  // ==========================================
  const handleCompleteSession = async (bookingId) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/booking/${bookingId}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        // ✨ Dynamic Filter: Instantly drops row element from frontend array without rendering lag!
        setBookings(prevBookings => prevBookings.filter(item => item.id !== bookingId));
      } else {
        alert("Server validation node blocked status update parameters.");
      }
    } catch (err) {
      console.error("Network bridge failure targeting complete endpoint:", err);
    }
  };

  // --- SMART NEWS FORM HANDLER ---
  const handlePostNews = async (e) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) return;
    setNewsStatus('Analyzing image source streams and routing packaging headers...');

    try {
      let res;
      
      if (newsFile) {
        const formData = new FormData();
        formData.append('title', newsTitle);
        formData.append('content', newsContent);
        formData.append('category', newsCategory);
        formData.append('file', newsFile);

        res = await fetch(`${BACKEND_API_URL}/api/news-with-file`, {
          method: 'POST',
          body: formData 
        });
      } 
      else {
        res = await fetch(`${BACKEND_API_URL}/api/news`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newsTitle,
            content: newsContent,
            category: newsCategory,
            image_url: newsImageUrl
          })
        });
      }

      if (res.ok) {
        setNewsStatus('✅ Post successfully transmitted to client news feeds!');
        setNewsTitle('');
        setNewsContent('');
        setNewsImageUrl('');
        setNewsFile(null);
      } else {
        setNewsStatus('❌ Network error saving news post entry.');
      }
    } catch (err) {
      setNewsStatus('❌ Gateway channel unreachable.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400 font-serif">Sacred Control Matrix</h1>
            <p className="text-sm text-gray-400">Review incoming celestial chart matrices, public testimonials, or publish news feeds</p>
          </div>
          <button onClick={fetchDashboardData} className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold bg-white/5 border border-white/10 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Relays
          </button>
        </div>

        {/* MANAGEMENT TAB BUTTONS BAR */}
        <div className="flex gap-6 mb-6 border-b border-white/10 pb-px flex-wrap">
          <button onClick={() => setActiveTab('bookings')} className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'bookings' ? 'text-yellow-400' : 'text-gray-400'}`}>
            📅 Session Bookings ({bookings.length})
            {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
          </button>
          
          <button onClick={() => setActiveTab('messages')} className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'messages' ? 'text-yellow-400' : 'text-gray-400'}`}>
            ✉️ General Inquiries ({messages.length})
            {activeTab === 'messages' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
          </button>

          <button onClick={() => setActiveTab('reviews')} className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'reviews' ? 'text-yellow-400' : 'text-gray-400'}`}>
            ⭐ Client Reviews ({feedbacks.length})
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
          </button>

          <button onClick={() => setActiveTab('publishNews')} className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'publishNews' ? 'text-yellow-400' : 'text-gray-400'}`}>
            📰 Publish Daily News
            {activeTab === 'publishNews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500 font-mono text-sm tracking-widest animate-pulse">DECRYPTING POSTGRESQL DATA CORES...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            
            {/* TAB 1: SESSION BOOKINGS VIEW */}
            {activeTab === 'bookings' && (
              bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-12 text-sm">No pending planetary alignments found.</p>
              ) : (
                bookings.map((b) => (
                  <div key={b.id || Math.random()} className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 flex flex-col gap-4 hover:border-yellow-500/20 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono px-2.5 py-1 rounded-md font-bold">{b.id}</span>
                        <h3 className="text-lg font-bold text-white">{b.client_name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/20 font-bold">
                          {b.consultation_type}
                        </span>
                        
                        <button 
                          onClick={() => handleCompleteSession(b.id)}
                          className="px-3 py-1 text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg transition-all duration-300"
                        >
                          Mark Complete ✓
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider mb-1">Appointment Schedule</p>
                        <p className="text-white font-medium">📅 {b.appointment_date}</p>
                        <p className="text-gray-400 mt-0.5">⏰ {b.appointment_time}</p>
                      </div>
                      <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider mb-1">Contact Relays</p>
                        <p className="text-white font-medium">📞 {b.client_phone}</p>
                        <p className="text-gray-400 mt-0.5 truncate">✉ {b.client_email}</p>
                      </div>
                      <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl sm:col-span-2">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider mb-1">Natal Birth Configuration Matrices</p>
                        <div className="grid grid-cols-3 gap-2 mt-1 font-mono text-gray-300">
                          <p>👶 DOB: <span className="text-yellow-400">{b.birth_date}</span></p>
                          <p>⏳ TOB: <span className="text-yellow-400">{b.birth_time}</span></p>
                          <p>📍 POB: <span className="text-white font-sans truncate block">{b.birth_place}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}

            {/* TAB 2: CONSULTATION INQUIRY ENGINE */}
            {activeTab === 'messages' && (
              messages.length === 0 ? (
                <p className="text-gray-500 text-center py-12 text-sm">No contact entries logged in database.</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id || Math.random()} className="border border-white/10 bg-white/[0.02] rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-2">{m.firstname || m.firstName} {m.lastname || m.lastName}</h3>
                    <p className="text-xs text-yellow-500/80 font-mono mb-4">{m.email}</p>
                    <p className="text-sm text-gray-300 bg-black/20 p-4 rounded-xl border border-white/5">{m.message}</p>
                  </div>
                ))
              )
            )}

            {/* TAB 3: CLIENT REVIEWS CONTAINER MATRIX */}
            {activeTab === 'reviews' && (
              feedbacks.length === 0 ? (
                <p className="text-gray-500 text-center py-12 text-sm">No user feedback records available inside PostgreSQL.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {feedbacks.map((review) => (
                    <div key={review.id || Math.random()} className="border border-white/10 bg-white/[0.01] backdrop-blur-xl p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-amber-500/20 transition-all">
                      <div>
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="flex text-yellow-400 text-base">
                            {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                            {Array.from({ length: 5 - review.rating }).map((_, i) => <span key={i} className="text-gray-800">★</span>)}
                          </div>
                          {review.review_tags && (
                            <div className="flex flex-wrap gap-1">
                              {review.review_tags.split(', ').map((tag, idx) => (
                                <span key={idx} className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-md font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-200 italic leading-relaxed mb-4">
                          "{review.comments || "No textual review input written."}"
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[11px] text-gray-400">
                        <span className="font-bold text-white">👤 {review.client_name}</span>
                        <span className="font-mono text-[10px]">🗓️ {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Just Now"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* TAB 4: DAILY NEWS BROADCASTER FORM */}
            {activeTab === 'publishNews' && (
              <div className="max-w-2xl mx-auto w-full border border-white/10 bg-white/[0.01] backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold font-serif text-yellow-400 mb-4 flex items-center gap-2">
                  <Newspaper className="w-5 h-5" /> Broadcast Daily Astro News
                </h3>
                {newsStatus && <p className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-amber-400 mb-4 text-center font-mono">{newsStatus}</p>}
                
                <form onSubmit={handlePostNews} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">Update Category Channel</label>
                    <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-yellow-500">
                      <option value="Daily Transit">🪐 Daily Transit Update</option>
                      <option value="Festival Guide">🕉️ Festival &amp; Puja Muhurat</option>
                      <option value="Horoscope Tip">🌟 Lucky Horoscope Tips</option>
                      <option value="General News">📢 Important Announcement</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">News Headline Title</label>
                    <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="e.g., আজ রাহু পরিবর্তন: ১২টি রাশির ওপর প্রভাব বিচার..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-yellow-500" required />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1.5">
                      Source A: Select Poster Image File from device Gallery
                    </label>
                    <div className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all bg-white/[0.01] hover:bg-white/[0.02]">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          setNewsFile(e.target.files[0]);
                          if (e.target.files[0]) setNewsImageUrl(''); 
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center gap-2 text-center text-xs text-gray-400 pointer-events-none">
                        {newsFile ? (
                          <>
                            <FileImage className="w-8 h-8 text-yellow-400" />
                            <p className="text-yellow-400 font-mono font-bold">📁 Chosen Gallery Image: {newsFile.name}</p>
                            <p className="text-[10px] text-gray-500">Click or Drag again to update selection</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-500" />
                            <p className="font-medium text-gray-300">📸 Click here to browse your phone/computer photo gallery</p>
                            <p className="text-[10px] text-gray-500 font-mono">Supports JPEG, PNG, WEBP infographics</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {!newsFile && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <LinkIcon className="w-3 h-3 text-gray-500" />
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500">
                          Source B Alternate: Or Paste Web Browser Image Address instead
                        </label>
                      </div>
                      <input 
                        type="url" 
                        value={newsImageUrl} 
                        onChange={(e) => setNewsImageUrl(e.target.value)} 
                        placeholder="Right-click browser image -> Copy Image Address -> Paste here" 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 placeholder-gray-600" 
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">News Body Content</label>
                    <textarea rows="8" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} placeholder="Type your full analysis report details here..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 resize-none font-sans" required />
                  </div>
                  
                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 text-black font-black uppercase text-xs tracking-wider shadow-md transform active:scale-95 transition-all">
                    Launch Live Broadcast
                  </button>
                </form>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}