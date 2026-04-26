"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ALL_PROJECTS, type Project } from "@/lib/mock-data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

// ─── Types & constants ────────────────────────────────────────────────────

type TabType = "semua" | "investasi" | "wakaf";
type SortType = "terbaru" | "terlama" | "progress" | "target";
type ProgressFilter = "semua" | "tersedia" | "hampir-penuh";
type FilterTipe = { komersial: boolean; sosial: boolean };

const CATEGORIES = ["Semua", "Properti", "Logistik", "UMKM", "Wakaf Produktif"];

// ─── Filter logic (BL-5.5) ────────────────────────────────────────────────

function applyFilterTipe(projects: Project[], filter: FilterTipe): Project[] {
  const { komersial, sosial } = filter;
  if (!komersial && !sosial) return projects;
  if (komersial && !sosial) return projects.filter((p) => p.pctKomersial === 100);
  if (!komersial && sosial) return projects.filter((p) => p.pctKomersial === 0);
  return projects.filter((p) => p.pctKomersial > 0 && p.pctKomersial < 100);
}

function BrowseContent() {
  const searchParams = useSearchParams();

  // ─── State ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TabType>("semua");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [filterTipe, setFilterTipe] = useState<FilterTipe>({ komersial: false, sosial: false });
  const [progressFilter, setProgressFilter] = useState<ProgressFilter>("semua");
  const [sort, setSort] = useState<SortType>("terbaru");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync tab dari query param (?tab=investasi / ?tab=wakaf)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "investasi") setActiveTab("investasi");
    else if (tab === "wakaf") setActiveTab("wakaf");
  }, [searchParams]);

  // ─── Filtered & sorted results ──────────────────────────────────────────
  const results = useMemo(() => {
    let list = [...ALL_PROJECTS];

    // Tab
    if (activeTab === "investasi") {
      list = list.filter((p) =>
        p.participationType === "Investasi" || p.participationType === "Investasi & Wakaf"
      );
    } else if (activeTab === "wakaf") {
      list = list.filter((p) =>
        p.participationType === "Wakaf" || p.participationType === "Investasi & Wakaf"
      );
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    // Kategori
    if (category !== "Semua") {
      list = list.filter((p) => p.category === category);
    }

    // Filter tipe (BL-5.5)
    list = applyFilterTipe(list, filterTipe);

    // Progress
    if (progressFilter === "tersedia") {
      list = list.filter((p) => p.terkumpul < p.targetDana);
    } else if (progressFilter === "hampir-penuh") {
      list = list.filter((p) => p.terkumpul / p.targetDana >= 0.8 && p.terkumpul < p.targetDana);
    }

    // Sort
    if (sort === "progress") {
      list.sort((a, b) => b.terkumpul / b.targetDana - a.terkumpul / a.targetDana);
    } else if (sort === "target") {
      list.sort((a, b) => b.targetDana - a.targetDana);
    } else if (sort === "terlama") {
      list.sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai));
    } else {
      list.sort((a, b) => b.tanggalMulai.localeCompare(a.tanggalMulai));
    }

    return list;
  }, [activeTab, search, category, filterTipe, progressFilter, sort]);

  const hasActiveFilter =
    filterTipe.komersial || filterTipe.sosial ||
    category !== "Semua" || progressFilter !== "semua" || search.trim();

  function resetFilters() {
    setFilterTipe({ komersial: false, sosial: false });
    setCategory("Semua");
    setProgressFilter("semua");
    setSearch("");
  }

  // ─── Filter panel (shared desktop + mobile) ─────────────────────────────
  const FilterPanel = () => (
    <div className="flex flex-col gap-5">
      {/* Tipe proyek */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tipe Proyek</p>
        <div className="flex flex-col gap-2.5">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterTipe.komersial}
              onChange={(e) => setFilterTipe((f) => ({ ...f, komersial: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 accent-emerald-600"
            />
            <span className="text-sm text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Komersial
            </span>
          </label>
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterTipe.sosial}
              onChange={(e) => setFilterTipe((f) => ({ ...f, sosial: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 accent-amber-500"
            />
            <span className="text-sm text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Sosial
            </span>
          </label>
          {(filterTipe.komersial || filterTipe.sosial) && (
            <div className="text-xs text-slate-400 bg-slate-50 rounded-lg p-2.5 leading-relaxed">
              {filterTipe.komersial && !filterTipe.sosial && "Menampilkan proyek 100% komersial"}
              {!filterTipe.komersial && filterTipe.sosial && "Menampilkan proyek 100% sosial"}
              {filterTipe.komersial && filterTipe.sosial && "Menampilkan proyek campuran"}
            </div>
          )}
        </div>
      </div>

      {/* Kategori */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Kategori</p>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "text-left text-sm px-3 py-2 rounded-lg transition-colors",
                category === cat
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Status Pendanaan</p>
        <div className="flex flex-col gap-1.5">
          {[
            { value: "semua", label: "Semua" },
            { value: "tersedia", label: "Masih Tersedia" },
            { value: "hampir-penuh", label: "Hampir Penuh (>80%)" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setProgressFilter(opt.value as ProgressFilter)}
              className={cn(
                "text-left text-sm px-3 py-2 rounded-lg transition-colors",
                progressFilter === opt.value
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilter && (
        <button
          onClick={resetFilters}
          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1.5 pt-1"
        >
          <X size={14} /> Reset semua filter
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Browse Proyek & Program</h1>
          <p className="text-slate-500">Temukan proyek investasi dan program wakaf yang sesuai untuk Anda</p>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-slate-100 rounded-xl p-1 w-fit">
            {(["semua", "investasi", "wakaf"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all",
                  activeTab === tab
                    ? tab === "wakaf"
                      ? "bg-white text-amber-700 shadow-sm"
                      : "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {tab === "semua" ? "Semua" : tab === "investasi" ? "Investasi" : "Wakaf Uang"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar filter — desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <p className="font-semibold text-slate-900 mb-4">Filter</p>
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Search + sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama proyek atau kata kunci..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <SlidersHorizontal size={16} />
                  Filter
                  {hasActiveFilter && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </button>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortType)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="progress">Progress Tertinggi</option>
                  <option value="target">Target Terbesar</option>
                </select>
              </div>
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{results.length}</span> proyek ditemukan
              </p>
              {hasActiveFilter && (
                <button onClick={resetFilters} className="text-xs text-emerald-600 hover:underline font-medium">
                  Reset filter
                </button>
              )}
            </div>

            {/* Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-slate-300 text-5xl mb-4">🔍</div>
                <p className="text-slate-500 font-medium mb-1">Tidak ada proyek yang sesuai filter Anda.</p>
                <p className="text-sm text-slate-400 mb-4">Coba ubah atau reset filter untuk melihat lebih banyak proyek.</p>
                <button onClick={resetFilters} className="text-sm text-emerald-600 hover:underline font-medium">
                  Reset semua filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="font-semibold text-slate-900">Filter</p>
              <button onClick={() => setShowMobileFilter(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  );
}
