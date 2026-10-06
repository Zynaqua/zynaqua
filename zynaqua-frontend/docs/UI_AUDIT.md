# ZynAqua UI Audit

Audit date: 2026-10-04. Scope: source inspection only. No source file was modified.

## 1. STACK

- Framework/version: Next.js `16.3.6` ([package.json](../package.json)); App Router under `src/app/`.
- Router: Next.js App Router, including route groups `(public)` and `(admin)` and asynchronous dynamic `params` ([src/app/(public)/products/[slug]/page.tsx](../src/app/(public)/products/[slug]/page.tsx), [src/app/(admin)/admin/products/[id]/edit/page.tsx](../src/app/(admin)/admin/products/[id]/edit/page.tsx)).
- React: `19.2.8`; React DOM: `19.2.8`.
- Language: TypeScript (`.ts`/`.tsx` and `tsconfig.json`).
- Styling: Tailwind CSS `^3.4.17`, PostCSS, global CSS in `src/app/globals.css`; no CSS modules found. `tailwind-merge` and `clsx` are used through `cn()`.
- UI libraries: no shadcn/ui, Radix, Headless UI, or other component library found. Local primitives are in `src/components/ui/`.
- Icons: `lucide-react` for the Why ZynAqua cards; inline SVGs elsewhere.
- Animation: no animation library. Tailwind transitions, `animate-pulse`, CSS smooth scrolling, and a timer-driven carousel are used.
- Forms/validation: `react-hook-form` and `@hookform/resolvers` + Zod for the public demo form. Admin forms use controlled React state and no client schema.
- Data layer: direct `fetch()` calls, small `api` and `adminApi` wrappers; public product fetches use Next revalidation (`300` seconds). No SWR, React Query, server actions, or database client found.
- Auth: browser `localStorage` token (`zynaqua_admin_token`) and client-side route guard in the admin layout ([src/lib/auth.ts](../src/lib/auth.ts), [src/app/(admin)/admin/layout.tsx](../src/app/(admin)/admin/layout.tsx)). Login posts directly to `${NEXT_PUBLIC_API_BASE_URL}/auth/login`.
- Package manager: npm, indicated by `package-lock.json`; no yarn/pnpm lockfile found.

### `package.json` dependencies (verbatim)

```json
{
  "name": "zynaqua-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.9.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.51.0",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.88.0",
    "tailwind-merge": "^3.7.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

## 2. FOLDER MAP

Depth-three map below is relative to `src/`. `C` marks a file containing `"use client"`; files without it are server components by default. `M` marks a mixed directory containing both.

```text
app/
  globals.css
  layout.tsx                         server
  login/page.tsx                     server (redirect)
  style-guide/page.tsx               server
  (public)/                          server route group
    layout.tsx
    page.tsx
    about/page.tsx
    amc/page.tsx
    contact/page.tsx
    products/page.tsx
    products/[slug]/page.tsx         server
    products/[slug]/not-found.tsx    server
  (admin)/                           M
    admin/layout.tsx                 C
    admin/dashboard/page.tsx         C
    admin/login/page.tsx             C
    admin/leads/page.tsx             C
    admin/leads/new/page.tsx         server
    admin/leads/[id]/page.tsx        C
    admin/leads/[id]/edit/page.tsx   C
    admin/products/page.tsx          C
    admin/products/new/page.tsx      server
    admin/products/[id]/edit/page.tsx C
components/
  admin/                             C
    AdminSidebar.tsx                 C
    LeadFilters.tsx                  C
    LeadForm.tsx                     C
    LeadSearchBar.tsx                C
    LeadTable.tsx                    server-compatible
    ProductForm.tsx                  C
    StatCard.tsx                     server-compatible
  home/                              M
    AmcTeaser.tsx                    server-compatible
    DemoForm.tsx                     C
    FeaturedProducts.tsx             server-compatible async component
    FinalCTA.tsx                     server-compatible
    PromoCarousel.tsx                C
    WhyZynAqua.tsx                    server-compatible
  layout/                            M
    FloatingWhatsApp.tsx             C
    Footer.tsx                       server-compatible
    MobileMenu.tsx                   C
    Navbar.tsx                       C
    PublicLayout.tsx                 server-compatible
  product/                           M
    FaqAccordion.tsx                 C
    ProductCard.tsx                  server-compatible
    ProductGallery.tsx               C
    ProductGrid.tsx                  server-compatible
    SpecTable.tsx                    server-compatible
  ui/                                server-compatible primitives
    Badge.tsx, Button.tsx, Card.tsx, Input.tsx, Skeleton.tsx, Textarea.tsx, index.ts
lib/
  adminApi.ts, api.ts, auth.ts, utils.ts, validators.ts, whatsapp.ts
types/
  index.ts
```

The route group layouts and all component paths above are present. `src/pages/` is not present.

## 3. DESIGN TOKENS

### `src/app/globals.css` (verbatim)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Shadows — subtle, premium; no harsh drop shadows */
  --shadow-card: 0 1px 3px rgba(17, 17, 19, 0.06), 0 1px 2px rgba(17, 17, 19, 0.04);
  --shadow-card-hover: 0 8px 24px rgba(17, 17, 19, 0.10), 0 2px 6px rgba(17, 17, 19, 0.06);
  --shadow-elevated: 0 16px 40px rgba(17, 17, 19, 0.14);

  /* Radius scale */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;

  /* Spacing rhythm for section padding, consumed via utility classes below */
  --space-section-y: 5rem;
  --space-section-y-mobile: 3rem;
}

@layer base {
  h1, h2, h3, h4 {
    @apply font-sans font-bold tracking-tight text-charcoal-950;
  }
  h1 { @apply text-4xl md:text-5xl lg:text-6xl leading-[1.1]; }
  h2 { @apply text-3xl md:text-4xl leading-[1.15]; }
  h3 { @apply text-2xl md:text-3xl leading-[1.2]; }
  h4 { @apply text-xl md:text-2xl; }
  p  { @apply text-charcoal-700 leading-relaxed; }

  /* Subtle-only motion, per brand rule — no bounce/spin/parallax anywhere */
  * {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .section-padding {
    padding-top: var(--space-section-y-mobile);
    padding-bottom: var(--space-section-y-mobile);
  }
  @media (min-width: 768px) {
    .section-padding {
      padding-top: var(--space-section-y);
      padding-bottom: var(--space-section-y);
    }
  }
  .shadow-card { box-shadow: var(--shadow-card); }
  .shadow-card-hover { box-shadow: var(--shadow-card-hover); }
  .shadow-elevated { box-shadow: var(--shadow-elevated); }
}
```

