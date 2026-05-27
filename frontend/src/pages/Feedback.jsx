import React, { useState } from 'react';

export default function Feedback() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Quick preset performance tags (Zomato-style review shortcuts)
  const quickTags = [
    'Accurate Prediction',
    'Deep Insightful Guidance',
    'Calming Energy',
    'Highly Professional',
    'Effective Remedies',
    'Patient Listener'
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setSubmissionStatus({ success: false, message: 'Please select a star rating before submitting.' });
      return;
    }

    setIsLoading(true);
    setSubmissionStatus(null);

    const payload = {
      client_name: name.trim() || 'Anonymous Client',
      rating: rating,
      review_tags: selectedTags.join(', '),
      comments: comments.trim()
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmissionStatus({ success: true, message: 'Thank you! Your celestial review has been saved.' });
        // Reset state matrices cleanly
        setName('');
        setRating(0);
        setSelectedTags([]);
        setComments('');
      } else {
        setSubmissionStatus({ success: false, message: 'Submission failed. Server rejection.' });
      }
    } catch (err) {
      setSubmissionStatus({ success: false, message: 'Cannot reach backend gateway channels.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030208] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl border border-white/10 bg-white/[0.01] backdrop-blur-3xl p-6 md:p-8 rounded-2xl shadow-2xl">
        
        {/* TOP PANEL CORE HEADLINE */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif text-yellow-400 mb-1">Share Your Experience</h2>
          <p className="text-xs text-gray-400">Help others find their cosmic alignment by rating your session.</p>
        </div>

        {submissionStatus && (
          <div className={`p-4 rounded-xl text-sm mb-4 font-medium text-center border ${
            submissionStatus.success 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {submissionStatus.message}
          </div>
        )}

        <form onSubmit={handleReviewSubmit} className="space-y-6">
          
          {/* 1. TEXT METRIC INPUT: CLIENT NAME */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Your Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Aarav Sharma (or leave blank for Anonymous)"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-yellow-500 outline-none transition-all"
            />
          </div>

          {/* 2. THE INTERACTIVE STAR ENGINE (ZOMATO-STYLE HOVER LIGHTS) */}
          <div className="text-center bg-black/30 border border-white/5 py-4 rounded-xl">
            <label className="block text-xs uppercase tracking-wider text-amber-400/80 mb-2 font-black">Session Rating</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-3xl transition-transform duration-100 transform active:scale-90 outline-none"
                >
                  <span className={`transition-colors duration-150 ${
                    star <= (hoverRating || rating) ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'text-gray-600'
                  }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-2 font-mono h-4">
              {hoverRating === 1 || rating === 1 ? '💔 Disappointing Experience' : ''}
              {hoverRating === 2 || rating === 2 ? '👁️ Could Be Better' : ''}
              {hoverRating === 3 || rating === 3 ? '✨ Satisfactory Alignment' : ''}
              {hoverRating === 4 || rating === 4 ? '🌟 Great and Highly Insightful' : ''}
              {hoverRating === 5 || rating === 5 ? '👑 Masterclass Cosmic Session!' : ''}
            </p>
          </div>

          {/* 3. QUICK CHIPS GRID SELECTION */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-bold">What did you love most?</label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`text-xs px-3 py-2 rounded-full border transition-all ${
                      isSelected 
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold' 
                        : 'bg-white/[0.02] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {tag} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. TEXTAREA COMMENT SECTION BLOCK */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-bold">Detailed Review</label>
            <textarea 
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell others how Souvik Shastri's readings helped guide your career, relationship, or planetary alignments..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-yellow-500 outline-none transition-all resize-none"
            />
          </div>

          {/* 5. TRANSMIT SUBMIT TRIGGER BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-black font-black uppercase text-xs tracking-wider shadow-lg transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? 'Submitting Review Details...' : 'Submit Celestial Feedback'}
          </button>

        </form>
      </div>
    </div>
  );
}
// 🌟 MAKE SURE THIS EXACT LINE IS AT THE VERY BOTTOM OF YOUR FEEDBACK.JSX FILE