"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

type TransferRecord = { id: string; herbAddress: string; sendTo: string; createdAt: string };

export default function TraderPage() {
  const { user, loading, logout } = useAuth("trader");
  const [searchId, setSearchId] = useState("");
  const [recentTransfers, setRecentTransfers] = useState<TransferRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    fetch("/api/transfer")
      .then((r) => r.json())
      .then((data: { ok: boolean; records?: TransferRecord[] }) => {
        if (data.ok && data.records) setRecentTransfers(data.records.slice(0, 5));
      })
      .catch(() => {});
  }, [user]);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    router.push(`/farmer/herbdata?address=${searchId.trim()}`);
  };

  if (loading) {
    return <div className="min-h-screen bg-green-100 flex items-center justify-center text-green-900">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-green-900 text-white px-4 md:px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">T</div>
          <div>
            <h2 className="font-semibold text-sm sm:text-base">{user?.name}</h2>
            <p className="text-xs sm:text-sm text-green-200">{user?.email}</p>
          </div>
        </div>

        <div className="flex w-full md:flex-1 max-w-md mx-auto md:mx-6">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Paste herb ID to search"
            className="flex-1 px-3 py-2 text-sm sm:text-base rounded-l-lg text-gray-800 focus:ring-2 focus:ring-green-800 outline-none"
          />
          <button onClick={handleSearch} className="bg-green-600 text-white px-4 sm:px-6 rounded-r-lg hover:bg-green-700 text-sm sm:text-base">
            Search
          </button>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="bg-green-700 px-3 sm:px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            Role: <span className="font-bold text-green-300">Trader</span>
          </div>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            Logout
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 gap-6 p-4 sm:p-6">
        <aside className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4">Recent Transactions</h3>
          {recentTransfers.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet.</p>
          ) : (
            <ul className="space-y-2 text-sm text-gray-700">
              {recentTransfers.map((t) => (
                <li key={t.id} className="p-2 rounded-lg bg-green-50">
                  <span className="font-mono text-xs text-gray-500 block truncate">{t.herbAddress}</span>
                  <span className="text-xs text-gray-400">To: {t.sendTo} • {new Date(t.createdAt).toLocaleDateString("en-IN")}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-green-900">Current Herb Prices</h3>
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="text-green-900 border-b">
                  <th className="py-2 px-3">Herb</th>
                  <th className="py-2 px-3">Price (per kg)</th>
                  <th className="py-2 px-3">Change</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b"><td className="py-2 px-3">Tulsi</td><td className="py-2 px-3">₹450</td><td className="py-2 px-3 text-green-600">+2.3%</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Ashwagandha</td><td className="py-2 px-3">₹720</td><td className="py-2 px-3 text-red-600">-1.1%</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Neem</td><td className="py-2 px-3">₹380</td><td className="py-2 px-3 text-green-600">+0.8%</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Aloe Vera</td><td className="py-2 px-3">₹250</td><td className="py-2 px-3 text-green-600">+1.4%</td></tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/farmer/track" className="flex-1 py-2 sm:py-3 flex items-center justify-center bg-green-700 text-white rounded-lg shadow hover:bg-green-600 text-sm sm:text-base">
              Track Herb
            </Link>
            <Link href="/add-data" className="flex-1 py-2 sm:py-3 flex items-center justify-center bg-green-700 text-white rounded-lg shadow hover:bg-green-600 text-sm sm:text-base">
              Add Data
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
