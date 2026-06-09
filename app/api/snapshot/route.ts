import { NextResponse } from "next/server";

import { saveSnapshot }
from "@/app/actions/portfolio";

export async function GET() {
  await saveSnapshot();

  return NextResponse.json({
    success: true,
  });
}