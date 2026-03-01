"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackHerbPage() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    router.push(`/trackherb?address=${encodeURIComponent(address)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-green-900/80 text-white shadow-md">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
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
          <span className="font-medium">Back</span>
        </button>
        <span className="text-sm text-green-200">AyuTrace</span>
      </header>

      {/* Main Form */}
      <main className="flex-1 flex justify-center items-center p-8">
        <form
          onSubmit={handleTrack}
          className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-4 text-center">
            Track Herb
          </h2>

          {/* Address Input */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Herb ID
            </label>
            <input
              type="text"
              placeholder="Paste the herb ID here..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg"
          >
            Track Herb
          </button>

          <p className="mt-4 text-xs text-gray-600">
            The herb ID is displayed after a farmer publishes a herb. Copy it from the farmer dashboard.
          </p>
        </form>
      </main>
    </div>
  );
}
