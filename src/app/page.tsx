import React from 'react';
import { Zap, Globe, Users } from 'lucide-react';
import Image from 'next/image';

const DailyGamesLanding = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Circuit-style logo matching your designs */}
              <div className="relative" style={{width: '270px'}}>
                {/* Circuit pattern inspired by your logos */}
               <Image src="/logo-title.png" alt="Daily Games Logo" width={270} height={60} />
              </div>
            </div>
          </div>
          
          {/* Nav items 
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-[#00FF88] transition-colors">News</a>
            <a href="#" className="text-gray-400 hover:text-[#00FF88] transition-colors">Gaming</a>
            <a href="#" className="text-gray-400 hover:text-[#00FF88] transition-colors">Reviews</a>
            <button className="bg-gradient-to-r from-[#00FF88] to-[#E91E63] text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>*/}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00FF88] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E91E63] rounded-full opacity-10 blur-3xl"></div>
          {/* Circuit pattern background */}
          <div className="absolute inset-0 opacity-5">
            <Image src="/file.svg" alt="" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Bientôt</span>
            <br />
            {/*<span className="text-transparent bg-gradient-to-r from-[#00FF88] to-[#E91E63] bg-clip-text">
              Hit them all.
            </span>*/}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Toute l&apos;actualité gaming en un seul endroit.<br/> 
            <span className="text-[#00FF88]"> Zero bullshit.</span>
          </p>

          {/* CTA buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-[#00FF88] to-[#E91E63] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
              <span>Découvrir maintenant</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:border-[#00FF88] transition-colors">
              Voir la démo
            </button>
          </div>
          */}
          {/* Features */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#00FF88]" />
              <span>Flux en temps réel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-[#00FF88]" />
              <span>Sources multiples agrégées</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#00FF88]" />
              <span>Fait pour les gamers, par un gamer</span>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#30363D]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF7F] to-[#FF6B35] rounded opacity-20"></div>
                <div className="absolute inset-0.5 bg-[#0D1117] rounded"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-transparent bg-gradient-to-r from-[#00FF7F] to-[#FF6B35] bg-clip-text font-bold text-sm">
                    DG
                  </div>
                </div>
              </div>
              {/*<span className="text-[#F0F6FC] font-semibold">Daily-Games</span>*/}
            </div>
            
            {/*<div className="flex space-x-6 text-[#7D8590]">
              <a href="#" className="hover:text-[#00FF7F] transition-colors">À propos</a>
              <a href="#" className="hover:text-[#00FF7F] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#00FF7F] transition-colors">Privacy</a>
            </div>*/}
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#30363D] text-center text-[#7D8590]">
            <p>&copy; 2025 Daily-Games. Hit different. Hit them all.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DailyGamesLanding;