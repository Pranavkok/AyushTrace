import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const records = await prisma.publishRecord.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });
  return NextResponse.json({ ok: true, records });
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Unauthorized. Please login." }, { status: 401 });
  }

  const body = (await req.json()) as {
    name?: string;
    wallet?: string;
    amount?: string;
    quantity?: string;
    season?: string;
    fertilizers?: string;
    duration?: string;
    photoName?: string;
  };

  if (
    !body.name ||
    !body.wallet ||
    !body.amount ||
    !body.quantity ||
    !body.season ||
    !body.fertilizers ||
    !body.duration
  ) {
    return NextResponse.json(
      { ok: false, message: "All publish form fields are required." },
      { status: 400 }
    );
  }

  const amount = Number(body.amount);
  if (Number.isNaN(amount)) {
    return NextResponse.json(
      { ok: false, message: "Amount must be a valid number." },
      { status: 400 }
    );
  }

  const created = await prisma.publishRecord.create({
    data: {
      herbName: body.name,
      wallet: body.wallet,
      amount,
      quantity: body.quantity,
      season: body.season,
      fertilizers: body.fertilizers,
      duration: body.duration,
      photoName: body.photoName,
      userId: user.id,
    },
  });

  return NextResponse.json({ ok: true, record: created });
}
