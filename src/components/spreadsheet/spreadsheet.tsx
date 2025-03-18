"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string[][]>([]);
  const [newEntry, setNewEntry] = useState(["", "", "", ""]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/sheets");
    const result = await res.json();
    setData(result || []);
  };

  const handleAdd = async () => {
    await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: newEntry }),
    });
    setNewEntry(["", "", "", ""]);
    fetchData();
  };

  const handleUpdate = async (index: number) => {
    const updatedEntry = prompt("Masukkan data baru (pisah dengan koma)", data[index]?.join(","))?.split(",");
    if (!updatedEntry) return;

    await fetch("/api/sheets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowIndex: index, data: updatedEntry }),
    });
    fetchData();
  };

  const handleDelete = async (index: number) => {
    await fetch("/api/sheets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowIndex: index }),
    });
    fetchData();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rekap Data Keuangan</h1>

      {/* Form Tambah Data */}
      <div className="mb-4 flex gap-2">
        {newEntry.map((val, i) => (
          <input key={i} type="text" value={val} onChange={(e) => {
            const updated = [...newEntry];
            updated[i] = e.target.value;
            setNewEntry(updated);
          }} className="border p-2" placeholder={`Kolom ${i + 1}`} />
        ))}
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
      </div>

      {/* Tabel Data */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {data[0]?.map((header, i) => <th key={i} className="border p-2">{header}</th>)}
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="border">
              {row.map((cell, i) => <td key={i} className="border p-2">{cell}</td>)}
              <td className="border p-2">
                <button onClick={() => handleUpdate(rowIndex + 1)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(rowIndex + 1)} className="text-red-500">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
