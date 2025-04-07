import { google } from "googleapis";
import { NextResponse } from "next/server";
// import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const CREDENTIALS_PATH = path.join(process.cwd(), "secreets.json");
const spreadsheetId = process.env.SHEET_ID;
const range = "tabel_keuangan!A1:E20";

async function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
  }
  
  // **GET: Ambil Data dari Google Sheets**
  export async function GET() {
    try {
      const auth = await getAuth();
      const sheets = google.sheets({ version: "v4", auth });
  
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      return NextResponse.json(response.data.values);
    } catch (error) {
      console.error("Error GET data:", error);
      return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
    }
  }
  
  // **POST: Tambah Data ke Google Sheets**
  export async function POST(req: Request) {
    try {
      const { data } = await req.json();
      if (!data || !Array.isArray(data)) {
        return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
      }
  
      const auth = await getAuth();
      const sheets = google.sheets({ version: "v4", auth });
  
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [data] },
      });
  
      return NextResponse.json({ message: "Data berhasil ditambahkan" });
    } catch (error) {
      console.error("Error POST data:", error);
      return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
    }
  }
  
  // **PUT: Update Data di Google Sheets**
  export async function PUT(req: Request) {
    try {
      const { rowIndex, data } = await req.json();
      if (rowIndex === undefined || !data || !Array.isArray(data)) {
        return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
      }
  
      const auth = await getAuth();
      const sheets = google.sheets({ version: "v4", auth });
  
      const rangeToUpdate = `Sheet1!A${rowIndex + 1}:D${rowIndex + 1}`;
  
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: rangeToUpdate,
        valueInputOption: "RAW",
        requestBody: { values: [data] },
      });
  
      return NextResponse.json({ message: "Data berhasil diperbarui" });
    } catch (error) {
      console.error("Error PUT data:", error);
      return NextResponse.json({ error: "Gagal memperbarui data" }, { status: 500 });
    }
  }
  
  // **DELETE: Hapus Data dari Google Sheets**
  export async function DELETE(req: Request) {
    try {
      const { rowIndex } = await req.json();
      if (rowIndex === undefined) {
        return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
      }
  
      const auth = await getAuth();
      const sheets = google.sheets({ version: "v4", auth });
  
      const emptyRow = ["", "", "", ""];
      const rangeToClear = `Sheet1!A${rowIndex + 1}:D${rowIndex + 1}`;
  
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: rangeToClear,
        valueInputOption: "RAW",
        requestBody: { values: [emptyRow] },
      });
  
      return NextResponse.json({ message: "Data berhasil dihapus" });
    } catch (error) {
      console.error("Error DELETE data:", error);
      return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
    }
  }