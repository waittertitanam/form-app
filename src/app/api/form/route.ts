import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/form
 */
export async function GET() {
  const forms = await db.form.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(forms);
}

/**
 * POST /api/form
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, idNumber } = body;

    if (!firstName || !lastName || !idNumber) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    const data = await db.form.create({
      data: {
        firstName,
        lastName,
        idNumber,
      },
    });

    return NextResponse.json({ message: "created", data });
  } catch (err) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
