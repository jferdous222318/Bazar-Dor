import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    url.searchParams.set("reason", "protected"); // signin page shows a toast
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};