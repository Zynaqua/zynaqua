"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Alert, ButtonLink } from "@/components/ui";
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
  const load = () => {
    setError(null);
    adminApi.get<DashboardStats>("/admin/dashboard/stats").then(setStats).catch((err) => setError(err.message ?? "Failed to load dashboard"));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminPage>
      <AdminPageHeader title="Admin Dashboard" description="A quick view of your enquiries and sales pipeline." actions={<ButtonLink href="/admin/leads">View all leads</ButtonLink>} />

      {error && (
        <div className="mt-4"><Alert variant="error" title="Unable to load dashboard">{error}<button className="ml-3 min-h-11 underline" onClick={load}>Retry</button></Alert></div>
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
    </AdminPage>
  );
}