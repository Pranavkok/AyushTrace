"use client";

import React, { useState } from "react";

type ExtraInfo = {
  title: string;
  data: string;
};

type TransferForm = {
  herbAddress: string;
  sendTo: string;
  extraInfo: ExtraInfo[];
};

export default function TransferHerb() {
  const [form, setForm] = useState<TransferForm>({
    herbAddress: "",
    sendTo: "",
    extraInfo: [{ title: "", data: "" }],
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: keyof ExtraInfo
  ) => {
    const { name, value } = e.target;

    if (name === "extraInfo" && typeof index === "number" && field) {
      const updatedExtraInfo = [...form.extraInfo];
      updatedExtraInfo[index][field] = value;
      setForm({ ...form, extraInfo: updatedExtraInfo });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addExtraInfo = () => {
    setForm({ ...form, extraInfo: [...form.extraInfo, { title: "", data: "" }] });
  };

  const removeExtraInfo = (index: number) => {
    const updatedExtraInfo = form.extraInfo.filter((_, i) => i !== index);
    setForm({ ...form, extraInfo: updatedExtraInfo });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as { ok: boolean; message?: string; record?: { id: string } };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Failed to submit transfer form.");
      setIsSaving(false);
      return;
    }

    setMessage(`Transfer stored successfully. Record ID: ${data.record?.id}`);
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
      </header>

      <main className="flex-1 flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-green-900 mb-4">Transfer Herb</h2>

          <input type="text" name="herbAddress" value={form.herbAddress} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Herb address" required />
          <input type="text" name="sendTo" value={form.sendTo} onChange={handleChange} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Send-to address" required />

          {form.extraInfo.map((info, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <input type="text" name="extraInfo" value={info.title} onChange={(e) => handleChange(e, idx, "title")} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Title" />
              <input type="text" name="extraInfo" value={info.data} onChange={(e) => handleChange(e, idx, "data")} className="w-full p-2 border-2 border-green-400 rounded-lg" placeholder="Data" />
              {form.extraInfo.length > 1 && (
                <button type="button" onClick={() => removeExtraInfo(idx)} className="col-span-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">Remove</button>
              )}
            </div>
          ))}

          <button type="button" onClick={addExtraInfo} className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded-lg">+ Add More Info</button>

          <button type="submit" disabled={isSaving} className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-60">
            {isSaving ? "Saving..." : "Submit Transfer"}
          </button>

          {message && <p className="text-sm text-green-900 font-semibold">{message}</p>}
        </form>
      </main>
    </div>
  );
}
