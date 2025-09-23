// app/labtester/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LabTesterPage() {
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
        {/* Lab Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
            L
          </div>
          <div>
            <h2 className="font-semibold text-sm sm:text-base">HerbLab Testing</h2>
            <p className="text-xs sm:text-sm text-green-200">
              Nashik • Certified Lab
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
            href="/labtester/transactions"
            className="mt-4 sm:mt-6 inline-block text-green-700 hover:underline text-sm sm:text-base"
          >
            Explore all →
          </Link>
        </aside>

        {/* Right Column */}
        <section className="flex-1 flex flex-col gap-6">
          {/* AI Powered Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
            <img
              src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_incoming&w=740&q=80"
              alt="AI Powered Analysis"
              className="w-full sm:w-1/3 rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-green-900">
                AI Powered Analysis
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Analyze herb samples with AI insights for quality, potency, and growth conditions. Predict yield and quality score using historical data.
              </p>
              <Link
                href="/labtester/ai-analysis"
                className="mt-2 py-2 px-4 w-max bg-green-600 hover:bg-green-700 text-white rounded-lg shadow text-sm sm:text-base"
              >
                View Analysis
              </Link>
            </div>
          </div>

          {/* Contamination Detection */}
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
            <img
              src="data:image/png;base64,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"
              alt="Contamination Detection"
              className="w-full sm:w-1/3 rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-green-900">
                Contamination Detection
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Detect harmful contaminants, pesticides, or impurities in herb samples. Each batch is analyzed for compliance with safety standards.
              </p>
              <Link
                href="/labtester/contamination"
                className="mt-2 py-2 px-4 w-max bg-green-600 hover:bg-green-700 text-white rounded-lg shadow text-sm sm:text-base"
              >
                View Detection
              </Link>
            </div>
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
              href="/labtester/publish"
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
