import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };

  if (!body.name || !body.email || !body.password || !body.role) {
    return NextResponse.json({ ok: false, message: "All fields are required." }, { status: 400 });
  }

  if (body.password.length < 8) {
    return NextResponse.json({ ok: false, message: "Password must be at least 8 characters." }, { status: 400 });
  }

  const normalizedEmail = body.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ ok: false, message: "Email already registered." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name.trim(),
      email: normalizedEmail,
      role: body.role,
      passwordHash: hashPassword(body.password),
    },
  });

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
