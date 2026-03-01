"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Registration failed");
      setIsLoading(false);
      return;
    }

    setMessage("Account created. Redirecting to dashboard...");
    const roleRouteMap: Record<string, string> = {
      farmer: "/farmer",
      labTester: "/labTester",
      trader: "/trader",
      manufacturer: "/manufacturer",
    };
    router.push(roleRouteMap[form.role] ?? "/");
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-green-900">Create Account</h1>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full border rounded-lg p-2" required />
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded-lg p-2" required />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 8 chars)" className="w-full border rounded-lg p-2" minLength={8} required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border rounded-lg p-2">
          <option value="farmer">Farmer</option>
          <option value="labTester">Lab Tester</option>
          <option value="trader">Trader</option>
          <option value="manufacturer">Manufacturer</option>
        </select>
        <button type="submit" disabled={isLoading} className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 disabled:opacity-60">
          {isLoading ? "Creating..." : "Create account"}
        </button>
        {message && <p className="text-sm text-green-900">{message}</p>}
        <p className="text-sm text-gray-600">
          Already have account? <Link href="/auth/login" className="text-green-700 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
