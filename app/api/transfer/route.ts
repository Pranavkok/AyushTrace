import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Unauthorized. Please login." }, { status: 401 });
  }

  const body = (await req.json()) as {
    herbAddress?: string;
    sendTo?: string;
    extraInfo?: Array<{ title: string; data: string }>;
  };

  if (!body.herbAddress || !body.sendTo) {
    return NextResponse.json(
      { ok: false, message: "Herb address and send-to address are required." },
      { status: 400 }
    );
  }

  const created = await prisma.transferRecord.create({
    data: {
      herbAddress: body.herbAddress,
      sendTo: body.sendTo,
      extraInfo: {
        create:
          body.extraInfo
            ?.filter((item) => item.title.trim() && item.data.trim())
            .map((item) => ({
              title: item.title,
              data: item.data,
            })) ?? [],
      },
    },
    include: { extraInfo: true },
  });

  return NextResponse.json({ ok: true, record: created });
}
