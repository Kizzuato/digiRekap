import { NextResponse } from "next/server";
import { google } from "googleapis";

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

export async function GET() {
    const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;
  const range = "tabel_akun!B2:C20"; // Pastikan sheet 'akun' ada dan data di kolom A & B

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ accounts: [] });
    }

    const accounts = rows.map(([email, password]) => ({
      email,
      password,
    }));

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("Error fetching data from spreadsheet:", error);
    return new NextResponse("Failed to fetch accounts", { status: 500 });
  }
}
