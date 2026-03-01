import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "ayutrace_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, oldHash] = stored.split(":");
  if (!salt || !oldHash) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(oldHash, "hex"), Buffer.from(hash, "hex"));
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    cookieStore.delete(SESSION_COOKIE);
    if (session) {
      await prisma.session.deleteMany({ where: { token } });
    }
    return null;
  }

  return session.user;
}
