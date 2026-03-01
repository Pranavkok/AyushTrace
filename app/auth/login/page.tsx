"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string; user?: { role: string } };

    if (!response.ok || !data.ok) {
      setMessage(data.message ?? "Login failed");
      setIsLoading(false);
      return;
    }

    setMessage("Login successful. Redirecting...");
    const roleRouteMap: Record<string, string> = {
      farmer: "/farmer",
      labTester: "/labTester",
      trader: "/trader",
      manufacturer: "/manufacturer",
    };
    router.push(roleRouteMap[data.user?.role ?? ""] ?? "/");
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-green-900">Login</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg p-2" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-lg p-2" required />
        <button type="submit" disabled={isLoading} className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 disabled:opacity-60">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {message && <p className="text-sm text-green-900">{message}</p>}
        <p className="text-sm text-gray-600">
          New user? <Link href="/auth/register" className="text-green-700 underline">Create account</Link>
        </p>
      </form>
    </div>
  );
}
