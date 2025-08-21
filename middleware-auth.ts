import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // Jika tidak ada token dan user mencoba mengakses halaman dashboard, redirect ke halaman login
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const res = NextResponse.next();
}


export const config = {
  // semua route yang ada di dashboard dan turunnya kena middleware ini
  matcher: "/dashboard/:path*",
  // ini untuk semua route
  // matcher: "/:path*",
};