import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "문의가 접수되었습니다." });
}
