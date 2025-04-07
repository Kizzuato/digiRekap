import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { fname, lname, email, password } = body;

  if (!fname || !lname || !email || !password) {
    return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
  }

  const nama = `${fname} ${lname}`;

  try {
    const auth = await getAuth();

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID!; // ambil dari env, pastikan ada

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'tabel_akun!A1:E20',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[nama, email, password]],
      },
    });

    return NextResponse.json({ message: 'Signup berhasil!' }, { status: 200 });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat signup' }, { status: 500 });
  }
}
