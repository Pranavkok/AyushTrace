'use client';
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497250681960-ef046c08a56e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBsZWF2ZXMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')" }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/40 backdrop-blur-[1px] flex flex-col">
        
        {/* Navbar - Mobile First */}
        <nav className="relative px-4 sm:px-6 lg:px-8 py-4 bg-green-900/90 backdrop-blur-md text-white shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="text-xl font-bold">
              Ayu<span className="text-green-300">Trace</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 text-base font-medium">
              <a href="#about" className="hover:text-green-300 transition-colors duration-200 hover:scale-105 transform">About Us</a>
              <a href="#stocks" className="hover:text-green-300 transition-colors duration-200 hover:scale-105 transform">Stocks</a>
              <a href="#feedback" className="hover:text-green-300 transition-colors duration-200 hover:scale-105 transform">Feedback</a>
              <a href="#contacts" className="hover:text-green-300 transition-colors duration-200 hover:scale-105 transform">Contacts</a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex gap-4 items-center">
              <button className="hover:text-green-300 transition-all duration-200 hover:scale-110 transform text-xl">🔍</button>
              <button className="hover:text-green-300 transition-all duration-200 hover:scale-110 transform text-xl">👤</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Toggle navigation menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-4 pb-2 space-y-3">
              <a href="#about" className="block hover:text-green-300 transition-colors duration-200 py-2">About Us</a>
              <a href="#stocks" className="block hover:text-green-300 transition-colors duration-200 py-2">Stocks</a>
              <a href="#feedback" className="block hover:text-green-300 transition-colors duration-200 py-2">Feedback</a>
              <a href="#contacts" className="block hover:text-green-300 transition-colors duration-200 py-2">Contacts</a>
              <div className="flex gap-4 pt-2">
                <button className="hover:text-green-300 transition-all duration-200 text-xl">🔍</button>
                <button className="hover:text-green-300 transition-all duration-200 text-xl">👤</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-8 lg:gap-16 p-4 sm:p-6 lg:p-12">
          {/* Left Box - Leaf Image */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-green-600/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1517135399940-2855f5be7c4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVyYnN8ZW58MHx8MHx8fDA%3D" 
              alt="Herbal Leaves" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
            />
          </div>

          {/* Right - Title + Greeting + Buttons */}
          <div className="flex flex-col items-center xl:items-start gap-6 lg:gap-8 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-green-50 drop-shadow-2xl tracking-wide text-center xl:text-left animate-pulse">
              Ayu<span className="text-green-300">Trace</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-green-100 text-center xl:text-left leading-relaxed max-w-lg">
              🌿 Welcome — Let&apos;s maintain transparency in herbs you consume.
            </p>

            {/* Role Buttons - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-3 sm:gap-4 w-full max-w-lg xl:max-w-md">
              <button className="px-4 py-3 sm:px-6 sm:py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base">
                <Link href="/farmer" className="block w-full h-full">Farmer</Link>
              </button>
              <button className="px-4 py-3 sm:px-6 sm:py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base">
              <Link href="/labTester" className="block w-full h-full">Lab Tester</Link>
              </button>
              <button className="px-4 py-3 sm:px-6 sm:py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base">
              <Link href="/trader" className="block w-full h-full">Trader</Link>
              </button>
              <button className="px-4 py-3 sm:px-6 sm:py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base">
              <Link href="/manufacturer" className="block w-full h-full">Manufacturer</Link>               
              </button>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8 py-6 bg-green-900/90 backdrop-blur-md text-white">
          <span className="text-base lg:text-lg font-medium">Connect with us</span>
          <button className="px-6 py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium">
            Gallery
          </button>
        </footer>
      </div>
    </div>
  );
}