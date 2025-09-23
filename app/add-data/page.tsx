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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Transfer Form Submitted:", form);
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
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
            Transfer Herb
          </h2>

          {/* Herb Address */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Herb Address
            </label>
            <input
              type="text"
              name="herbAddress"
              value={form.herbAddress}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="0xHerbAddress..."
              required
            />
          </div>

          {/* Send To Address */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Send To Address
            </label>
            <input
              type="text"
              name="sendTo"
              value={form.sendTo}
              onChange={handleChange}
              className="w-full p-2 border-2 border-green-400 rounded-lg"
              placeholder="0xRecipientAddress..."
              required
            />
          </div>

          {/* Extra Info (Title + Data pairs) */}
          <div>
            <label className="block text-green-800 font-medium mb-2">
              Extra Info
            </label>
            {form.extraInfo.map((info, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 items-center"
              >
                <input
                  type="text"
                  name="extraInfo"
                  value={info.title}
                  onChange={(e) => handleChange(e, idx, "title")}
                  className="w-full p-2 border-2 border-green-400 rounded-lg"
                  placeholder="Title (e.g. Harvest Date)"
                />
                <input
                  type="text"
                  name="extraInfo"
                  value={info.data}
                  onChange={(e) => handleChange(e, idx, "data")}
                  className="w-full p-2 border-2 border-green-400 rounded-lg"
                  placeholder="Data (e.g. March 2025)"
                />
                {form.extraInfo.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExtraInfo(idx)}
                    className="col-span-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg mt-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addExtraInfo}
              className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded-lg mt-2"
            >
              + Add More Info
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg"
          >
            Submit Transfer
          </button>
        </form>
      </main>
    </div>
  );
}
