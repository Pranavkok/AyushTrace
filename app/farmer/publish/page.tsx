"use client";
import React, { useState } from "react";

export default function PublishHerb() {
  const [form, setForm] = useState({
    name: "",
    photos: null,
    wallet: "",
    amount: "",
    quantity: "",
    season: "",
    fertilizers: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // integrate with backend / blockchain later
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg">
          Connect Wallet
        </button>
      </header>

      {/* Form */}
      <main className="flex-1 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Publish Your Herb
          </h2>

          {/* Name */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Name of the Herb
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="e.g. Ashwagandha"
              required
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Photos of the Herb
            </label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              required
            />
            <small className="text-red-700">
              * If photos and name of herb don’t match, no further transactions
              are allowed.
            </small>
          </div>

          {/* Track Location */}
          <div>
            <button
              type="button"
              className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg"
            >
              Track Location of the Herb
            </button>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Send to Wallet Address
            </label>
            <input
              type="text"
              name="wallet"
              value={form.wallet}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="0x1234...abcd"
              required
            />
          </div>

          {/* Amount & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-medium mb-2">
                Amount (in ETH/Token)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-green-400 rounded-lg"
                placeholder="e.g. 2.5"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-medium mb-2">
                Quantity (kg/g)
              </label>
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full p-2 border-2 border-green-400 rounded-lg"
                placeholder="e.g. 10 kg"
                required
              />
            </div>
          </div>

          {/* Season */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Season
            </label>
            <input
              type="text"
              name="season"
              value={form.season}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="e.g. Summer"
              required
            />
          </div>

          {/* Fertilizers */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Fertilizers Used
            </label>
            <input
              type="text"
              name="fertilizers"
              value={form.fertilizers}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="e.g. Organic compost"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Duration it Takes to Grow Herb
            </label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="e.g. 3 months"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg"
          >
            Publish Herb
          </button>
        </form>
      </main>
    </div>
  );
}