### `tailwind.config.ts` (verbatim)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep charcoal / black — primary brand color
        charcoal: {
          50: "#f7f7f8",
          100: "#eeeef0",
          400: "#6b6b70",
          700: "#2b2b30",
          900: "#111113",
          950: "#0a0a0b",
        },

        // Warm gold — secondary / accent
        gold: {
          400: "#e8c574",
          500: "#d4af37",
          600: "#b8942a",
        },

        // Water blue / aqua — used sparingly
        aqua: {
          400: "#4fc3d9",
          500: "#2ba8c2",
          600: "#1e8ba3",
        },
      },

      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  plugins: [],
};

export default config;
```

No other CSS variable/theme file was found. The CSS variables `--radius-*` are declared but not consumed by the visible component classes; Tailwind radius utilities are used instead.

### Colors and usage

Approximate source-token occurrence counts (counting class/token appearances, not rendered pixels):

| Value/token | Approx. count | Example |
|---|---:|---|
| `#f7f7f8` / `charcoal-50` | 15+ | [src/components/ui/Card.tsx](../src/components/ui/Card.tsx:8) |
| `#eeeef0` / `charcoal-100` | 25+ | [src/components/ui/Input.tsx](../src/components/ui/Input.tsx:18) |
| `#6b6b70` / `charcoal-400` | 20+ | [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx:43) |
| `#2b2b30` / `charcoal-700` | 15+ | [src/app/globals.css](../src/app/globals.css:25) |
| `#111113` / `charcoal-900` | 5+ | [src/components/ui/Button.tsx](../src/components/ui/Button.tsx:12) |
| `#0a0a0b` / `charcoal-950` | 25+ | [src/app/layout.tsx](../src/app/layout.tsx:24) |
| `#e8c574` / `gold-400` | 2 | [src/components/ui/Button.tsx](../src/components/ui/Button.tsx:14) |
| `#d4af37` / `gold-500` | 15+ | [src/components/layout/Navbar.tsx](../src/components/layout/Navbar.tsx:58) |
| `#b8942a` / `gold-600` | 5+ | [src/app/(public)/contact/page.tsx](../src/app/(public)/contact/page.tsx:50) |
| `#4fc3d9` / `aqua-400` | 1 config definition | [tailwind.config.ts](../tailwind.config.ts:32) |
| `#2ba8c2` / `aqua-500` | 4+ | [src/components/home/AmcTeaser.tsx](../src/components/home/AmcTeaser.tsx:6) |
| `#1e8ba3` / `aqua-600` | 3+ | [src/components/admin/LeadTable.tsx](../src/components/admin/LeadTable.tsx:88) |
| `#25D366` | 3 | [src/components/layout/FloatingWhatsApp.tsx](../src/components/layout/FloatingWhatsApp.tsx:12) |
| `#1fb958` | 1 | [src/components/ui/Button.tsx](../src/components/ui/Button.tsx:17) |
| red/emerald/amber utilities | 10+ each family | [src/components/ui/Badge.tsx](../src/components/ui/Badge.tsx:14) |
| arbitrary `rgba(17,17,19,...)` | 5 declarations/usages | [src/app/globals.css](../src/app/globals.css:7) |

Hardcoded color bypasses include WhatsApp green (`#25D366`, `#1fb958`) and the demo card shadow (`shadow-[0_4px_20px_rgba(17,17,19,0.06)]`) ([src/components/home/DemoForm.tsx](../src/components/home/DemoForm.tsx:58)).

### Typography, text classes, spacing, radius, shadow

- Font: `Plus_Jakarta_Sans` from `next/font/google`, weights `400, 500, 600, 700, 800`, CSS variable `--font-plus-jakarta`, `display: "swap"` ([src/app/layout.tsx](../src/app/layout.tsx:5)).
- Base headings: `font-sans font-bold tracking-tight text-charcoal-950`; h1 `text-4xl md:text-5xl lg:text-6xl leading-[1.1]`; h2 `text-3xl md:text-4xl leading-[1.15]`; h3 `text-2xl md:text-3xl leading-[1.2]`; h4 `text-xl md:text-2xl`. Body paragraphs use `text-charcoal-700 leading-relaxed` ([src/app/globals.css](../src/app/globals.css:21)).
- Common overrides: home hero h1 uses `text-3xl ... md:text-5xl`; product cards use `text-sm ... md:text-xl`; many page paragraphs use `text-sm leading-6 md:text-base md:leading-relaxed`.
- Section padding token: mobile `3rem`, desktop (min-width 768px) `5rem`, via `.section-padding`. Many pages instead use `py-10`, `py-16`, or home `space-y-16`.
- Container pattern: usually `mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6`; prose pages use `max-w-4xl`; forms use `max-w-3xl`; detail CTA/card radius uses `rounded-2xl`.
- Border-radius values in use: Tailwind `rounded-lg` (1? default 0.5rem), `rounded-xl` (1rem), `rounded-2xl` (1.25rem), `rounded-full`, plus `rounded-[20px]`; config repeats xl/2xl and CSS variables define `.5rem`, `.75rem`, `1rem`, `1.25rem`.
- Shadows: `--shadow-card` (`0 1px 3px ...`, `0 1px 2px ...`), `--shadow-card-hover` (`0 8px 24px ...`, `0 2px 6px ...`), `--shadow-elevated` (`0 16px 40px ...`), plus the demo card arbitrary shadow.

