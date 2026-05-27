import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 🌟 Added to enable page navigation link hooks

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/all-feedback')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.slice(0, 6)); // Show top 6
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching public reviews:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="text-center text-yellow-500 py-10 font-mono text-xs">Loading Testimonials...</div>;

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-black to-[#05040a] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mt-1">Words of Cosmic Gratitude</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">Read real stories and experiences shared by clients guided by Souvik Shastri.</p>
        </div>

        {/* REVIEWS GRID LAYOUT */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center text-xs italic">No celestial reviews recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-yellow-500/20 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex text-yellow-400 text-base">
                      {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => <span key={i} className="text-gray-700">★</span>)}
                    </div>
                    {review.review_tags && (
                      <div className="flex flex-wrap gap-1">
                        {review.review_tags.split(', ').map((tag, idx) => (
                          <span key={idx} className="text-[9px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/10 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 italic font-sans leading-relaxed mb-6">
                    "{review.comments || "Highly recommended session!"}"
                  </p>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs text-gray-400">
                  <span className="font-bold text-white font-serif">👤 {review.client_name}</span>
                  <span className="text-[10px] font-mono">✓ Verified Client</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🌟 NEW: THE BOTTOM ACTION BUTTON LINK FOR CLIENTS */}
        <div className="text-center mt-4">
          <Link 
            to="/feedback" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/20 text-yellow-400 font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(234,179,8,0.05)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            ★ Share Your Experience (Leave a Review)
          </Link>
        </div>

      </div>
    </section>
  );
}