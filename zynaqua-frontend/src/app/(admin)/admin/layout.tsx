"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

export default function AdminRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.includes(pathname ?? "");

  useEffect(() => {
    if (isPublicAdminRoute) {
      setChecked(true);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [pathname, isPublicAdminRoute, router]);

  if (isPublicAdminRoute) {
    // Login page renders full-bleed, no sidebar chrome.
    return <div className="min-h-screen bg-charcoal-50">{children}</div>;
  }

  if (!checked) return null; // avoid flashing protected content pre-redirect

  return (
    <div className="flex min-h-screen bg-charcoal-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}