## 4. LAYOUTS

### Root layout (`src/app/layout.tsx`, full source)

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZynAqua — Premium Water Purifiers",
    template: "%s | ZynAqua",
  },
  description:
    "Premium water purifiers for your home. Book a free demo and get expert-fitted RO purification today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-white text-charcoal-950 antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Public layout (`src/app/(public)/layout.tsx` and `src/components/layout/PublicLayout.tsx`)

```tsx
// src/app/(public)/layout.tsx
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function PublicRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
```

```tsx
// src/components/layout/PublicLayout.tsx
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
```

### Admin layout (`src/app/(admin)/admin/layout.tsx`, full source)

```tsx
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
```

### Navbar (`src/components/layout/Navbar.tsx`, full source)

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MobileMenu } from "./MobileMenu";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/amc", label: "AMC" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 8); };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-shadow duration-200 ${
        isScrolled ? "bg-white shadow-card" : "bg-white/95 backdrop-blur-sm"
      }`}>
        <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-charcoal-950">
            Zyn<span className="text-gold-500">Aqua</span>
          </Link>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} className="text-sm font-medium text-charcoal-700 transition-colors hover:text-charcoal-950">{link.label}</Link></li>
            ))}
          </ul>
          <div className="hidden md:block">
            <a href={buildWhatsAppUrl(navbarWhatsAppMessage())} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="sm">WhatsApp Us</Button>
            </a>
          </div>
          <button type="button" aria-label="Open menu" aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
```

Mobile menu full behavior/source is [src/components/layout/MobileMenu.tsx](../src/components/layout/MobileMenu.tsx): fixed `inset-0`, `z-50`, `md:hidden`; right drawer `w-[80%] max-w-sm`, `overflow-y-auto`, body scroll locked while open, backdrop closes it, and links/WhatsApp close or navigate. It has an accessible close label but no focus trap or Escape handler.

### Footer (`src/components/layout/Footer.tsx`)

Full source is [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx). It renders four desktop columns (brand, Quick Links, Contact, Follow Us), then a bottom copyright/link bar. The links are hardcoded; `/privacy-policy` and `/terms` are linked but no corresponding route was found (`NOT FOUND`).

### Floating WhatsApp (`src/components/layout/FloatingWhatsApp.tsx`)

Full source is [src/components/layout/FloatingWhatsApp.tsx](../src/components/layout/FloatingWhatsApp.tsx). It is `position: fixed`, `z-50`, `bottom-20 right-4` on mobile and `md:bottom-6 md:right-6`, 56px square, circular, with inline SVG and `aria-label="Chat with ZynAqua on WhatsApp"`.

### Admin Sidebar/mobile drawer

Full source is [src/components/admin/AdminSidebar.tsx](../src/components/admin/AdminSidebar.tsx). Desktop is `hidden md:flex`, `h-screen`, `w-60`, non-fixed and scrolls with the page shell. Mobile is rendered only while open as `fixed inset-0 z-50 md:hidden`; the drawer is left-aligned, `w-64`, full height, with a backdrop. The mobile/admin menu buttons use padding only (no explicit 44px dimensions). Logout clears local storage and pushes `/admin/login`.

Fixed/sticky overlap: public Navbar is sticky `top-0 z-40`; mobile drawer and floating WhatsApp are `z-50`. The floating button is intentionally raised to `bottom-20` on mobile, but public pages do not add bottom padding for it. Admin has no floating WhatsApp and no bottom-overlap padding.

### Layout source files (verbatim)

The following are the complete source bodies of the remaining requested layout files.

#### `src/components/layout/MobileMenu.tsx`

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-charcoal-950/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm overflow-y-auto bg-white p-6 shadow-elevated">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-extrabold text-charcoal-950">
            Zyn<span className="text-gold-500">Aqua</span>
          </span>
          <button aria-label="Close menu" onClick={onClose} className="p-2 -mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal-700 hover:bg-charcoal-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppUrl(navbarWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block"
        >
          <Button variant="whatsapp" className="w-full">WhatsApp Us</Button>
        </a>
      </div>
    </div>
  );
}
```

#### `src/components/layout/FloatingWhatsApp.tsx`

```tsx
"use client";

import { buildWhatsAppUrl, floatingWhatsAppMessage } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(floatingWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZynAqua on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-elevated transition-transform duration-200 hover:scale-105 md:bottom-6 md:right-6"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.09c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.7-.17 1.38z" />
      </svg>
    </a>
  );
}
```

#### `src/components/layout/Footer.tsx`

```tsx
import Link from "next/link";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/amc", label: "AMC" },
];

