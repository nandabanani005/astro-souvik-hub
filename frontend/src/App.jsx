import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🌟 Import your brand new Navbar component file
import Navbar from './components/Navbar';
// Core Application Feature Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback'; 
import News from './pages/News'; // 🌟 FIXED: Added this line to import your public news feed view layout

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        
        {/* 🌟 Render the Navbar at the top of every single page */}
        <Navbar />

        {/* Main Application Routes */}
        <main className="flex-grow pt-20"> {/* pt-20 adds top padding so content doesn't hide behind the navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            
            {/* 🌟 NEW ROUTE LINK: Maps the /feedback URL to your Zomato-style page */}
            <Route path="/feedback" element={<Feedback />} />

            {/* 🌟 FIXED ROUTE LINK: Maps the /news URL path directly to your celestial transit feed */}
            <Route path="/news" element={<News />} /> 
            
            {/* 🔒 PASSPHRASE PROTECTED ADMIN ACCESS GATE */}
            <Route path="/secure-sanctuary-matrix" element={<AdminRouteGate />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

// 🛡️ THE SECURITY ROUTE GUARD CONTROLLER
function AdminRouteGate() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdminVerify = (e) => {
    e.preventDefault();
    
    // 🌟 Secret Passcode authentication check
    if (passcode === 'souvik@admin2026') {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('❌ Invalid Security Passcode. Access Refused by Node Controls.');
    }
  };

  // If passphrase is valid -> mount dashboard table components natively
  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  // If a public visitor accesses this link -> render locked firewall barrier panel
  return (
    <div className="min-h-screen bg-[#030208] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-white/10 bg-white/[0.01] backdrop-blur-2xl p-8 rounded-2xl shadow-2xl text-center">
        <div className="text-4xl mb-3 text-yellow-500">🔒</div>
        <h2 className="text-xl font-bold text-white font-serif mb-2">Owner Authentication Portal</h2>
        <p className="text-xs text-gray-400 mb-6">Access strictly restricted to administrative web master profiles only.</p>

        {statusMessage => errorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl mb-4 font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAdminVerify} className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter Admin Master Passcode..." 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-center font-mono tracking-widest text-yellow-400 focus:border-yellow-500 outline-none transition-colors"
            required
          />
          <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 text-black font-black uppercase text-xs tracking-wider shadow-lg transform active:scale-[0.98] transition-all"
          >
            Decrypt Access Gate
          </button>
        </form>
      </div>
    </div>
  );
}