import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("middleware nyala", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup");

  // Redirect ke dashboard kalau udah signin dan buka signin/signup
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Kalau belum signin dan mau akses /admin atau /dashboard → redirect ke /signin
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/rekap-keuangan") || pathname.startsWith("/rekap-transaksi"))) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard",
    "/rekap-keuangan",
    "/rekap-transaksi",
    "/{admin}/:path*", // kalau folder kamu pakai dynamic [admin]
  ],
};
