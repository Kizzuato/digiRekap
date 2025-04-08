import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token || token !== "valid_user_token") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID!;
  const range = "tabel_akun!A2:C20";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const user = rows?.[0]; // misal token valid_user_token cuma untuk user pertama

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      name: user[0],
      email: user[1],
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Failed to get user", { status: 500 });
  }
}
