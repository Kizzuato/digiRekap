'use client';
// import type { Metadata } from "next";
import React from "react";

import { useState } from 'react';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title:
//     "Landing Page",
//   description: "This is digiRekap landing page",
// };

export default function Ecommerce() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-6 bg-blue-600 text-white shadow-md z-50">
      <h1 className="text-2xl font-bold">Kelompok 3</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2">
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          Mulai Sekarang
        </Link>
        <Link
          href="/about-us"
          className="px-6 py-3 text-white font-semibold rounded-lg hover:underline"
        >
          Tentang kami
        </Link>
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-blue-600 flex flex-col items-center gap-4 py-4 md:hidden">
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/about-us"
            className="px-6 py-3 text-white font-semibold rounded-lg hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Tentang kami
          </Link>
        </div>
      )}
    </nav>
      
      {/* Hero Section */}
      <header className="text-center py-24 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl md:text-7xl font-bold">Kelola Keuangan Laundry dengan Mudah</h1>
        <p className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto font-light">
          Solusi modern yang dirancang untuk membantu pemilik laundry mencatat transaksi, mengelola laporan keuangan,
          dan menganalisis pertumbuhan bisnis dengan efisien.
        </p>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">Kenapa Memilih Kami?</h2>
        <p className="text-center text-lg mt-4 max-w-4xl mx-auto font-light">
          Aplikasi ini dirancang untuk mempermudah pengelolaan keuangan bisnis laundry Anda dengan fitur lengkap dan tampilan user-friendly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="p-8 rounded-xl shadow-lg text-center bg-white dark:bg-gray-800 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold">Pencatatan Otomatis</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Sistem kami mencatat setiap transaksi secara otomatis, memastikan keuangan Anda selalu up-to-date dan akurat.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg text-center bg-white dark:bg-gray-800 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold">Laporan Keuangan Lengkap</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Analisis laporan keuangan bisnis Anda dengan grafik interaktif yang mudah dipahami.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg text-center bg-white dark:bg-gray-800 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold">Kemudahan Tampilan Penggunaan</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Tampilan yang friendly memudahkan karyawan dan pemilik bisniws untuk mengelola bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 px-6 bg-blue-600 text-white rounded-xl mx-4 md:mx-0 shadow-lg">
        <h2 className="text-4xl font-bold">Mulai Kelola Keuangan Laundry Anda Hari Ini!</h2>
        <p className="mt-6 text-lg max-w-2xl mx-auto font-light">
          Jangan biarkan pencatatan keuangan yang rumit menghambat bisnis Anda. Dengan sistem otomatis dan laporan yang lengkap,
          Anda dapat fokus pada pengembangan bisnis tanpa khawatir.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 mt-12 text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800">
        <p>&copy; 2025 Kelompok 3. All rights reserved.</p>
      </footer>
    </div>
  );
}
