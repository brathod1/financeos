import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const code =
    searchParams.get("code");

  if (code) {
    const supabase =
      await createClient();

    if (!code) {
  throw new Error("No code returned");
}

await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(
    new URL("/", request.url)
  );
}