import Link from "next/link";
import Image from "next/image";
import { type Project } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

export function RasioBar({ pctKomersial }: { pctKomersial: number }) {
  const pctSosial = 100 - pctKomersial;

  if (pctKomersial === 100) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
        <span className="text-xs text-slate-500 shrink-0">100% Komersial</span>
      </div>
    );
  }
  if (pctKomersial === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-amber-400" />
        <span className="text-xs text-slate-500 shrink-0">100% Sosial</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden flex">
        <div
          className="h-full bg-emerald-500 rounded-l-full"
          style={{ width: `${pctKomersial}%` }}
        />
        <div
          className="h-full bg-amber-400 rounded-r-full"
          style={{ width: `${pctSosial}%` }}
        />
      </div>
      <span className="text-xs text-slate-500 shrink-0 whitespace-nowrap">
        {pctKomersial}% · {pctSosial}%
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const pct = Math.round((project.terkumpul / project.targetDana) * 100);
  const isFull = pct >= 100;

  return (
    <Link href={`/browse/${project.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all h-full flex flex-col">
        {/* Thumbnail */}
        <div className="h-40 relative overflow-hidden bg-slate-100">
          <Image
            src={`https://picsum.photos/seed/${project.slug}/600/300`}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {isFull && (
            <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Penuh
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {project.category}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                project.participationType === "Wakaf"
                  ? "bg-amber-50 text-amber-700"
                  : project.participationType === "Investasi & Wakaf"
                  ? "bg-violet-50 text-violet-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {project.participationType}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
            {project.name}
          </h3>

          {/* Rasio */}
          <RasioBar pctKomersial={project.pctKomersial} />

          {/* Progress pendanaan */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>{formatRupiah(project.terkumpul)} terkumpul</span>
              <span className={`font-semibold ${isFull ? "text-emerald-600" : "text-emerald-700"}`}>
                {Math.min(pct, 100)}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  pct >= 80 ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Target: {formatRupiah(project.targetDana)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
