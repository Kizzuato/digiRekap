import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import Link from "next/link";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "Landing Page",
  description: "This is digiRekap landing page",
};

export default function Ecommerce() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-blue-600 text-white shadow-md z-50">
        <h1 className="text-2xl font-bold">Kelompok 3</h1>
        <div>
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-all">
            Mulai Sekarang
          </Link>
        </div>
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
            <h3 className="text-2xl font-semibold">Keamanan Data Terjamin</h3>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Data Anda aman dengan teknologi enkripsi tingkat tinggi untuk melindungi informasi bisnis Anda.
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
