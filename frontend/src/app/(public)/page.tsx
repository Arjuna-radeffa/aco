"use client";

import Link from "next/link";
import { useState } from "react";
import {
  TrendingUp,
  Heart,
  Users,
  FolderOpen,
  Shield,
  Eye,
  Lock,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { FEATURED_PROJECTS } from "@/lib/mock-data";
import { ProjectCard } from "@/components/ui/ProjectCard";

// ─── Platform stats mock ──────────────────────────────────────────────────

const PLATFORM_STATS = {
  activeProjects: 24,
  totalInvestment: 18_500_000_000,
  totalWaqf: 4_200_000_000,
  participants: 1_347,
};

// ─── How it works steps ───────────────────────────────────────────────────

const INVESTASI_STEPS = [
  { step: 1, title: "Daftar & KYC", desc: "Buat akun dan lengkapi verifikasi identitas untuk mulai berinvestasi.", href: "/register" },
  { step: 2, title: "Pilih Proyek", desc: "Jelajahi proyek-proyek pilihan yang telah terverifikasi tim ACO.", href: "/browse?tab=investasi" },
  { step: 3, title: "Konfirmasi Investasi", desc: "Masukkan nominal, tinjau skema bagi hasil, dan konfirmasi partisipasi.", href: null },
  { step: 4, title: "Terima Bagi Hasil", desc: "Nikmati bagi hasil sesuai jadwal yang telah disepakati di akad.", href: null },
];

const WAKAF_STEPS = [
  { step: 1, title: "Daftar & KYC", desc: "Buat akun dan lengkapi verifikasi identitas sebagai syarat ikrar wakaf.", href: "/register" },
  { step: 2, title: "Pilih Program", desc: "Temukan program wakaf produktif yang ingin Anda dukung.", href: "/browse?tab=wakaf" },
  { step: 3, title: "Ikrarkan Wakaf", desc: "Masukkan nominal dan ikrarkan wakaf uang Anda secara digital.", href: null },
  { step: 4, title: "Pantau Dampak", desc: "Terima laporan rutin tentang pengelolaan dan dampak sosial wakaf Anda.", href: null },
];

// ─── Advantages ───────────────────────────────────────────────────────────

const ADVANTAGES = [
  { icon: Shield, title: "Sesuai Syariah", desc: "Aturan syariah dikuatkan di level sistem: pemisahan dana, batas fee nazir, dan sifat permanen wakaf.", color: "emerald" },
  { icon: Eye, title: "Transparan", desc: "RAB dan rencana penggunaan dana dapat diakses publik per proyek. Tidak ada informasi yang disembunyikan.", color: "blue" },
  { icon: Lock, title: "Dana Terisolasi", desc: "Empat rekening terpisah: Investasi, Zakat, Infaq/Shadaqah, dan Wakaf Produktif. Tidak dapat dicampur.", color: "amber" },
  { icon: CheckCircle, title: "Diawasi Penuh", desc: "Audit log immutable dan monitoring portofolio berjalan secara real-time oleh tim dedicated.", color: "violet" },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
};

const ICON_COLOR_MAP: Record<string, string> = {
  emerald: "text-emerald-600",
  blue: "text-blue-600",
  amber: "text-amber-600",
  violet: "text-violet-600",
};

// ─── Sub-components ───────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, isCurrency = false }: {
  icon: React.ElementType; label: string; value: number; isCurrency?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
        <Icon size={20} className="text-emerald-600" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">
          {isCurrency ? formatRupiah(value) : value.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function StepCard({ step, title, desc, href }: {
  step: number; title: string; desc: string; href: string | null;
}) {
  const inner = (
    <div className="relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm h-full group">
      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 text-base mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
      {href && (
        <div className="mt-auto pt-2">
          <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Mulai <ArrowRight size={14} />
          </span>
        </div>
      )}
    </div>
  );
  if (href) return <Link href={href} className="block h-full">{inner}</Link>;
  return <div className="h-full">{inner}</div>;
}

// ─── Filter logic (BL-5.5) ────────────────────────────────────────────────

type FilterTipe = { komersial: boolean; sosial: boolean };

function applyFilterTipe<T extends { pctKomersial: number }>(
  items: T[],
  filter: FilterTipe
): T[] {
  const { komersial, sosial } = filter;
  if (!komersial && !sosial) return items;
  if (komersial && !sosial) return items.filter((p) => p.pctKomersial === 100);
  if (!komersial && sosial) return items.filter((p) => p.pctKomersial === 0);
  return items.filter((p) => p.pctKomersial > 0 && p.pctKomersial < 100);
}

// ─── Homepage ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"investasi" | "wakaf">("investasi");
  const [filterTipe, setFilterTipe] = useState<FilterTipe>({ komersial: false, sosial: false });
  const isLoggedIn = false;

  const steps = activeTab === "investasi" ? INVESTASI_STEPS : WAKAF_STEPS;
  const featuredFiltered = applyFilterTipe(FEATURED_PROJECTS, filterTipe).slice(0, 6);

  return (
    <div className="flex flex-col">

      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Platform Syariah Terverifikasi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Investasi & Wakaf{" "}
              <span className="text-emerald-400">Produktif</span>{" "}
              yang Transparan
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              ACO menghubungkan Anda dengan proyek-proyek nyata berbasis syariah.
              Dana terisolasi, audit terbuka, dan dampak yang terukur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/browse?tab=investasi" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-base transition-all shadow-lg shadow-emerald-500/25">
                Mulai Investasi <ChevronRight size={18} />
              </Link>
              <Link href="/browse?tab=wakaf" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all">
                Wakafkan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Statistik Platform ───────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Platform yang Anda Percaya</h2>
            <p className="text-slate-500">Angka real-time dari platform ACO</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={FolderOpen} label="Proyek Aktif" value={PLATFORM_STATS.activeProjects} />
            <StatCard icon={TrendingUp} label="Total Dana Investasi" value={PLATFORM_STATS.totalInvestment} isCurrency />
            <StatCard icon={Heart} label="Total Wakaf Terkumpul" value={PLATFORM_STATS.totalWaqf} isCurrency />
            <StatCard icon={Users} label="Partisipan Terverifikasi" value={PLATFORM_STATS.participants} />
          </div>
        </div>
      </section>

      {/* ── Section 3: Cara Kerja ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Cara Kerja ACO</h2>
            <p className="text-slate-500">Proses sederhana, transparan, dan sesuai syariah</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveTab("investasi")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "investasi" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
              >
                Investasi
              </button>
              <button
                onClick={() => setActiveTab("wakaf")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "wakaf" ? "bg-white text-amber-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
              >
                Wakaf
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => <StepCard key={step.step} {...step} />)}
          </div>
        </div>
      </section>

      {/* ── Section 4: Proyek & Program Unggulan ────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Proyek & Program Unggulan</h2>
              <p className="text-slate-500">Pilihan terbaik yang dikurasi oleh tim ACO</p>
            </div>
            <Link href="/browse" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors shrink-0">
              Lihat Semua Proyek <ChevronRight size={16} />
            </Link>
          </div>

          {/* Filter tipe proyek */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm text-slate-500 font-medium">Filter:</span>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterTipe.komersial}
                onChange={(e) => setFilterTipe((f) => ({ ...f, komersial: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-300 accent-emerald-600"
              />
              <span className="text-sm font-medium text-slate-700">Komersial</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterTipe.sosial}
                onChange={(e) => setFilterTipe((f) => ({ ...f, sosial: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-300 accent-amber-500"
              />
              <span className="text-sm font-medium text-slate-700">Sosial</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            </label>
            {(filterTipe.komersial || filterTipe.sosial) && (
              <button
                onClick={() => setFilterTipe({ komersial: false, sosial: false })}
                className="text-xs text-slate-400 hover:text-slate-600 underline ml-1"
              >
                Reset
              </button>
            )}
          </div>

          {featuredFiltered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredFiltered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              Tidak ada proyek unggulan yang sesuai filter.
            </div>
          )}
        </div>
      </section>

      {/* ── Section 5: Keunggulan ACO ────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Mengapa Memilih ACO?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Dibangun di atas prinsip syariah yang nyata, bukan sekadar label.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((adv) => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className={`p-6 rounded-2xl border ${COLOR_MAP[adv.color]} flex flex-col gap-4`}>
                  <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                    <Icon size={22} className={ICON_COLOR_MAP[adv.color]} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base mb-1.5">{adv.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA Penutup ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Berkontribusi untuk Umat?</h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan partisipan yang telah mempercayakan investasi dan wakaf produktif mereka kepada ACO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold text-base hover:bg-emerald-50 transition-all shadow-lg">
                Ke Dashboard Saya <ChevronRight size={18} />
              </Link>
            ) : (
              <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold text-base hover:bg-emerald-50 transition-all shadow-lg">
                Daftar Sekarang — Gratis <ChevronRight size={18} />
              </Link>
            )}
            <Link href="/browse" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base transition-all">
              Browse Proyek
            </Link>
          </div>
          <p className="text-emerald-300 text-sm mt-8">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline hover:text-white">Masuk di sini</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
