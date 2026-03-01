"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import QRCode from "qrcode";

export default function GenerateQrPage() {
  const { user, loading } = useAuth("manufacturer");
  const [form, setForm] = useState({
    batchId: "",
    herbName: "",
    contractAddress: "",
    destination: "",
  });
  const [message, setMessage] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrText, setQrText] = useState("");
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!qrText) return;
    QRCode.toDataURL(qrText, { width: 256, margin: 2 })
      .then((url) => setQrDataUrl(url))
      .catch(console.error);
  }, [qrText]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setQrDataUrl("");

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

    setSaving(false);

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Failed to generate QR.");
      return;
    }

    setMessage(`QR saved. Record ID: ${data.record?.id}`);
    setQrText(data.qrPayload ?? "");
  };

  if (loading) {
    return <div className="min-h-screen bg-green-100 flex items-center justify-center text-green-900">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/manufacturer" className="text-green-800 hover:underline text-sm">← Back to Dashboard</Link>
          <span className="text-sm text-green-700 font-medium">{user?.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold text-green-900">Generate QR Code</h1>
          <p className="text-sm text-gray-600">
            Enter the herb batch details. Use the <b>Herb ID</b> (from the published herb) as the Contract Address.
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Batch ID (e.g. BATCH-001)"
              value={form.batchId}
              onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Herb Name"
              value={form.herbName}
              onChange={(e) => setForm({ ...form, herbName: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded-lg font-mono text-sm"
              placeholder="Herb ID (PublishRecord ID)"
              value={form.contractAddress}
              onChange={(e) => setForm({ ...form, contractAddress: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Destination (city / distributor)"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              required
            />
            <button
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-60 font-semibold"
              type="submit"
              disabled={saving}
            >
              {saving ? "Generating..." : "Generate QR Code"}
            </button>
          </form>

          {message && <p className="text-green-800 font-semibold text-sm">{message}</p>}
        </div>

        {qrDataUrl && (
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-green-900">Your QR Code</h2>
            <img src={qrDataUrl} alt="QR Code" className="w-64 h-64 border-4 border-green-200 rounded-lg" />
            <a
              href={qrDataUrl}
              download={`qr-${form.batchId}.png`}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-medium"
            >
              Download QR Code
            </a>
            <details className="w-full">
              <summary className="text-xs text-gray-500 cursor-pointer">View raw payload</summary>
              <pre className="text-xs bg-green-50 p-3 rounded overflow-x-auto mt-2">{qrText}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
