import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  const isLoginPage =
    pathname === "/login";

  const hasSession =
    request.cookies
      .getAll()
      .some((cookie) =>
        cookie.name.startsWith("sb-")
      );

  // Not logged in → send to login
  if (
    !hasSession &&
    !isLoginPage &&
    !pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  // Already logged in → don't show login page
  if (
    hasSession &&
    isLoginPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
  ],
};