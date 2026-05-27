import React, { useState } from 'react';
import { 
  Briefcase, Compass, GraduationCap, Heart, ShieldAlert, 
  Sparkles, Eye, HelpCircle, Shield, Wifi 
} from 'lucide-react';
import BookingModal from './BookingModal';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const servicesList = [
    {
      id: 1,
      serviceId: "SRV-BIZ",
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      title: "ব্যবসা ও বাণিজ্য সংক্রান্ত পরামর্শ",
      tagline: "ব্যবসার সমস্যা, আর্থিক উন্নতি ও সঠিক সিদ্ধান্তের জন্য জ্যোতিষ পরামর্শ প্রদান।",
      investment: "2,100",
      image: "/images/image1.jpeg" // Cosmic space charts
    },
    {
      id: 2,
      serviceId: "SRV-CAR",
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      title: "ক্যারিয়ার ও চাকরির সমস্যা সমাধান",
      tagline: "চাকরি, কর্মজীবন ও ভবিষ্যৎ ক্যারিয়ার নিয়ে দিকনির্দেশনা।",
      investment: "2,500",
      image:"/images/image2.jpeg" // Celestial constellations lines
    },
    {
      id: 3,
      serviceId: "SRV-EDU",
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      title: "পড়াশোনা ও শিক্ষাজনিত বাধা দূরীকরণ",
      tagline: "পড়াশোনায় মনোযোগ, পরীক্ষায় সাফল্য ও শিক্ষাগত সমস্যার সমাধান।",
      investment: "1,500",
      image: "/images/image5.jpeg"// Geometric celestial design
    },
    {
      id: 4,
      serviceId: "SRV-MAR",
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      title: "দাম্পত্য অশান্তি ও বিবাহে বাধা দূরীকরণ",
      tagline: "বিবাহে দেরি, সম্পর্কের সমস্যা ও পারিবারিক অশান্তির সমাধান।",
      investment: "3,100",
      image: "/images/image8.jpeg"// Ethereal golden star nebula
    },
    {
      id: 5,
      serviceId: "SRV-DOS",
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
      title: "বিভিন্ন ধরনের দোষ নির্ণয় ও প্রতিকার",
      tagline: "জ্যোতিষ অনুযায়ী দোষ শনাক্ত করে তার প্রতিকার প্রদান।",
      investment: "2,900",
      image: "/images/image3.jpeg"// Deep spiritual eclipse
    },
    {
      id: 6,
      serviceId: "SRV-KUN",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
      title: "কুষ্ঠি তৈরি ও গ্রহ-নক্ষত্র বিচার",
      tagline: "জন্ম তারিখ, সময় ও স্থান অনুযায়ী রাশিফল ও কুষ্ঠি প্রস্তুত করা।",
      investment: "2,100",
      image: "/images/image6.jpeg" // Star trails dynamic matrix
    },
    {
      id: 7,
      serviceId: "SRV-PALM",
      icon: <Eye className="w-5 h-5 text-orange-400" />,
      title: "হাতের ছবি দেখে অনলাইন কনসালটেশন",
      tagline: "জন্ম তথ্য না থাকলেও হাতের ছবি পাঠিয়ে পরামর্শ নেওয়ার সুবিধা।",
      investment: "1,800",
      image: "/images/image9.jpeg" // Glowing mystical energy fields
    },
    {
      id: 8,
      serviceId: "SRV-GUIDE",
      icon: <HelpCircle className="w-5 h-5 text-blue-400" />,
      title: "জ্যোতিষ পরামর্শ ও সঠিক দিশা প্রদান",
      tagline: "জীবনের বিভিন্ন সমস্যার সমাধানে জ্যোতিষভিত্তিক দিকনির্দেশনা।",
      investment: "1,500",
      image:"/images/image4.jpeg"
    },
    {
      id: 9,
      serviceId: "SRV-KAVACH",
      icon: <Shield className="w-5 h-5 text-amber-500" />,
      title: "সুলভ মূল্যে বিভিন্ন ধরনের কবচ প্রদান",
      tagline: "আধ্যাত্মিক সুরক্ষা ও সৌভাগ্যের জন্য বিভিন্ন কবচ সরবরাহ।",
      investment: "3,500",
      image:"/images/image7.jpeg"// Sacred geometry abstract graphic
    },
    {
      id: 10,
      serviceId: "SRV-HYBRID",
      icon: <Wifi className="w-5 h-5 text-violet-400" />,
      title: "অনলাইন ও অফলাইন পরামর্শ সুবিধা",
      tagline: "উভয় মাধ্যমেই চেম্বারে এসে বা দূর থেকে কল/ভিডিও কলের মাধ্যমে পরামর্শের সুবিধা।",
      investment: "2,000",
      image: "/images/image10.jpeg"// Dual cosmic portal energy lines
    }
  ];

  const handleOpenBooking = (service) => {
    setSelectedService({
      id: service.serviceId,
      title: service.title,
      price: `₹${service.investment}`,
      icon: "🔮"
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030208] text-white pt-28 pb-16 px-6 md:px-16 relative overflow-hidden selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-wide bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
            আমাদের আধ্যাত্মিক পরিষেবাসমূহ
          </h1>
          <div className="h-0.5 w-24 bg-yellow-500/40 mx-auto rounded-full" />
          <p className="text-sm text-gray-400 font-medium">
            আপনার কাঙ্ক্ষিত পরিষেবাটি নির্বাচন করে সরাসরি বুকিং ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* Luxurious Services Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/5 bg-white/[0.01] hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] group transition-all duration-300"
            >
              {/* Card Image Header Box */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                />
                
                {/* Embedded Dynamic Icon Badge */}
                <div className="absolute top-4 left-4 z-20 p-2.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                  {service.icon}
                </div>
              </div>

              {/* Card Body Content Node */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 min-h-[56px] flex items-center">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed min-h-[40px]">
                    {service.tagline}
                  </p>
                </div>

                {/* Footer Interaction Elements */}
                <div className="w-full flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Dakshina</div>
                    <div className="text-xl font-black text-yellow-400">₹{service.investment}</div>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenBooking(service)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-yellow-500 hover:border-yellow-400 hover:text-black shadow-md transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Synchronized Popup Dialog Portal */}
      {isModalOpen && selectedService && (
        <BookingModal 
          service={selectedService} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }} 
        />
      )}
    </div>
  );
}