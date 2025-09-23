// app/trader/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TraderPage() {
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
        {/* Trader Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
            T
          </div>
          <div>
            <h2 className="font-semibold text-sm sm:text-base">Herb Trading Desk</h2>
            <p className="text-xs sm:text-sm text-green-200">
              Real-time Market Prices
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
        
        {/* Left Column - Previous Transactions */}
        <aside className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">
            View Previous Transactions
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            <li>💼 0xHerbAddress1 - 05 Sep 2025</li>
            <li>💼 0xHerbAddress2 - 01 Sep 2025</li>
            <li>💼 0xHerbAddress3 - 28 Aug 2025</li>
            <li>💼 0xHerbAddress4 - 20 Aug 2025</li>
            <li>💼 0xHerbAddress5 - 15 Aug 2025</li>
          </ul>
          <Link
            href="/trader/transactions"
            className="mt-4 sm:mt-6 inline-block text-green-700 hover:underline text-sm sm:text-base"
          >
            Explore all →
          </Link>
        </aside>

        {/* Right Column - Current Prices */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-green-900">
              📈 Current Herb Prices
            </h3>
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="text-green-900 border-b">
                  <th className="py-2 px-3">Herb</th>
                  <th className="py-2 px-3">Price (per kg)</th>
                  <th className="py-2 px-3">Change</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-2 px-3">Tulsi</td>
                  <td className="py-2 px-3">₹450</td>
                  <td className="py-2 px-3 text-green-600">+2.3%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Ashwagandha</td>
                  <td className="py-2 px-3">₹720</td>
                  <td className="py-2 px-3 text-red-600">-1.1%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Neem</td>
                  <td className="py-2 px-3">₹380</td>
                  <td className="py-2 px-3 text-green-600">+0.8%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Aloe Vera</td>
                  <td className="py-2 px-3">₹250</td>
                  <td className="py-2 px-3 text-green-600">+1.4%</td>
                </tr>
              </tbody>
            </table>
            <Link
              href="/trader/prices"
              className="text-green-700 hover:underline text-sm sm:text-base"
            >
              Explore more →
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/farmer/track"
              className="flex-1 py-2 sm:py-3 flex items-center justify-center bg-green-700 text-white rounded-lg shadow hover:bg-green-600 text-sm sm:text-base"
            >
              Track
            </Link>
            <Link
              href="/add-data"
              className="flex-1 py-2 sm:py-3 flex items-center justify-center bg-green-700 text-white rounded-lg shadow hover:bg-green-600 text-sm sm:text-base"
            >
              Add Data
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
