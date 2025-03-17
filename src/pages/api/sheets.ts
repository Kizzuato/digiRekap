// src/pages/api/sheets.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSheetData } from "@/_lib/readSheet"; // Pindahkan fungsi ke lib

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getSheetData();
    return res.status(200).json(data || []);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
