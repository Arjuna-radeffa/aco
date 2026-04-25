import React, { useState, useMemo } from 'react';
import {
  Search, SlidersHorizontal, TrendingUp, X, ChevronRight,
  MapPin, Users, Building2, Heart, CheckSquare, Square
} from 'lucide-react';
import { mockProjects } from '../../data/projectMockData';
import { Project } from '../../types/projectTypes';

interface BrowsePageProps {
  currentUser: any;
  onViewDetail: (id: string) => void;
  onLoginClick: () => void;
  onKycClick: () => void;
}

type SortOption = 'terbaru' | 'progress-tertinggi' | 'target-terbesar';
type CategoryFilter = 'Semua' | 'Properti Komersial' | 'Logistik' | 'Wakaf Sosial' | 'Kesehatan Sosial' | 'Hybrid Housing' | 'Healthcare & Education';

const formatRp = (n: number) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${n.toLocaleString('id-ID')}`;
};

const BrowsePage: React.FC<BrowsePageProps> = ({
  currentUser, onViewDetail, onLoginClick, onKycClick
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('Semua');
  const [sort, setSort] = useState<SortOption>('terbaru');
  const [filterCommercial, setFilterCommercial] = useState(true);
  const [filterSocial, setFilterSocial] = useState(true);

  const categories: CategoryFilter[] = [
    'Semua', 'Properti Komersial', 'Logistik', 'Wakaf Sosial',
    'Kesehatan Sosial', 'Hybrid Housing', 'Healthcare & Education'
  ];

  const filtered = useMemo(() => {
    let list = [...mockProjects];

    // === Checkbox filter logic ===
    // Commercial checked, Social unchecked → allocation.commercial === 100
    // Commercial unchecked, Social checked → allocation.social === 100
    // Both checked → mixed (neither 0% nor 100%)
    // Both unchecked → show nothing (edge case, show all)
    if (filterCommercial && !filterSocial) {
      list = list.filter(p => p.metadata.allocation.commercial === 100);
    } else if (!filterCommercial && filterSocial) {
      list = list.filter(p => p.metadata.allocation.social === 100);
    } else if (filterCommercial && filterSocial) {
      list = list.filter(
        p => p.metadata.allocation.commercial > 0 && p.metadata.allocation.social > 0
      );
    }
    // Both unchecked: show nothing (return empty)
    if (!filterCommercial && !filterSocial) return [];

    // Category filter
    if (category !== 'Semua') {
      list = list.filter(p => p.category === category);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.location.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === 'progress-tertinggi') {
      list.sort((a, b) =>
        (b.currentFunding / b.targetFunding) - (a.currentFunding / a.targetFunding)
      );
    } else if (sort === 'target-terbesar') {
      list.sort((a, b) => b.targetFunding - a.targetFunding);
    }

    return list;
  }, [filterCommercial, filterSocial, category, search, sort]);

  const isKycPending = currentUser && currentUser.kycVerified === false;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* === HEADER === */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Katalog Proyek</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {filtered.length} proyek tersedia
            </p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari proyek, lokasi, kategori..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-700">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* === KYC BANNER === */}
        {isKycPending && (
          <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-amber-800">
              ⚠️ Lengkapi verifikasi identitas Anda untuk mulai berpartisipasi.
            </p>
            <button
              onClick={onKycClick}
              className="shrink-0 px-5 py-2.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all"
            >
              Verifikasi Sekarang
            </button>
          </div>
        )}

        {/* === FILTER BAR === */}
        <div className="flex flex-wrap gap-4 items-center mb-10">
          {/* Checkbox Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl p-1.5">
            <button
              onClick={() => setFilterCommercial(!filterCommercial)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filterCommercial
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {filterCommercial
                ? <CheckSquare size={16} />
                : <Square size={16} />}
              <Building2 size={14} />
              Commercial
            </button>
            <button
              onClick={() => setFilterSocial(!filterSocial)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filterSocial
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {filterSocial
                ? <CheckSquare size={16} />
                : <Square size={16} />}
              <Heart size={14} />
              Social
            </button>
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value as CategoryFilter)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-400 cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-400 cursor-pointer"
            >
              <option value="terbaru">Terbaru</option>
              <option value="progress-tertinggi">Progress Tertinggi</option>
              <option value="target-terbesar">Target Dana Terbesar</option>
            </select>
          </div>
        </div>

        {/* === FILTER PILLS INFO === */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Menampilkan:</span>
          {filterCommercial && !filterSocial && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black">
              Proyek Komersial Murni (100%)
            </span>
          )}
          {!filterCommercial && filterSocial && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black">
              Proyek Sosial/Wakaf Murni (100%)
            </span>
          )}
          {filterCommercial && filterSocial && (
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-black">
              Proyek Hybrid (Komersial + Sosial)
            </span>
          )}
          {!filterCommercial && !filterSocial && (
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-black">
              Tidak ada filter aktif
            </span>
          )}
        </div>

        {/* === PROJECT GRID === */}
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-400 mb-2">Tidak ada proyek ditemukan</h3>
            <p className="text-slate-400 text-sm">
              {!filterCommercial && !filterSocial
                ? 'Pilih minimal satu filter (Commercial atau Social).'
                : 'Tidak ada proyek yang sesuai dengan filter Anda.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetail={onViewDetail}
                currentUser={currentUser}
                onLoginClick={onLoginClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// === PROJECT CARD ===
const ProjectCard: React.FC<{
  project: Project;
  onViewDetail: (id: string) => void;
  currentUser: any;
  onLoginClick: () => void;
}> = ({ project, onViewDetail, currentUser, onLoginClick }) => {
  const percent = Math.min(100, (project.currentFunding / project.targetFunding) * 100);
  const isCommercialOnly = project.metadata.allocation.commercial === 100;
  const isSocialOnly = project.metadata.allocation.social === 100;
  const isHybrid = !isCommercialOnly && !isSocialOnly;

  const progressColor = percent >= 80
    ? 'from-emerald-500 to-emerald-400'
    : percent >= 50
    ? 'from-indigo-600 to-indigo-400'
    : 'from-slate-400 to-slate-300';

  return (
    <div
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onViewDetail(project.id)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

        {/* Type badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isCommercialOnly && (
            <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Commercial
            </span>
          )}
          {isSocialOnly && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Sosial / Wakaf
            </span>
          )}
          {isHybrid && (
            <>
              <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                {project.metadata.allocation.commercial}% Com
              </span>
              <span className="px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                {project.metadata.allocation.social}% Sos
              </span>
            </>
          )}
        </div>

        {/* Progress badge */}
        {percent >= 80 && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
              Hampir Penuh
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-indigo-700 transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-5">
          <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {project.investorCount} partisipan</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
            <span className="text-slate-900">{formatRp(project.currentFunding)}</span>
            <span className="text-slate-400">dari {formatRp(project.targetFunding)}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-1000`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] font-black text-indigo-600">{percent.toFixed(1)}% terpenuhi</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={e => { e.stopPropagation(); onViewDetail(project.id); }}
          className="w-full mt-3 py-3.5 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
        >
          Lihat Detail <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default BrowsePage;
