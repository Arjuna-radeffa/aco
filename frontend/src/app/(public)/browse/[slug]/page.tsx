import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Tag, TrendingUp, Heart, ArrowLeft, FileText, Users } from "lucide-react";
import { ALL_PROJECTS } from "@/lib/mock-data";
import { RasioBar } from "@/components/ui/ProjectCard";
import { formatRupiah } from "@/lib/utils";

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const pct = Math.min(Math.round((project.terkumpul / project.targetDana) * 100), 100);
  const isFull = project.terkumpul >= project.targetDana;
  const isWaqf = project.participationType === "Wakaf";
  const isInvestasi = project.participationType === "Investasi";
  const isBoth = project.participationType === "Investasi & Wakaf";

  const RAB_MOCK = [
    { item: "Tanah / Lahan", kategori: "Aset", nominal: project.targetDana * 0.4 },
    { item: "Konstruksi & Material", kategori: "Konstruksi", nominal: project.targetDana * 0.35 },
    { item: "Perizinan & Legal", kategori: "Legal", nominal: project.targetDana * 0.05 },
    { item: "Operasional Awal", kategori: "Operasional", nominal: project.targetDana * 0.1 },
    { item: "Cadangan & Kontingensi", kategori: "Cadangan", nominal: project.targetDana * 0.1 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero image */}
      <div className="relative h-64 md:h-80 bg-slate-200">
        <Image
          src={`https://picsum.photos/seed/${project.slug}/1200/500`}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={14} /> Kembali
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Card header */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                <Link href="/" className="hover:text-slate-600">Beranda</Link>
                <ChevronRight size={14} />
                <Link href="/browse" className="hover:text-slate-600">Browse</Link>
                <ChevronRight size={14} />
                <span className="text-slate-600 truncate">{project.name}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                  <Tag size={11} /> {project.category}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  isWaqf ? "bg-amber-50 text-amber-700" :
                  isBoth ? "bg-violet-50 text-violet-700" :
                  "bg-emerald-50 text-emerald-700"
                }`}>
                  {project.participationType}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                  <Calendar size={11} />
                  Mulai {new Date(project.tanggalMulai).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{project.name}</h1>

              {/* Rasio komersial/sosial */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Rasio Komersial vs Sosial</p>
                <RasioBar pctKomersial={project.pctKomersial} />
              </div>

              <p className="text-slate-600 leading-relaxed">{project.deskripsi}</p>
            </div>

            {/* Skema partisipasi */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" /> Skema Partisipasi
              </h2>
              <p className="text-slate-600 leading-relaxed">{project.skemaPartisipasi}</p>

              {!isWaqf && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-xs font-semibold text-amber-800 mb-1">⚠ Pernyataan Risiko</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Investasi di platform ACO tidak dijamin oleh pemerintah atau lembaga penjamin manapun.
                    Tidak ada jaminan minimum recovery dari ACO jika proyek gagal. Investor menanggung risiko investasi secara penuh.
                  </p>
                </div>
              )}

              {!isInvestasi && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-xs font-semibold text-slate-700 mb-1">ℹ Ketentuan Wakaf</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dana yang telah diwakafkan bersifat permanen dan tidak dapat ditarik kembali dalam kondisi apapun.
                    Minimal 90% hasil pengelolaan disalurkan kepada mustahiq atau program sosial yang ditentukan.
                  </p>
                </div>
              )}
            </div>

            {/* RAB */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <FileText size={18} className="text-emerald-600" /> RAB & Penggunaan Dana
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2.5 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</th>
                      <th className="text-left py-2.5 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                      <th className="text-right py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {RAB_MOCK.map((row) => (
                      <tr key={row.item} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4 text-slate-800 font-medium">{row.item}</td>
                        <td className="py-3 pr-4">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{row.kategori}</span>
                        </td>
                        <td className="py-3 text-right text-slate-800 font-medium tabular-nums">{formatRupiah(row.nominal)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-200 font-bold">
                      <td className="py-3 pr-4 text-slate-900">Total</td>
                      <td />
                      <td className="py-3 text-right text-emerald-700 tabular-nums">{formatRupiah(project.targetDana)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar sticky */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-500">Dana terkumpul</span>
                  <span className="text-lg font-bold text-emerald-700">{pct}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{formatRupiah(project.terkumpul)}</span>
                  <span>dari {formatRupiah(project.targetDana)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
                <Users size={14} />
                <span>Terbuka untuk partisipasi publik</span>
              </div>

              {/* CTA buttons */}
              {isFull ? (
                <div className="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold text-center">
                  Pendanaan Penuh
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {(isInvestasi || isBoth) && (
                    <Link
                      href={`/invest/${project.id}`}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <TrendingUp size={16} /> Investasi Sekarang
                    </Link>
                  )}
                  {(isWaqf || isBoth) && (
                    <Link
                      href={`/waqf/${project.id}`}
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart size={16} /> Wakaf Uang
                    </Link>
                  )}
                </div>
              )}

              <p className="text-xs text-slate-400 text-center mt-3">
                Perlu verifikasi KYC untuk berpartisipasi
              </p>
            </div>

            {/* Info tambahan */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-emerald-800 mb-2">Dana Anda Terlindungi</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Seluruh dana dikelola di rekening terisolasi dan diaudit secara berkala.
                Anda dapat menarik dana investasi selama belum disalurkan ke proyek.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
