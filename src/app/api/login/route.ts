import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

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

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret"; // simpan ini di .env

export async function GET() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;
  const range = "tabel_akun!B2:C20";

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

export async function POST(req: Request) {
  const { email, password, isChecked } = await req.json();
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;
  const range = "tabel_akun!B2:C20";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return new NextResponse("No accounts found", { status: 401 });
    }

    const user = rows.find(([rowEmail, rowPassword]) => {
      return rowEmail === email && rowPassword === password;
    });

    if (!user) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    // Simpan token ke cookie
    const responseLogin = NextResponse.json({ message: "Login success", token });

    if (isChecked) {
      responseLogin.cookies.set("token", "valid_user_token", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        path: "/",
      });
    } else {
      responseLogin.cookies.set("token", "valid_user_token", {
        httpOnly: true,
        path: "/", // TANPA maxAge = session cookie
      });
    }

    return responseLogin;
  } catch (error) {
    console.error("Error during login:", error);
    return new NextResponse("Login failed", { status: 500 });
  }
}
