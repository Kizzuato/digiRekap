import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout success' });
  response.cookies.delete('token'); // Atau nama cookie yang kamu pakai
  return response;
}
