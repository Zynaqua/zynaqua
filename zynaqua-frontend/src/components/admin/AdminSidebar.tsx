"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", enabled: true },
  { href: "/admin/leads", label: "Leads", enabled: true },
  { href: "/admin/customers", label: "Customers", enabled: false },
  { href: "/admin/products", label: "Products", enabled: false },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
  };

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-charcoal-100 bg-white">
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
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-charcoal-950 text-white"
                  : "text-charcoal-700 hover:bg-charcoal-50"
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
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-charcoal-700 hover:bg-charcoal-50"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}