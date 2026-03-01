"use client";

import { useState } from "react";

export default function GenerateQrPage() {
  const [form, setForm] = useState({
    batchId: "",
    herbName: "",
    contractAddress: "",
    destination: "",
  });
  const [message, setMessage] = useState("");
  const [qrText, setQrText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const response = await fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message?: string;
      record?: { id: string };
      qrPayload?: string;
    };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Failed to generate QR payload.");
      setQrText("");
      return;
    }

    setMessage(`QR data saved. Record ID: ${data.record?.id}`);
    setQrText(data.qrPayload ?? "");
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-green-900">Generate QR Data</h1>
        <p className="text-sm text-gray-600">This creates and stores a QR payload in database. You can plug this payload into any QR renderer.</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Batch ID" value={form.batchId} onChange={(e) => setForm({ ...form, batchId: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Herb Name" value={form.herbName} onChange={(e) => setForm({ ...form, herbName: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Contract Address" value={form.contractAddress} onChange={(e) => setForm({ ...form, contractAddress: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
          <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600" type="submit">Create QR Payload</button>
        </form>

        {message && <p className="text-green-800 font-semibold">{message}</p>}
        {qrText && <pre className="text-xs bg-green-50 p-3 rounded overflow-x-auto">{qrText}</pre>}
      </div>
    </div>
  );
}
