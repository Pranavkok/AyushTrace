"use client";

import React, { useState } from "react";

type PublishForm = {
  name: string;
  photos: File | null;
  wallet: string;
  amount: string;
  quantity: string;
  season: string;
  fertilizers: string;
  duration: string;
};

export default function PublishHerb() {
  const [form, setForm] = useState<PublishForm>({
    name: "",
    photos: null,
    wallet: "",
    amount: "",
    quantity: "",
    season: "",
    fertilizers: "",
    duration: "",
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    setForm({ ...form, [name]: files && files.length > 0 ? files[0] : value } as PublishForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        photoName: form.photos?.name ?? null,
      }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string; record?: { id: string } };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Failed to publish herb.");
      setIsSaving(false);
      return;
    }

    setMessage(`Published successfully. Record ID: ${data.record?.id}`);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col">
      <header className="flex justify-between items-center px-8 py-4 bg-green-900/80 text-white shadow-md">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
        >
          <span className="font-medium">Back</span>
        </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg">Connect Wallet</button>
      </header>

      <main className="flex-1 flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-green-900 mb-4">Publish Your Herb</h2>

          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Herb name" required />
          <input type="file" name="photos" accept="image/*" onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" required />
          <input type="text" name="wallet" value={form.wallet} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Wallet address" required />
          <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Amount" required />
          <input type="text" name="quantity" value={form.quantity} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Quantity" required />
          <input type="text" name="season" value={form.season} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Season" required />
          <input type="text" name="fertilizers" value={form.fertilizers} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Fertilizers" required />
          <input type="text" name="duration" value={form.duration} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Duration" required />

          <button type="submit" disabled={isSaving} className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-60">
            {isSaving ? "Publishing..." : "Publish"}
          </button>

          {message && <p className="text-sm text-green-900 font-semibold">{message}</p>}
        </form>
      </main>
    </div>
  );
}
