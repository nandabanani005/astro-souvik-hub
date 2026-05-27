import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo Title */}
        <Link to="/" className="text-xl font-bold text-yellow-400 font-serif tracking-wide hover:opacity-90 transition-opacity">
          Astro Souvik
        </Link>

        {/* Global Navigation Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          
          {/* 🌟 THIS WAS MISSING - ADDED SERVICES ROUTE LINK */}
          <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
          
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          <Link 
  to="/news" 
  className="text-gray-300 hover:text-amber-400 font-medium transition-colors"
>
  📰 Daily News
</Link>
          <Link to="/secure-sanctuary-matrix" className="text-yellow-500/80 hover:text-yellow-400 transition-colors font-mono">Dashboard</Link>
        </div>

      </div>
    </nav>
  );
}