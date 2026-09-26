"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/adminApi";
import { StatCard } from "@/components/admin/StatCard";
import { LeadTable, type LeadListItem } from "@/components/admin/LeadTable";
import { Skeleton } from "@/components/ui";

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contacted: number;
  demoScheduled: number;
  demoCompleted: number;
  converted: number;
  recentEnquiries: LeadListItem[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<DashboardStats>("/admin/dashboard/stats")
      .then(setStats)
      .catch((err) => setError(err.message ?? "Failed to load dashboard"));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1>Admin Dashboard</h1>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {!stats && !error && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}

      {stats && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Total Leads" value={stats.totalLeads} />
            <StatCard label="New" value={stats.newLeads} accent="aqua" />
            <StatCard label="Contacted" value={stats.contacted} accent="gold" />
            <StatCard label="Demo Scheduled" value={stats.demoScheduled} accent="gold" />
            <StatCard label="Demo Completed" value={stats.demoCompleted} accent="gold" />
            <StatCard label="Converted" value={stats.converted} />
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2>Recent Enquiries</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-charcoal-950 underline">
              View All Leads
            </Link>
          </div>
          <div className="mt-4">
            <LeadTable leads={stats.recentEnquiries} />
          </div>
        </>
      )}
    </div>
  );
}