import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Ambil token dari cookie

  // Jika user sudah login, redirect ke dashboard
  if (token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Jika user belum login, tetap di halaman awal
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang terkena middleware
export const config = {
  matcher: ['/', '/dashboard/:path*'], // Middleware berlaku untuk halaman utama dan dashboard
};
