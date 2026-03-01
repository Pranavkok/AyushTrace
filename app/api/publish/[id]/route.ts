import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const record = await prisma.publishRecord.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!record) {
    return NextResponse.json({ ok: false, message: "Herb not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, record });
}
