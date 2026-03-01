import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const records = await prisma.qrRecord.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, records });
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Unauthorized. Please login." }, { status: 401 });
  }

  const body = (await req.json()) as {
    batchId?: string;
    herbName?: string;
    contractAddress?: string;
    destination?: string;
  };

  if (!body.batchId || !body.herbName || !body.contractAddress || !body.destination) {
    return NextResponse.json(
      { ok: false, message: "All QR form fields are required." },
      { status: 400 }
    );
  }

  const qrPayload = JSON.stringify({
    batchId: body.batchId,
    herbName: body.herbName,
    contractAddress: body.contractAddress,
    destination: body.destination,
    generatedAt: new Date().toISOString(),
  });

  const created = await prisma.qrRecord.upsert({
    where: { batchId: body.batchId },
    update: {
      herbName: body.herbName,
      contractAddress: body.contractAddress,
      destination: body.destination,
      qrText: qrPayload,
    },
    create: {
      batchId: body.batchId,
      herbName: body.herbName,
      contractAddress: body.contractAddress,
      destination: body.destination,
      qrText: qrPayload,
    },
  });

  return NextResponse.json({ ok: true, record: created, qrPayload });
}
