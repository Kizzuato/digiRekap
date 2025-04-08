"use client";

import { useEffect, useState } from "react";
import { CloseLineIcon } from "@/icons/index";

export default function BasicTableOne() {
  const [data, setData] = useState<string[][]>([]);
  const [filteredData, setFilteredData] = useState<string[][]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data.slice(1); // Skip header

    if (searchQuery) {
      filtered = filtered.filter((row) =>
        row[2].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((row) => {
        const date = new Date(row[1]); // Asumsi kolom ke-2 adalah tanggal
        return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, dateRange, data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sheets");
      const result = await res.json();
      setData(result || []);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateRange({ start: "", end: "" });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-4 justify-end">
        {/* Uncomment ini kalau kamu butuh filter berdasarkan search */}
        {/* <input
          type="text"
          placeholder="Cari nominal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        /> */}
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleDateChange}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleDateChange}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        {(searchQuery || dateRange.start || dateRange.end) && (
          <button onClick={clearFilters} className="dark:text-white">
            <CloseLineIcon />
          </button>
        )}
      </div>

      {loading ? (
  <div className="text-center py-10 text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
    Loading data...
  </div>
) : filteredData.length === 0 ? (
  <div className="text-center py-10 text-gray-600 dark:text-gray-300">
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-blue-500 dark:border-blue-700 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-blue-300 dark:bg-blue-900 text-gray-900 dark:text-white">
            {data[0]?.map((header, i) => (
              <th key={i} className="p-3 text-left font-semibold border-blue-500 dark:border-blue-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
  <tr>
    <td
      colSpan={data[0]?.length || 1}
      className="text-center py-10 text-gray-600 dark:text-gray-300"
    >
      Data kosong...
    </td>
  </tr>
</tbody>

      </table>
    </div>
  </div>
) : (
  <>
    {/* Tabel Data */}
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-blue-500 dark:border-blue-700 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-blue-300 dark:bg-blue-900 text-gray-900 dark:text-white">
            {data[0]?.map((header, i) => (
              <th key={i} className="p-3 text-left font-semibold border-blue-500 dark:border-blue-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
              {row.map((cell, i) => (
                <td key={i} className="p-3 text-left border-blue-500 dark:border-blue-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Prev
      </button>
      <span className="text-gray-900 dark:text-white">
        Halaman {currentPage} dari {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Next
      </button>
    </div>
  </>
)}

    </div>
  );
}
