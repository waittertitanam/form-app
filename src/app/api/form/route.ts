import { NextResponse } from "next/server";

// In-memory storage สำหรับเก็บข้อมูล form answers
// ใน production ควรใช้ database แทน
let formAnswers: Array<{
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  createdAt: string;
}> = [];

let nextId = 1;

/**
 * GET /api/form
 * ดึงรายการ survey
 */
export async function GET() {
  return NextResponse.json(formAnswers);
}

/**
 * POST /api/form
 * สร้าง form ใหม่
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, idNumber } = body;

    // Validate required fields
    if (!firstName || !lastName || !idNumber) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const newAnswer = {
      id: nextId++,
      firstName,
      lastName,
      idNumber,
      createdAt: new Date().toISOString(),
    };

    formAnswers.push(newAnswer);

    return NextResponse.json({
      message: "created",
      data: newAnswer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้าง form" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/form
 * แก้ไข form
 */
export async function PATCH(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    message: "updated",
    data: body,
  });
}

