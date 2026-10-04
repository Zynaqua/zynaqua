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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (isPublicAdminRoute) {
    return <div className="min-h-screen bg-charcoal-50">{children}</div>;
  }

  if (!checked) return null;

  return (
    <div className="flex min-h-screen bg-charcoal-50">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Mobile-only top bar — invisible at md+ where the sidebar is
            always visible and this control would be redundant. */}
        <div className="flex items-center justify-between border-b border-charcoal-100 bg-white px-4 py-3 md:hidden">
          <span className="text-base font-extrabold text-charcoal-950">
            Zyn<span className="text-gold-500">Aqua</span>
          </span>
          <button
            aria-label="Open menu"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}