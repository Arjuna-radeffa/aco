"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  simple?: boolean;
  isLoggedIn?: boolean;
  userRole?: "external" | "io" | "pm" | "fr" | "admin";
}

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "Tentang ACO", href: "/about" },
];

const DASHBOARD_BY_ROLE: Record<string, string> = {
  external: "/dashboard",
  io: "/projects",
  pm: "/monitoring",
  fr: "/finance",
  admin: "/admin/kyc",
};

export default function Navbar({
  simple = false,
  isLoggedIn = false,
  userRole = "external",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardHref = DASHBOARD_BY_ROLE[userRole] ?? "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              ACO
            </span>
          </Link>

          {/* Desktop nav links */}
          {!simple && (
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA buttons */}
          {!simple && (
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile toggle */}
          {!simple && (
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {!simple && mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-2 pt-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  className="block text-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="block text-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
