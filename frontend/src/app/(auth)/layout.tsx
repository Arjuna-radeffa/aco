import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex flex-col">
      {/* Simple header — logo only */}
      <header className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">ACO</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        {children}
      </main>

      <footer className="py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ACO. Semua hak dilindungi.
      </footer>
    </div>
  );
}
