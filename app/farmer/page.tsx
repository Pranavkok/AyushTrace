// app/farmer/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FarmerPage() {
  const [contractAddress, setContractAddress] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!contractAddress) return;
    router.push(`/farmer/herbdata?address=${contractAddress}`);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-green-900 text-white px-4 md:px-6 py-4 shadow-md">
        
        {/* Farm Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
            Y
          </div>
          <div>
            <h2 className="font-semibold text-sm sm:text-base">Yashraj Farm</h2>
            <p className="text-xs sm:text-sm text-green-200">
              Nashik • 2 years farming
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="text-xs sm:text-sm text-green-200 text-center">
          ️🔍 Search herb contract address: <br />
          <p>Dummy address = 0xHerbAddress1</p>
          <p> to 0xHerbAddress5</p>
        </div>
        
        <div className="flex w-full md:flex-1 max-w-md mx-auto md:mx-6">
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Paste contract address here"
            className="flex-1 px-3 py-2 text-sm sm:text-base rounded-l-lg focus:ring-2 focus:ring-green-800 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 sm:px-6 rounded-r-lg hover:bg-green-700 text-sm sm:text-base"
          >
            Search
          </button>
        </div>

        {/* Wallet + Tokens */}
        <div className="flex gap-3 sm:gap-4">
          <div className="bg-green-700 px-3 sm:px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            <span className="font-bold text-green-300">Connect Wallet</span>
          </div>
          <div className="bg-green-700 px-3 sm:px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            Tokens: <span className="font-bold text-green-300">420</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row flex-1 gap-6 p-4 sm:p-6">
        
        {/* Left Column - Tutorials */}
        <aside className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">
            Tutorials & Guides
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer shadow-sm">
              🌱 Best practices for Tulsi farm <span className="text-xs sm:text-sm text-gray-500">5m</span>
            </div>
            <div className="p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer shadow-sm">
              🌿 How to increase herb quality <span className="text-xs sm:text-sm text-gray-500">9m</span>
            </div>
            <div className="p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer shadow-sm">
              🌾 Soil management for higher yield <span className="text-xs sm:text-sm text-gray-500">12m</span>
            </div>
            <div className="p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer shadow-sm">
              💰 How to earn more tokens <span className="text-xs sm:text-sm text-gray-500">10m</span>
            </div>
          </div>

          <Link
            href="/farmer/tutorial"
            className="mt-4 sm:mt-6 inline-block text-green-700 hover:underline text-sm sm:text-base"
          >
            Explore more →
          </Link>
        </aside>

        {/* Right Column */}
        <section className="flex-1 flex flex-col gap-6">
          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">
              <Link href="/farmer/leaderboard">
                Leaderboard - Top Authentic Suppliers (click here)
              </Link>
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex justify-between border-b py-2">
                <span>1. Annapurna Agro (Pune)</span> <span className="font-bold text-green-600">97</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>2. Siddhi Farms (Nashik)</span> <span className="font-bold text-green-600">92</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>3. Kisan Herbals (Satara)</span> <span className="font-bold text-green-600">88</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>4. GreenRoots (Nagpur)</span> <span className="font-bold text-green-600">83</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>5. Herbal Bloom (Kolhapur)</span> <span className="font-bold text-green-600">79</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>6. Organic Valley (Nashik)</span> <span className="font-bold text-green-600">76</span>
              </li>
            </ul>
          </div>

          {/* Farm Updates */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">
              Farm Updates
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li>🌿 Harvest season begins for Tulsi</li>
              <li>💧 New drip irrigation system installed for efficiency</li>
              <li>🤝 Partnering with Siddhi Labs for herb quality</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 py-2 sm:py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 text-sm sm:text-base">
              Track
            </button>
            <Link
              href="/farmer/publish"
              className="flex-1 py-2 sm:py-3 flex items-center justify-center bg-green-700 text-white rounded-lg shadow hover:bg-green-600 text-sm sm:text-base"
            >
              Publish
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
