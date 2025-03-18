"use client";

import { useEffect, useState } from "react";

export default function BasicTableOne() {
  const [data, setData] = useState<string[][]>([]);
  // const [newEntry, setNewEntry] = useState(["", "", "", ""]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/sheets");
    const result = await res.json();
    setData(result || []);
  };

  // const handleAdd = async () => {
  //   await fetch("/api/sheets", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data: newEntry }),
  //   });
  //   setNewEntry(["", "", "", ""]);
  //   fetchData();
  // };

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
      {/* <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2">Rekap Data Keuangan</h1> */}

      {/* Form Tambah Data */}
      {/* <div className="mb-4 flex flex-wrap gap-2">
        {newEntry.map((val, i) => (
          <input
            key={i}
            type="text"
            value={val}
            onChange={(e) => {
              const updated = [...newEntry];
              updated[i] = e.target.value;
              setNewEntry(updated);
            }}
            className="border p-2 dark:bg-gray-800 dark:text-white rounded w-full sm:w-auto focus:border-blue-500"
            placeholder={`Kolom ${i + 1}`}
          />
        ))}
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Tambah</button>
      </div> */}

      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse  border-blue-500 dark:border-blue-700 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-blue-300 dark:bg-blue-900 text-gray-900 dark:text-white">
              {data[0]?.map((header, i) => (
                <th key={i} className=" p-3 text-left font-semibold border-blue-500 dark:border-blue-700">{header}</th>
              ))}
              <th className=" p-3 text-center font-semibold border-blue-500 dark:border-blue-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                {row.map((cell, i) => (
                  <td key={i} className=" p-3 text-left border-blue-500 dark:border-blue-700">{cell}</td>
                ))}
                <td className=" p-3 flex justify-center gap-2 border-blue-500 dark:border-blue-700">
                  <button onClick={() => handleUpdate(rowIndex + 1)} className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition">Edit</button>
                  <button onClick={() => handleDelete(rowIndex + 1)} className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}