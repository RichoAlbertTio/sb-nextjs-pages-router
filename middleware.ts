import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
  // Jika tidak ada token dan user mencoba mengakses halaman dashboard, redirect ke halaman login
  if (req.nextUrl.pathname.startsWith("/blog/")) {
    const newUrl = req.nextUrl.pathname.replace("/blog/", "/articles/");
    return NextResponse.rewrite(new URL(newUrl, req.url));
  }
  return NextResponse.next();
}


export const config = {
  // semua route yang ada di blog dan turunnya kena middleware ini
  matcher: "/blog/:path*",
  // ini untuk semua route
  // matcher: "/:path*",
};