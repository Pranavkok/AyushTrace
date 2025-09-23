"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function TrackPage() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleTrack = () => {
    if (!address) return;
    router.push(`/trackherb?address=${encodeURIComponent(address)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="mb-6">
        <Link
          href="/farmer"
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium text-sm sm:text-base">Back</span>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-6">
          Track Herb
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter contract address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleTrack}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow text-sm sm:text-base"
          >
            Track
          </button>
        </div>

        {/* Testing note */}
        <p className="mt-4 text-xs text-gray-500">
          For testing, you can use dummy herb contract addresses: <br />
          0xHerbAddress1, 0xHerbAddress2, 0xHerbAddress3, 0xHerbAddress4, 0xHerbAddress5
        </p>
      </div>
    </div>
  );
}
