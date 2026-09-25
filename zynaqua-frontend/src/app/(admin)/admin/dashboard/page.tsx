"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, clearToken } from "@/lib/auth";
import { Button } from "@/components/ui";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
  };

  if (!checked) return null; // avoid flashing protected content pre-redirect

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1>Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
      </div>
      <p className="mt-4 text-charcoal-400">
        Real stats, recent enquiries, and navigation are built Day 9.
      </p>
    </div>
  );
}