"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function useAuth(requiredRole?: string) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { ok: boolean; user?: AuthUser }) => {
        if (data.ok && data.user) {
          if (requiredRole && data.user.role !== requiredRole) {
            router.push("/auth/login");
          } else {
            setUser(data.user);
          }
        } else {
          router.push("/auth/login");
        }
      })
      .catch(() => router.push("/auth/login"))
      .finally(() => setLoading(false));
  }, [router, requiredRole]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return { user, loading, logout };
}
