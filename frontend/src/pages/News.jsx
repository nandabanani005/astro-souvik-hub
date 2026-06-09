import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Sparkles, Trash2 } from 'lucide-react'; // 🌟 Added Trash2 Icon

export default function News() {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌐 PRODUCTION LIVE SERVER ROUTING PATH:
  const BACKEND_API_URL = "https://astro-souvik-hub.onrender.com";

  // Fetch all news posts from database
  useEffect(() => {
    fetch(`${BACKEND_API_URL}/api/public-news`)
      .then((res) => res.json())
      .then((data) => {
        setNewsFeed(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error pulling cosmic news channel streams:", err);
        setIsLoading(false);
      });
  }, []);

  // 🌟 NEW: Execution loop to handle news deletion directly from the feed
  const handleDeletePost = async (newsId) => {
    if (!window.confirm("Are you sure you want to delete this celestial news post permanently?")) return;

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/news/${newsId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert("Post removed successfully from the cosmos!");
        // Instantly remove it from your screen without needing to reload
        setNewsFeed((prevFeed) => prevFeed.filter((post) => post.id !== newsId));
      } else {
        alert("Failed to delete. Check server connection parameters.");
      }
    } catch (err) {
      console.error("Delete operation dropped:", err);
      alert("Network error. Could not contact backend server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020105] text-white pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs text-amber-300 font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Daily Celestial Insights
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-white">Astrology News & Transits</h1>
          <p className="text-sm text-gray-400 mt-2">Daily spiritual updates and planetary guidance straight from Astro Souvik.</p>
        </div>

        {/* LOADING & EMPTY STATES */}
        {isLoading ? (
          <div className="text-center text-yellow-500 font-mono text-xs py-10">Syncing with planetary charts...</div>
        ) : newsFeed.length === 0 ? (
          <div className="text-center border border-white/5 bg-white/[0.01] p-12 rounded-2xl text-gray-400 italic text-sm">
            No news updates published today. Check back later for your daily cosmic reading!
          </div>
        ) : (
          /* NEWS CARDS LOG FEED */
          <div className="space-y-8">
            {newsFeed.map((post) => (
              <article 
                key={post.id} 
                className="group relative border border-white/10 bg-white/[0.01] backdrop-blur-2xl p-6 md:p-8 rounded-2xl shadow-2xl hover:border-amber-500/30 transition-all duration-300"
              >
                {/* 🌟 ADMIN TRASH BUTTON: Visible right on the card */}
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="absolute top-6 right-6 p-2 text-gray-500 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 rounded-xl transition-all duration-200 border border-white/5 z-10"
                  title="Delete Post permanently"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* META INFO ROW */}
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-white/5 pb-3 pr-8">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md border border-amber-500/10">
                    ✨ {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" /> 
                    {new Date(post.created_at).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                  </div>
                </div>

                {/* MAIN BANNER POSTER */}
                {post.image_url && (
                  <div className="w-full mb-6 overflow-hidden rounded-xl border border-white/10 max-h-[450px] flex items-center justify-center bg-black/40">
                    <img 
                      src={post.image_url.startsWith('http') ? post.image_url : `${BACKEND_API_URL}${post.image_url}`} 
                      alt={post.title}
                      className="w-full h-auto object-contain max-h-[440px] rounded-xl hover:scale-[1.01] transition-transform duration-500"
                      onError={(e) => { 
                        console.error("Main Image load failed:", post.image_url);
                        e.target.style.display = 'none'; 
                      }}
                    />
                  </div>
                )}

                {/* HEADLINE TITLE */}
                <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 group-hover:text-amber-300 transition-colors pt-1 pb-1">
                  {post.title}
                </h2>
                
                {/* SMART CONTENT PARSER FOR INLINE TEXT IMAGES */}
                <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                  {post.content.split('\n').map((block, idx) => {
                    const cleanLine = block.trim();
                    
                    if (cleanLine.startsWith('[img:') && cleanLine.endsWith(']')) {
                      const extractedUrl = cleanLine.replace('[img:', '').replace(']', '').trim();
                      
                      return (
                        <div key={idx} className="w-full my-6 overflow-hidden rounded-xl border border-white/5 bg-black/50 flex justify-center max-h-[550px]">
                          <img 
                            src={extractedUrl.startsWith('http') ? extractedUrl : `${BACKEND_API_URL}${extractedUrl}`} 
                            alt="Cosmic content visual" 
                            className="w-full h-auto object-contain max-h-[550px] rounded-lg shadow-md"
                            onError={(e) => { 
                              console.error("Inline Image load failed:", extractedUrl);
                              e.target.style.display = 'none'; 
                            }}
                          />
                        </div>
                      );
                    }
                    
                    return cleanLine ? (
                      <p key={idx} className="whitespace-pre-wrap">{block}</p>
                    ) : (
                      <div key={idx} className="h-2"></div>
                    );
                  })}
                </div>

              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}