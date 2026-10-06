"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { clearToken } from "@/lib/auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", enabled: true },
  { href: "/admin/leads", label: "Leads", enabled: true },
  { href: "/admin/customers", label: "Customers", enabled: false },
  { href: "/admin/products", label: "Products", enabled: true },
];

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ isMobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isMobileOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
  }, [isMobileOpen]);

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
  };

  const sidebarContent = (
    <>
      <div className="border-b border-charcoal-100 px-6 py-5">
        <span className="text-lg font-extrabold text-charcoal-950">
          Zyn<span className="text-gold-500">Aqua</span>
        </span>
        <p className="mt-0.5 text-xs text-charcoal-400">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          if (!item.enabled) {
            return (
              <span
                key={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-charcoal-400/50"
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-wide">Soon</span>
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
              "flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-charcoal-950 text-white" : "text-charcoal-700 hover:bg-charcoal-50"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-charcoal-100 p-3">
        <button
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-charcoal-700 hover:bg-charcoal-50"
        >
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop — unchanged from Day 9, always visible at md+ */}
      <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-charcoal-100 bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile — slide-in drawer, only rendered when open */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-label="Admin navigation">
          <div
            className="absolute inset-0 bg-charcoal-950/40"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-elevated" onKeyDown={(event) => { if (event.key === "Escape") onMobileClose(); }}>
            <div className="flex justify-end p-2">
              <button aria-label="Close menu" onClick={onMobileClose} className="p-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}