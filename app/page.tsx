// app/page.tsx
'use client';
import Link from 'next/link'
export default function LandingPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497250681960-ef046c08a56e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBsZWF2ZXMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')" }}
    >
      {/* Overlay to make text more readable */}
      <div className="min-h-screen bg-black/30 flex flex-col">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-green-900/80 text-white shadow-md">
          <div className="flex gap-6 text-lg font-medium">
            <a href="#about" className="hover:text-green-300">About Us</a>
            <a href="#stocks" className="hover:text-green-300">Stocks</a>
            <a href="#feedback" className="hover:text-green-300">Feedback</a>
            <a href="#contacts" className="hover:text-green-300">Contacts</a>
          </div>
          <div className="flex gap-4 items-center">
            <button className="hover:text-green-300">🔍</button>
            <button className="hover:text-green-300">👤</button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 flex-col md:flex-row items-center justify-center gap-12 p-8">
          {/* Left Box - Leaf Image */}
          <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg border-4 border-green-700">
            <img 
              src="https://images.unsplash.com/photo-1517135399940-2855f5be7c4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVyYnN8ZW58MHx8MHx8fDA%3D" 
              alt="Herbal Leaves" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Right - Title + Greeting + Buttons */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h1 className="text-6xl font-extrabold text-green-50 drop-shadow-lg tracking-wide">
              Ayu<span className="text-green-300">Trace</span>
            </h1>
            <p className="text-lg text-green-100 max-w-md text-center md:text-left">
              🌿 Welcome — Let’s maintain transparency in herbs you consume.
            </p>

            {/* Role Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
                <Link href="/farmer">Farmer</Link>
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
                Lab Tester
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
                Trader
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
                Manufacturer
              </button>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="flex justify-between items-center px-8 py-6 bg-green-900/80 text-white">
          <span className="text-lg">Connect with us</span>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
            Gallery
          </button>
        </footer>
      </div>
    </div>
  );
}
