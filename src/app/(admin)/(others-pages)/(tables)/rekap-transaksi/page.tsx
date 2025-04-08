import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "./BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rekap Keuangan",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables2() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tabel Rekap Data Keuangan" />
      <div className="space-y-6">
        <ComponentCard title="Data Keuangan">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
