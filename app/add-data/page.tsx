"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/useAuth";

type ExtraInfo = { title: string; data: string };
type TransferForm = { herbAddress: string; sendTo: string; extraInfo: ExtraInfo[] };

export default function AddDataPage() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState<TransferForm>({
    herbAddress: "",
    sendTo: "",
    extraInfo: [{ title: "", data: "" }],
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [recordId, setRecordId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: keyof ExtraInfo) => {
    const { name, value } = e.target;
    if (name === "extraInfo" && typeof index === "number" && field) {
      const updated = [...form.extraInfo];
      updated[index][field] = value;
      setForm({ ...form, extraInfo: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addRow = () => setForm({ ...form, extraInfo: [...form.extraInfo, { title: "", data: "" }] });
  const removeRow = (i: number) => setForm({ ...form, extraInfo: form.extraInfo.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setRecordId("");

    const response = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as { ok: boolean; message?: string; record?: { id: string } };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Failed to submit.");
      setIsSaving(false);
      return;
    }

    setMessage("Data recorded successfully!");
    setRecordId(data.record?.id ?? "");
    setForm({ herbAddress: "", sendTo: "", extraInfo: [{ title: "", data: "" }] });
    setIsSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-green-100 flex items-center justify-center text-green-900">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col">
      <header className="flex justify-between items-center px-8 py-4 bg-green-900/80 text-white shadow-md">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          <span className="font-medium">Back</span>
        </button>
        <span className="text-sm font-medium">{user?.name} ({user?.role})</span>
      </header>

      <main className="flex-1 flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-1">Add Herb Data</h2>
            <p className="text-sm text-gray-600">Record lab results, trader info, or manufacturer data for a herb. Paste the herb ID below.</p>
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1 text-sm">Herb ID</label>
            <input
              type="text"
              name="herbAddress"
              value={form.herbAddress}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg font-mono text-sm"
              placeholder="Paste the herb ID from the farmer dashboard"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1 text-sm">Sending to / Your ID</label>
            <input
              type="text"
              name="sendTo"
              value={form.sendTo}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="Recipient / your organisation name or ID"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-green-800 font-medium text-sm">Additional Info (key-value pairs)</label>
            {form.extraInfo.map((info, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <input
                  type="text"
                  name="extraInfo"
                  value={info.title}
                  onChange={(e) => handleChange(e, idx, "title")}
                  className="w-full p-2 border-2 border-green-400 rounded-lg"
                  placeholder="Label (e.g. Test Result)"
                />
                <input
                  type="text"
                  name="extraInfo"
                  value={info.data}
                  onChange={(e) => handleChange(e, idx, "data")}
                  className="w-full p-2 border-2 border-green-400 rounded-lg"
                  placeholder="Value (e.g. Passed)"
                />
                {form.extraInfo.length > 1 && (
                  <button type="button" onClick={() => removeRow(idx)} className="col-span-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm">
                    Remove row
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addRow} className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg text-sm">
              + Add Row
            </button>
          </div>

          <button type="submit" disabled={isSaving} className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-60">
            {isSaving ? "Saving..." : "Submit Data"}
          </button>

          {message && <p className="text-sm text-green-900 font-semibold">{message}</p>}
          {recordId && (
            <p className="text-xs text-gray-500 font-mono">Entry ID: {recordId}</p>
          )}
        </form>
      </main>
    </div>
  );
}