const SOCIAL_LINKS = [
  { href: buildWhatsAppUrl(navbarWhatsAppMessage()), label: "WhatsApp" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-charcoal-950 text-charcoal-100">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-10 gap-y-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold text-white">Zyn<span className="text-gold-500">Aqua</span></span>
          <p className="mt-3 text-sm text-charcoal-400">Premium water purifiers built on trust, real purification technology, and dependable after-sales service.</p>
        </div>
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">Quick Links</h5>
          <ul className="space-y-2">{QUICK_LINKS.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-charcoal-400 hover:text-white">{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">Contact</h5>
          <ul className="space-y-2 text-sm text-charcoal-400"><li>WhatsApp: +91 92271 19282</li><li>Surat, Gujarat, India</li></ul>
        </div>
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">Follow Us</h5>
          <ul className="space-y-2">{SOCIAL_LINKS.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-400 hover:text-white">{link.label}</a></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-charcoal-900 px-6 py-5">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-4 text-xs text-charcoal-400 sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} ZynAqua. All rights reserved.</p>
          <div className="flex gap-4"><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}
```

#### `src/components/admin/AdminSidebar.tsx`

The complete source is [src/components/admin/AdminSidebar.tsx](../src/components/admin/AdminSidebar.tsx). It is included as the source of truth for the desktop sidebar and mobile drawer; the earlier layout description records every positioning and interaction class. No additional sidebar file exists.

## 5. COMPONENT INVENTORY

Usage counts below are approximate source call-site counts, excluding the component's own definition.

| Component | Path | Props | Variants | Usage count / notes |
|---|---|---|---|---|
| Button | [src/components/ui/Button.tsx](../src/components/ui/Button.tsx) | native button props, `variant`, `size`, `isLoading` | primary, secondary, outline, whatsapp, ghost; sm/md/lg | 30+; shared |
| Card | [src/components/ui/Card.tsx](../src/components/ui/Card.tsx) | div HTML props | none | 15+; shared but hover is always enabled |
| CardBody | [src/components/ui/Card.tsx](../src/components/ui/Card.tsx) | div HTML props | none | 15+ |
| Input | [src/components/ui/Input.tsx](../src/components/ui/Input.tsx) | native input props, label/error | error/no error | 20+; shared |
| Textarea | [src/components/ui/Textarea.tsx](../src/components/ui/Textarea.tsx) | native textarea props, label/error | error/no error | 8+; shared |
| Badge | [src/components/ui/Badge.tsx](../src/components/ui/Badge.tsx) | span props, variant | neutral, gold, aqua, success, warning, danger | 15+; shared |
| Skeleton | [src/components/ui/Skeleton.tsx](../src/components/ui/Skeleton.tsx) | div props | arbitrary class | dashboard/leads only |
| ProductCard | [src/components/product/ProductCard.tsx](../src/components/product/ProductCard.tsx) | product, priority | active/no image | product grid call sites |
| ProductGrid | [src/components/product/ProductGrid.tsx](../src/components/product/ProductGrid.tsx) | products, groupByCategory | flat/category grouped | products page, home, detail |
| ProductGallery | [src/components/product/ProductGallery.tsx](../src/components/product/ProductGallery.tsx) | images, productName | no images/multiple thumbnails | detail only |
| SpecTable | [src/components/product/SpecTable.tsx](../src/components/product/SpecTable.tsx) | specifications | empty/non-empty | detail only |
| FaqAccordion | [src/components/product/FaqAccordion.tsx](../src/components/product/FaqAccordion.tsx) | question/answer items | one open index/closed | AMC; detail passes empty |
| LeadTable | [src/components/admin/LeadTable.tsx](../src/components/admin/LeadTable.tsx) | leads | desktop table/mobile cards | dashboard + leads |
| LeadForm | [src/components/admin/LeadForm.tsx](../src/components/admin/LeadForm.tsx) | initialValues, leadId | add/edit | new + edit |
| ProductForm | [src/components/admin/ProductForm.tsx](../src/components/admin/ProductForm.tsx) | initialValues, productId | add/edit | new + edit |
| LeadSearchBar | [src/components/admin/LeadSearchBar.tsx](../src/components/admin/LeadSearchBar.tsx) | onSearch | one text search | leads |
| LeadFilters | [src/components/admin/LeadFilters.tsx](../src/components/admin/LeadFilters.tsx) | values, onChange | status/type/city/date | leads |
| StatCard | [src/components/admin/StatCard.tsx](../src/components/admin/StatCard.tsx) | label, value, accent | neutral/gold/aqua | dashboard |
| Navbar/Footer/FloatingWhatsApp | [src/components/layout/](../src/components/layout/) | Navbar none; layout children; link/menu props internally | desktop/mobile | public shell |
| Section headings/containers | inline in pages | none | page-specific classes | no shared heading/container primitive |

No checkbox, select, table, status-chip, or section-heading primitive exists. Native selects, checkbox/radio inputs, tables, and one-off `<div>` cards are used inline. Product cards are shared; admin product list cards are built inline in [src/app/(admin)/admin/products/page.tsx](../src/app/(admin)/admin/products/page.tsx). About value cards and Why ZynAqua cards are also inline one-offs. Status mapping is duplicated between [LeadTable.tsx](../src/components/admin/LeadTable.tsx) and lead detail/forms.

## 6. PAGES

Hardcoded means JSX/constant content in the repository; data-driven means API data or props. Dynamic API values are not inventable and are marked `NOT FOUND`.

### Public routes

- `/` — [src/app/(public)/page.tsx](../src/app/(public)/page.tsx), hardcoded shell:
  1. Hero: `Premium Water Purifiers for Your Home`; `RO + Alkaline purification, free installation, and reliable after-sales support — trusted by homes across Surat.`; child [DemoForm](../src/components/home/DemoForm.tsx).
  2. Promo carousel: child [PromoCarousel](../src/components/home/PromoCarousel.tsx), image alt text `ZynAqua promotional image 1` through `4`, local image data.
  3. `Featured Products`; [FeaturedProducts](../src/components/home/FeaturedProducts.tsx), API-driven `/products/featured`; `View All Products →`.
  4. `Why Buy From ZynAqua`; [WhyZynAqua](../src/components/home/WhyZynAqua.tsx): `Genuine Technology` / `Real RO + UV + Alkaline purification — no shortcuts.`; `Free Installation` / `Expert-fitted at your home, included with every purchase.`; `Reliable AMC Support` / `Scheduled maintenance so your purifier never lets you down.`; `Transparent Pricing` / `No hidden charges — what you see is what you pay.`
  5. AMC teaser [AmcTeaser](../src/components/home/AmcTeaser.tsx): `Keep Your Purifier Running Like New`; `Our AMC plans cover filter replacement, servicing, and genuine parts.`; `Explore AMC Plans`.
  6. Final CTA [FinalCTA](../src/components/home/FinalCTA.tsx): `Ready for Pure, Safe Water at Home?`; `Book a free demo today or chat with us directly on WhatsApp.`; `Book Free Demo`; `WhatsApp Us`.
- `/products` — [src/app/(public)/products/page.tsx](../src/app/(public)/products/page.tsx), hardcoded heading `Our Products`; paragraph `Browse our full range of water purifiers and accessories. Tap any product to see full specifications, or WhatsApp us directly.`; [ProductGrid](../src/components/product/ProductGrid.tsx) is API-driven `/products`; empty copy `No products available right now — please check back soon.`.
- `/products/[slug]` — [src/app/(public)/products/[slug]/page.tsx](../src/app/(public)/products/[slug]/page.tsx), API-driven product name/model/description/price/MRP/features/specifications/images and related products (`NOT FOUND` for actual API values). Hardcoded section/copy order: breadcrumb `Products` and slash; `Choose Model`; `Enquire on WhatsApp`; optional `Product Overview`; optional `Specifications`; `Frequently Asked Questions` (currently passes `[]`, so no visible Q&A); optional `You May Also Like`; `Have Questions About {product.name}?`; `Chat With Us on WhatsApp`. Model 1/Model 2 labels are API `modelName` values, not hardcoded.
- `/about` — [src/app/(public)/about/page.tsx](../src/app/(public)/about/page.tsx): `Water You Can Trust`; `ZynAqua builds water purifiers designed around one priority: genuinely clean, safe drinking water for your home — without shortcuts.`; sections `Who We Are`, `Our Mission`, `Our Approach`, `Technology`, `Quality`, `Brand Values`, `Why ZynAqua`, and CTA `Ready to Experience ZynAqua?` / `Browse Products`. Full paragraphs are hardcoded in this file. Brand values: `Transparency` / `Clear pricing, no hidden charges.`; `Reliability` / `Support that's easy to reach when you need it.`; `Craftsmanship` / `Purification technology chosen for real effectiveness, not marketing.`. Inline links say `full product range` and `AMC plans`.
- `/amc` — [src/app/(public)/amc/page.tsx](../src/app/(public)/amc/page.tsx): hero `Keep Your Purifier Running Like New`; `Our AMC plans handle servicing, filter replacement, and genuine parts — so your purifier keeps delivering the water quality it did on day one.`; sections `Why AMC?`, `AMC Benefits`, `Maintenance`, `Filter Replacement`, `Genuine Parts`, `Service Support`, `How AMC Works`, `Frequently Asked Questions`; CTA `Ready to Enrol in an AMC Plan?` / `WhatsApp Us About AMC`. Benefits: `Scheduled Servicing`, `Filter Replacement`, `Genuine Parts`, `Priority Support` with descriptions in the file. Steps: `Enrol`, `Scheduled Visits`, `Filter & Parts Replacement`, `Ongoing Support`. FAQ Q&A: `What does an AMC plan cover?` / `Scheduled servicing, filter and cartridge replacement, and genuine parts for your ZynAqua purifier, as outlined when you enrol.`; `How do I enrol my purifier in an AMC plan?` / `Message us on WhatsApp with your purifier model and we'll walk you through enrolment and scheduling.`
- `/contact` — [src/app/(public)/contact/page.tsx](../src/app/(public)/contact/page.tsx): `Get in Touch`; `Have a question about a product, an existing AMC plan, or anything else? Reach us directly — we typically respond fastest on WhatsApp.`; cards `Phone`, `WhatsApp`, `Email`, `Address` with values `+91 92271 19282`, `+91 92271 19282`, `support@zynaqua.com`, `Surat, Gujarat, India`; `Follow Us`; links `WhatsApp`, `Facebook`, `Instagram`.

### Admin and utility routes

- `/login` — [src/app/login/page.tsx](../src/app/login/page.tsx), no visible copy; redirects to `/admin/login`.
- `/admin/login` — [src/app/(admin)/admin/login/page.tsx](../src/app/(admin)/admin/login/page.tsx): `Admin Login`; `Sign in to manage ZynAqua leads, customers, and products.`; labels `Email`, `Password`; placeholder `admin@zynaqua.com`, `••••••••`; submit `Log In`; error is API message or `Login failed`.
- `/admin/dashboard` — [src/app/(admin)/admin/dashboard/page.tsx](../src/app/(admin)/admin/dashboard/page.tsx): `Admin Dashboard`; six stat labels `Total Leads`, `New`, `Contacted`, `Demo Scheduled`, `Demo Completed`, `Converted`; `Recent Enquiries`; `View All Leads`; data/API values are `NOT FOUND`.
- `/admin/leads` — [src/app/(admin)/admin/leads/page.tsx](../src/app/(admin)/admin/leads/page.tsx): `Leads`; `+ Add Lead`; search placeholder `Search by name, mobile, email, pincode, or customer ID`; filters `All Statuses`, `All Types`, `City`, `All Time`, `Today`, `Yesterday`, `Last 7 Days`, `Last 30 Days`; pagination `Previous`, `Page {n} of {total}`, `Next`; empty `No leads match your search or filters.`. Rows/cards are API-driven.
- `/admin/leads/new` — [src/app/(admin)/admin/leads/new/page.tsx](../src/app/(admin)/admin/leads/new/page.tsx): `Add Lead`; `For a customer who contacted ZynAqua offline — phone, WhatsApp, or a walk-in.`; [LeadForm](../src/components/admin/LeadForm.tsx) copy below.
- `/admin/leads/[id]` — [src/app/(admin)/admin/leads/[id]/page.tsx](../src/app/(admin)/admin/leads/[id]/page.tsx): loading `Loading…`; error/back `Back to Leads`; dynamic lead fields are `NOT FOUND`; buttons `Edit Lead`, `Delete`, `Save Status`, `Call`, `WhatsApp`; labels `Mobile`, `Email`, `City / Pincode`, `Product`, `Address`, optional `Message`, `Status`.
- `/admin/leads/[id]/edit` — [src/app/(admin)/admin/leads/[id]/edit/page.tsx](../src/app/(admin)/admin/leads/[id]/edit/page.tsx): `Edit Lead`; loading `Loading…`; error `Product not found` is not used here (lead error is API-driven); [LeadForm](../src/components/admin/LeadForm.tsx).
- `/admin/products` — [src/app/(admin)/admin/products/page.tsx](../src/app/(admin)/admin/products/page.tsx): `Products`; `Add Product`; API-driven product names/categories/prices; badges `Inactive`, `Featured`; buttons `Edit`, `Deactivate`, `Reactivate`; error `Action failed` fallback.
- `/admin/products/new` — [src/app/(admin)/admin/products/new/page.tsx](../src/app/(admin)/admin/products/new/page.tsx): `Add Product`; [ProductForm](../src/components/admin/ProductForm.tsx).
- `/admin/products/[id]/edit` — [src/app/(admin)/admin/products/[id]/edit/page.tsx](../src/app/(admin)/admin/products/[id]/edit/page.tsx): `Edit Product`; `Loading…`; `Product not found`; [ProductForm](../src/components/admin/ProductForm.tsx).
- `/style-guide` — [src/app/style-guide/page.tsx](../src/app/style-guide/page.tsx): `Buttons`, `Book Free Demo`, `View Details`, `Learn More`, `WhatsApp Us`, `Cancel`, `Submitting`; `Badges`, `RO Purification`, `Alkaline`, `NEW`, `CONVERTED`, `FOLLOW_UP`, `NOT_INTERESTED`; `Card`, `Sample Product Card`, `Verifying radius, border, and hover shadow.`; `Form Inputs`, `Full Name`, `Rahul Sharma`, `Mobile Number`, `9876543210`, `Enter a valid 10-digit mobile number`, `Address`, `Flat / House no, street, area`.

## 7. FORMS

| Form | Fields and rules | Attributes | Submit/error/success/loading |
|---|---|---|---|
| Hero demo | `name` required, 1–100; `mobile` required, regex `^[6-9]\d{9}$`; optional `email`, valid email or empty; `city` required, max 100; `pincode` required, exactly six digits; `address` required | `mobile`/`pincode` `inputMode="numeric"`; email has no explicit `autoComplete`; all fields use labels and IDs; `noValidate` | `react-hook-form` + Zod; `api.post("/leads", payload)`; field errors below inputs; server error red panel; success green panel; Button loading text `Submitting…`; on success reset and opens WhatsApp |
| Admin login | email, password; both HTML `required`; no client schema | email `type=email`; password `type=password`; no `autoComplete`; `noValidate` absent | direct `fetch(.../auth/login)` POST; red error panel; no success message; `isSubmitting` disables Button and shows `Submitting…`; saves local token then routes dashboard |
| Add/edit lead | name/mobile/city/pincode/address required by UI; email/product/message optional; enquiry type enum; edit additionally status enum | mobile/pincode `inputMode="numeric"`; selects native; no `type` on most inputs; no autocomplete; no client validation | `adminApi.post("/admin/leads")` or `adminApi.put("/admin/leads/:id")`; API `fieldErrors` shown by name; generic error panel; redirect to leads on success; loading Button |
| Add/edit product | name/modelName/price required by UI; slug, descriptions, MRP, category optional; isFeatured checkbox; repeatable images, feature chips, specifications; image URL/alt, feature name/value, spec name/value have no client required rules | price/MRP `type=number`; checkbox and radio native; no `inputMode`, autocomplete, or URL validation | `adminApi.post("/admin/products")` or `put("/admin/products/:id")`; one generic error panel, no field-level API mapping; redirect products on success; loading Button |

There is no public product enquiry form, contact form, or separate login form beyond admin login. The admin product form sends `Number(values.price)` and `Number(values.mrp)`; invalid/empty numeric strings can become `NaN` because there is no client schema.

## 8. DATA SHAPES USED BY THE UI

### Product

`Product` in [src/types/index.ts](../src/types/index.ts) has `id: number`, `name: string`, `modelName: string | null`, `slug: string`, `shortDescription: string | null`, `description: string | null`, `price: number`, `mrp: number | null`, `category: string | null`, `isFeatured: boolean`, `isActive: boolean`, `images: ProductImage[]`, `features: ProductFeature[]`, and `specifications: ProductSpecification[]`.

- `ProductImage`: `id`, `imageUrl`, `altText`, `displayOrder`, `isPrimary`.
- `ProductFeature`: `id`, `featureName`, `featureValue`, `displayOrder`.
- `ProductSpecification`: `id`, `specificationName`, `specificationValue`, `displayOrder`.
- Model variants are not a nested field. The detail page fetches related products and treats same-name, different-slug products as variants; their `modelName` values render as the model choices ([src/app/(public)/products/[slug]/page.tsx](../src/app/(public)/products/[slug]/page.tsx:74)).
- Product cards render primary image, name, optional model name, two-line short description, first three feature names only, price/MRP, `View Details`, and `WhatsApp` ([src/components/product/ProductCard.tsx](../src/components/product/ProductCard.tsx:15)).
- Product list renders category, price, active/featured badges, and edit/activate actions; it does not render images or model name ([src/app/(admin)/admin/products/page.tsx](../src/app/(admin)/admin/products/page.tsx:47)).

### Lead

Public `LeadRequest` fields: `name`, `mobile`, optional `email`, `city`, `pincode`, `address`, `enquiryType`, optional `productId`. Enquiry type enum: `FREE_DEMO`, `PRODUCT_ENQUIRY`, `AMC`, `SERVICE`, `GENERAL`. Status enum: `NEW`, `CONTACTED`, `FOLLOW_UP`, `DEMO_SCHEDULED`, `DEMO_COMPLETED`, `CONVERTED`, `NOT_INTERESTED`, `CANCELLED`. Source enum: `ONLINE`, `OFFLINE`.

Lead list shape in [LeadTable.tsx](../src/components/admin/LeadTable.tsx): `enquiryId`, `customerId`, `customerName`, `customerMobile`, `customerCity`, `enquiryType`, `source`, `status`, `createdAt`. Lead detail adds `customerEmail`, `customerPincode`, `customerAddress`, `productId`, `productName`, `message`, `updatedAt`.

Leads search, filters, and pagination are server-side query parameters sent by the browser to `/admin/leads`; the UI sends `page` and `size=20`, so page size is 20. The table-to-card switch is client render branching in [LeadTable.tsx](../src/components/admin/LeadTable.tsx), not data transformation.

## 9. IMAGES

- All application-rendered images use `next/image`; no `<img>` usage was found.
- Product images come from API `imageUrl` values and are rendered with `fill`, `object-contain`, and `sizes` in [ProductCard.tsx](../src/components/product/ProductCard.tsx), [ProductGallery.tsx](../src/components/product/ProductGallery.tsx), and product detail model cards.
- Product card aspect ratio is `4/3` below `sm`, square at `sm+`; gallery/detail is square. The thumbnail is `64px` square. Promo carousel is `h-52` mobile and `md:h-96`.
- Local static promo assets are `/public/images/promo/promo1.webp` through `promo4.webp`; the public root listing also contains default Next/Vercel SVGs and `public/images` ([public/](../public/)). Product files in the checked-in public tree are `NOT FOUND`; product image paths are API-driven and may be external or missing locally. `next.config.ts` has no active `remotePatterns`, so remote API image URLs would require configuration.
- The same image files are not provably shared by all products: product image URLs are data-driven; `NOT FOUND` for the API dataset.
- Home banner/carousel is a custom client component, not a library: four hardcoded slides, 5-second `setInterval` autoplay, opacity transitions, clickable dot buttons, first image `priority`, `aria-live="polite"`. There is no pause control, keyboard slide control, reduced-motion branch, or explicit carousel roles.

## 10. INTERACTION & A11Y SCAN

- Hover styles are widespread (`hover:bg-*`, `hover:text-*`, `hover:shadow-*`, `hover:scale-105`) and are not guarded by `@media (hover: hover)`.
- Focus-visible: shared Button has `focus-visible:outline-none` and a 2px ring; Input/Textarea use generic `focus:outline-none focus:ring-2` but not `focus-visible`; native selects and many inline buttons have no explicit focus styling.
- Menus: Navbar hamburger exposes `aria-label` and `aria-expanded`; backdrop has `aria-hidden`; close buttons have labels. No focus trap, `aria-controls`, Escape handling, or focus restoration.
- Accordion buttons expose `aria-expanded` but no `aria-controls`/controlled panel ID. Carousel dots have labels but no `aria-current`; `aria-live` is on the entire slide viewport.
- Breadcrumb has `aria-label="Breadcrumb"`. Decorative inline SVGs are hidden where appropriate.
- Label association: shared Input/Textarea use `htmlFor={id}`; demo form supplies IDs. Admin controlled inputs often omit IDs, so their visible labels are not programmatically associated. Select labels in LeadForm and ProductForm are unassociated.
- Touch targets: Navbar hamburger is 40x40; carousel dots are 6px high and inactive dots 6px wide; admin close/menu buttons are padding-only; these are below a 44px target. Floating WhatsApp is 56px. Shared small Buttons can be less than 44px tall.
- Contrast risks detectable from tokens: `charcoal-400` on white is muted; `charcoal-400`/`charcoal-500` on white and `gold-500` text/background combinations should be checked. `bg-gold-500/15` badge backgrounds and small text need contrast testing. No automated contrast test found.
- `prefers-reduced-motion` is not implemented. Global `scroll-behavior: smooth`, carousel opacity transitions, hover scale, button transitions, and `animate-pulse` remain active.

## 11. RESPONSIVE

Approximate Tailwind responsive-prefix occurrences across `src`: `sm` 30+, `md` 45+, `lg` 12+, `xl` 0, `2xl` 0. There are also four arbitrary `min-[641px]` usages in the admin product list. Exact generated CSS usage is not measured; counts refer to source class occurrences.

- Main breakpoints actually used: `sm` (640px), `md` (768px), `lg` (1024px); no `xl`/`2xl` classes found.
- Fixed/max widths: `max-w-[1200px]` content/header/footer; `max-w-4xl` prose pages; `max-w-3xl` forms; `max-w-[720px]` demo form; mobile drawer `w-[80%] max-w-sm`, admin drawer `w-64`, sidebar `w-60`.
- Overflow handling: admin lead desktop table uses `overflow-x-auto`; product spec table uses `overflow-x-auto`; admin main uses `min-w-0`; mobile menu drawers use `overflow-y-auto`. No global `overflow-x-hidden` found.
- Admin leads table-to-card switch is explicitly implemented in [src/components/admin/LeadTable.tsx](../src/components/admin/LeadTable.tsx:40): desktop table `hidden md:block`, mobile stacked links `md:hidden`.
- Admin products use stacked cards at narrow widths and switch to row layout at `min-[641px]`; there is no admin product table.

## 12. PROBLEMS FOUND

- Product detail always renders the FAQ heading but passes an empty array, so the section is visibly empty: [src/app/(public)/products/[slug]/page.tsx](../src/app/(public)/products/[slug]/page.tsx:216).
- Footer links to `/privacy-policy` and `/terms`, but those routes are `NOT FOUND` in the inspected app tree: [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx:119).
- Admin sidebar exposes `Customers` as `Soon`, a visible placeholder/dead navigation item: [src/components/admin/AdminSidebar.tsx](../src/components/admin/AdminSidebar.tsx:54).
- Product form comments/UX promise slug auto-generation, but no client auto-generation is implemented; it simply sends `undefined` when blank: [src/components/admin/ProductForm.tsx](../src/components/admin/ProductForm.tsx:71).
- Product form has no client validation for required fields, numeric ranges, image URLs, duplicate primary images, or repeatable row content: [src/components/admin/ProductForm.tsx](../src/components/admin/ProductForm.tsx:64).
- Login has no autocomplete attributes and stores auth in localStorage, while the admin route guard is client-only: [src/app/(admin)/admin/login/page.tsx](../src/app/(admin)/admin/login/page.tsx:39), [src/lib/auth.ts](../src/lib/auth.ts:1).
- `LeadForm` silently converts product-option fetch failure to an empty list (`catch(() => setProducts([]))`), which hides a data error from the user: [src/components/admin/LeadForm.tsx](../src/components/admin/LeadForm.tsx:53).
- Admin list/detail forms duplicate native select styles and label markup instead of shared accessible controls: [src/components/admin/LeadForm.tsx](../src/components/admin/LeadForm.tsx:128), [src/components/admin/LeadFilters.tsx](../src/components/admin/LeadFilters.tsx:21).
- Shared Card applies hover shadow to every card, including non-interactive cards, and hover behavior is not hover-capability guarded: [src/components/ui/Card.tsx](../src/components/ui/Card.tsx:8).
- WhatsApp color is hardcoded outside the configured token palette in both shared Button and floating action: [src/components/ui/Button.tsx](../src/components/ui/Button.tsx:17), [src/components/layout/FloatingWhatsApp.tsx](../src/components/layout/FloatingWhatsApp.tsx:12).
- Carousel autoplay has no pause/stop control or reduced-motion support and its dot buttons are undersized: [src/components/home/PromoCarousel.tsx](../src/components/home/PromoCarousel.tsx:17).
- Product image remote-host support is commented out; API-driven external image URLs will not work with `next/image` unless the deployment uses local paths or adds `remotePatterns`: [next.config.ts](../next.config.ts:3).
- Several inline one-off cards duplicate shared Card styling: About values [src/app/(public)/about/page.tsx](../src/app/(public)/about/page.tsx:76), Why cards [src/components/home/WhyZynAqua.tsx](../src/components/home/WhyZynAqua.tsx:32), and admin product rows [src/app/(admin)/admin/products/page.tsx](../src/app/(admin)/admin/products/page.tsx:47).
- Public pages use inconsistent vertical rhythm (`py-10`, `py-16`, `space-y-16`, manual `mt-12`/`mt-16`) rather than consistently consuming `.section-padding`: [src/app/(public)/page.tsx](../src/app/(public)/page.tsx:11), [src/app/(public)/about/page.tsx](../src/app/(public)/about/page.tsx:12).
- Floating WhatsApp is fixed over content with no page bottom compensation: [src/components/layout/PublicLayout.tsx](../src/components/layout/PublicLayout.tsx:8), [src/components/layout/FloatingWhatsApp.tsx](../src/components/layout/FloatingWhatsApp.tsx:12).
- No loading/error boundary or empty-state treatment is visible for several server-rendered public fetch failures; fetch failures throw and rely on Next error handling: [src/app/(public)/products/page.tsx](../src/app/(public)/products/page.tsx:10).

## 13. REDESIGN RISKS

- `Button`, `Card`, `Input`, `Textarea`, and `Badge` are used across public and admin routes; changing dimensions, default colors, focus behavior, or loading text has broad impact ([src/components/ui/](../src/components/ui/)).
- `ProductCard`/`ProductGrid` are shared by home featured products, the products index, and related products; changing card information hierarchy affects all three surfaces ([src/components/product/ProductGrid.tsx](../src/components/product/ProductGrid.tsx:8)).
- `LeadTable` owns both desktop table and mobile card markup and is used on dashboard and leads index; redesign must preserve both representations and their links ([src/components/admin/LeadTable.tsx](../src/components/admin/LeadTable.tsx:32)).
- `PublicLayout` injects Navbar, Footer, and the fixed WhatsApp CTA into every public route; shell changes affect all public SEO pages ([src/components/layout/PublicLayout.tsx](../src/components/layout/PublicLayout.tsx:5)).
- Content is partly API/CMS-like: products, images, specifications, feature chips, lead rows, dashboard statistics, and related products are not statically present. A visual redesign must preserve API field names and empty/error states ([src/types/index.ts](../src/types/index.ts), [src/lib/api.ts](../src/lib/api.ts)).
- SEO metadata is explicit at root and on public products/about/AMC/contact pages, and product detail metadata is generated from API values; route redesign must retain these exports and dynamic Open Graph image behavior ([src/app/layout.tsx](../src/app/layout.tsx:12), [src/app/(public)/products/[slug]/page.tsx](../src/app/(public)/products/[slug]/page.tsx:43)).
- No tests, snapshots, Storybook setup, or visual regression configuration were found. This reduces test migration work but increases manual regression risk (`NOT FOUND`).
- Third-party/externally owned behavior includes Google font loading, WhatsApp `wa.me` links, Facebook/Instagram links, and API endpoints from environment variables ([.env.local.example](../.env.local.example)).
- Admin auth is coupled to localStorage, client redirects, and an Authorization header; changing layout boundaries or server/client placement can break authentication behavior ([src/app/(admin)/admin/layout.tsx](../src/app/(admin)/admin/layout.tsx:1), [src/lib/adminApi.ts](../src/lib/adminApi.ts:1)).
