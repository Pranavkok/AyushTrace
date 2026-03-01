import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; password?: string };

  if (!body.email || !body.password) {
    return NextResponse.json({ ok: false, message: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email.trim().toLowerCase() },
  });

  if (!user || !verifyPassword(body.password, user.passwordHash)) {
    return NextResponse.json({ ok: false, message: "Invalid credentials." }, { status: 401 });
  }

  await createSession(user.id);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
