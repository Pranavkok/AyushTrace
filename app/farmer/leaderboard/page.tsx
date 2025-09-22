'use client';
import React, { useState } from "react";
import Link from "next/link";

const leaderboardData = [
  { id: 1, name: "Annapurna Agro", location: "Pune", score: 97 },
  { id: 2, name: "Siddhi Farms", location: "Nashik", score: 92 },
  { id: 3, name: "Kisan Herbals", location: "Satara", score: 88 },
  { id: 4, name: "GreenRoots", location: "Nagpur", score: 83 },
  { id: 5, name: "Herbal Bloom", location: "Kolhapur", score: 79 },
  { id: 6, name: "Organic Valley", location: "Nashik", score: 76 },
  { id: 7, name: "Nature's Best", location: "Mumbai", score: 74 },
  { id: 8, name: "Ayur Farms", location: "Aurangabad", score: 72 },
  { id: 9, name: "Green Harvest", location: "Solapur", score: 69 },
  { id: 10, name: "Tulsi Gardens", location: "Sangli", score: 67 },
  { id: 11, name: "Sacred Grove", location: "Thane", score: 64 },
  { id: 12, name: "Herbal Haven", location: "Akola", score: 62 },
  { id: 13, name: "Botanical Bliss", location: "Latur", score: 59 },
  { id: 14, name: "Pure Earth", location: "Dhule", score: 57 },
  { id: 15, name: "Medicinal Meadows", location: "Jalgaon", score: 55 },
  { id: 16, name: "Green Sanctuary", location: "Beed", score: 52 },
  { id: 17, name: "Nature's Touch", location: "Osmanabad", score: 50 },
  { id: 18, name: "Herbal Heights", location: "Nanded", score: 48 },
  { id: 19, name: "Organic Oasis", location: "Washim", score: 45 },
  { id: 20, name: "Green Gold", location: "Yavatmal", score: 43 },
  { id: 21, name: "Ayurveda Acres", location: "Wardha", score: 41 },
  { id: 22, name: "Healing Herbs", location: "Buldhana", score: 39 },
  { id: 23, name: "Botanical Bay", location: "Amravati", score: 36 },
  { id: 24, name: "Natural Nurture", location: "Hingoli", score: 34 },
  { id: 25, name: "Green Guardian", location: "Parbhani", score: 32 },
  { id: 26, name: "Herb House", location: "Jalna", score: 29 }
];

const rewards = [
  { position: 1, tokens: 100, wallet: "0x1A2B..." },
  { position: 2, tokens: 50, wallet: "0x3C4D..." },
  { position: 3, tokens: 30, wallet: "0x5E6F..." },
  { position: 4, tokens: 10, wallet: "0x7G8H..." }
];

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
  
  const currentData = leaderboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getRankIcon = (rank: number): string | null => {
    switch(rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

  const getGlobalRank = (index: number): number => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-green-900 text-center mb-8">Leaderboards</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Leaderboard */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-900">This Month Leaderboard</h2>
            <div className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <div className="space-y-3">
            {currentData.map((user, index) => {
              const globalRank = getGlobalRank(index);
              return (
                <div 
                  key={user.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                    globalRank <= 3 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'bg-white/80 border-green-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      globalRank <= 3 ? 'bg-yellow-200 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {getRankIcon(globalRank) || globalRank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">{user.name}</h3>
                      <p className="text-sm text-green-600">📍 {user.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-800">{user.score}</div>
                    <div className="text-xs text-green-600">points</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
              }`}
            >
              prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
              }`}
            >
              next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Winners Podium */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-green-900 mb-4 text-center">Winners!</h3>
            <div className="flex items-end justify-center gap-4 mb-4">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 mb-2">
                  2
                </div>
                <div className="text-xs text-green-600">92 pts</div>
              </div>
              
              {/* 1st Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold text-yellow-800 mb-2">
                  1
                </div>
                <div className="text-xs text-green-600">97 pts</div>
              </div>
              
              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-lg font-bold text-orange-800 mb-2">
                  3
                </div>
                <div className="text-xs text-green-600">88 pts</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-700">Live Rankings</span>
              </div>
            </div>
          </div>

          {/* Token Rewards */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-green-900 mb-4">Token Rewards</h3>
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.position} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold text-green-800">
                      {reward.position}
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">{reward.tokens} tokens</div>
                      <div className="text-xs text-green-600">{reward.wallet}</div>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
              <div className="text-sm font-medium text-green-800 mb-1">Next Reward Distribution</div>
              <div className="text-xs text-green-600">In 7 days, 14 hours</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-green-900 mb-4">Monthly Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Total Participants</span>
                <span className="font-bold text-green-900">{leaderboardData.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Average Score</span>
                <span className="font-bold text-green-900">
                  {Math.round(leaderboardData.reduce((sum, user) => sum + user.score, 0) / leaderboardData.length)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Top Score</span>
                <span className="font-bold text-green-900">{Math.max(...leaderboardData.map(u => u.score))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}