import React, { useState } from 'react';

export default function BookingModal({ service, onClose }) {
  const service_title = service?.title || "General Consultation";

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    consultation_type: 'Online',
    appointment_date: '',
    appointment_time: '',
    birth_date: '',
    birth_time: '',
    birth_place: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // 🌐 PRODUCTION LIVE SERVER ROUTING ADDRESS:
  const BACKEND_API_URL = "https://astro-souvik-hub.onrender.com";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Main Execution Engine: Transmits Data Directly to PostgreSQL
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBookingResult(null);

    // 🌟 PERFECT ALIGNMENT: Payload variables must exactly match class BookingRequest inside main.py
    const payload = {
      client_name: formData.client_name.trim(),
      client_phone: formData.client_phone.trim(),
      client_email: formData.client_email.trim(),
      consultation_type: formData.consultation_type,
      appointment_date: formData.appointment_date,
      appointment_time: formData.appointment_time,
      birth_date: formData.birth_date,
      birth_time: formData.birth_time,
      birth_place: formData.birth_place.trim()
    };

    try {
      // ✅ FIXED: Changed from localhost to your live production backend URL path
      const response = await fetch(`${BACKEND_API_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setBookingResult({ success: true, booking_id: data.booking_id || 'ALIGNED-' + Math.floor(Math.random() * 90000 + 10000) });
      } else {
        setBookingResult({ success: false, message: data.detail || 'Internal serialization validation fail.' });
      }
    } catch (err) {
      setBookingResult({ success: false, message: 'Cannot contact validation node router. Verify backend server status.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 md:p-8 relative my-auto border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors">
          &times;
        </button>

        {!bookingResult ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2 font-serif">Sacred Consultation Portal</h2>
            <p className="text-sm text-gray-300 mb-6">
              Configuring Appointment Alignment for: <span className="text-white font-semibold">{service_title}</span> ({service?.duration || '45 Mins'})
            </p>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                <input required type="text" name="client_name" value={formData.client_name} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <input required type="email" name="client_email" value={formData.client_email} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Contact Number</label>
                <input required type="tel" name="client_phone" value={formData.client_phone} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Medium Alignment</label>
                <select name="consultation_type" value={formData.consultation_type} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors">
                  <option value="Online">Online Video Call (Zoom/Meet)</option>
                  <option value="In-Person">In-Person Consultation Office</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Desired Session Date</label>
                <input required type="date" name="appointment_date" value={formData.appointment_date} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Desired Session Time</label>
                <input required type="time" name="appointment_time" value={formData.appointment_time} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>

              <div className="md:col-span-2 border-t border-white/10 my-2 pt-4">
                <h4 className="text-sm font-semibold text-amber-300 mb-3">Natal Birth Configuration Matrices (Crucial for Ephemeris Charts)</h4>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Date of Birth</label>
                <input required type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Exact Time of Birth</label>
                <input required type="time" name="birth_time" value={formData.birth_time} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Place of Birth (City, State, Country)</label>
                <input required type="text" name="birth_place" value={formData.birth_place} placeholder="e.g., Kolkata, West Bengal, India" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-yellow-500 outline-none transition-colors" />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="md:col-span-2 w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-black font-black uppercase tracking-wider shadow-lg transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? 'Booking Your Session Placeholder...' : `Confirm Booking (Pay at Chamber: ${service?.price || '₹1,500'})`}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            {bookingResult.success ? (
              <>
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 text-3xl flex items-center justify-center rounded-full mx-auto mb-4">✓</div>
                <h2 className="text-2xl font-bold text-white mb-2">Booking Successfully Secured!</h2>
                <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
                  Your appointment timeline has been reserved. You can complete the energy exchange via Cash or UPI at the time of your consultation session.
                </p>
                <div className="bg-black/60 rounded-xl p-4 inline-block font-mono border border-yellow-500/30 text-yellow-400 mb-6 text-lg tracking-widest font-bold">
                  TRACKING ID: {bookingResult.booking_id}
                </div>
                <p className="text-xs text-gray-400 block">System redirected mapping payload data stream safely to verification relays.</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-rose-500/10 border border-rose-500 text-rose-400 text-3xl flex items-center justify-center rounded-full mx-auto mb-4">✕</div>
                <h2 className="text-2xl font-bold text-white mb-2">Process Routing Failure</h2>
                <p className="text-gray-300 mb-6">{bookingResult.message}</p>
                <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
                  Close and Re-try
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}