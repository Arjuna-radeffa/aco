"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, UserPlus, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldErrors = {
  nama?: string;
  email?: string;
  hp?: string;
  password?: string;
  konfirmasi?: string;
};

function validatePassword(pw: string): string {
  if (pw.length < 8) return "Password minimal 8 karakter";
  if (!/[a-zA-Z]/.test(pw)) return "Password harus mengandung huruf";
  if (!/[0-9]/.test(pw)) return "Password harus mengandung angka";
  return "";
}

function validateHP(hp: string): string {
  const cleaned = hp.replace(/\s/g, "");
  if (!/^(\+62|08)\d{8,12}$/.test(cleaned)) return "Format nomor HP tidak valid (contoh: 08123456789)";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();

  const [fields, setFields] = useState({ nama: "", email: "", hp: "", password: "", konfirmasi: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set(field: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validateField(field: keyof typeof fields) {
    const v = fields[field];
    let msg = "";
    if (field === "nama") {
      if (v.trim().length < 3) msg = "Nama minimal 3 karakter";
    } else if (field === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) msg = "Format email tidak valid";
    } else if (field === "hp") {
      msg = validateHP(v);
    } else if (field === "password") {
      msg = validatePassword(v);
    } else if (field === "konfirmasi") {
      if (v !== fields.password) msg = "Password tidak cocok";
    }
    setErrors((e) => ({ ...e, [field]: msg }));
    return msg;
  }

  function validateAll(): boolean {
    const newErrors: FieldErrors = {
      nama: fields.nama.trim().length < 3 ? "Nama minimal 3 karakter" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ? "Format email tidak valid" : "",
      hp: validateHP(fields.hp),
      password: validatePassword(fields.password),
      konfirmasi: fields.konfirmasi !== fields.password ? "Password tidak cocok" : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }

  const passwordStrength = (() => {
    const p = fields.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^a-zA-Z0-9]/.test(p)) score++;
    if (score <= 2) return { label: "Lemah", color: "bg-red-400", pct: "33%" };
    if (score <= 3) return { label: "Sedang", color: "bg-amber-400", pct: "66%" };
    return { label: "Kuat", color: "bg-emerald-500", pct: "100%" };
  })();

  const isDisabled = !agree || loading || Object.values(fields).some((v) => !v.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll() || !agree) return;

    setLoading(true);
    setSubmitError("");
    await new Promise((r) => setTimeout(r, 1000));

    // Mock: simulate success, redirect to verify-email
    router.push(`/verify-email?email=${encodeURIComponent(fields.email)}`);
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <UserPlus size={22} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Buat Akun ACO</h1>
          <p className="text-sm text-slate-500">Mulai perjalanan investasi & wakaf syariah Anda</p>
        </div>

        {submitError && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              value={fields.nama}
              onChange={(e) => set("nama", e.target.value)}
              onBlur={() => validateField("nama")}
              placeholder="Sesuai identitas resmi"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
                errors.nama ? "border-red-300 bg-red-50" : "border-slate-200"
              )}
            />
            {errors.nama && <FieldError msg={errors.nama} />}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => validateField("email")}
              placeholder="nama@email.com"
              autoComplete="email"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
                errors.email ? "border-red-300 bg-red-50" : "border-slate-200"
              )}
            />
            {errors.email && <FieldError msg={errors.email} />}
          </div>

          {/* HP */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nomor HP</label>
            <input
              type="tel"
              value={fields.hp}
              onChange={(e) => set("hp", e.target.value)}
              onBlur={() => validateField("hp")}
              placeholder="08123456789"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
                errors.hp ? "border-red-300 bg-red-50" : "border-slate-200"
              )}
            />
            {errors.hp && <FieldError msg={errors.hp} />}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={fields.password}
                onChange={(e) => set("password", e.target.value)}
                onBlur={() => validateField("password")}
                placeholder="Min. 8 karakter, huruf & angka"
                autoComplete="new-password"
                className={cn(
                  "w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
                  errors.password ? "border-red-300 bg-red-50" : "border-slate-200"
                )}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength bar */}
            {passwordStrength && (
              <div className="mt-2">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${passwordStrength.color}`}
                    style={{ width: passwordStrength.pct }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Kekuatan password: <span className="font-medium">{passwordStrength.label}</span></p>
              </div>
            )}
            {errors.password && <FieldError msg={errors.password} />}
          </div>

          {/* Konfirmasi password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showKonfirmasi ? "text" : "password"}
                value={fields.konfirmasi}
                onChange={(e) => set("konfirmasi", e.target.value)}
                onBlur={() => validateField("konfirmasi")}
                placeholder="Ulangi password"
                autoComplete="new-password"
                className={cn(
                  "w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors",
                  errors.konfirmasi ? "border-red-300 bg-red-50" :
                  fields.konfirmasi && fields.konfirmasi === fields.password ? "border-emerald-300 bg-emerald-50/30" :
                  "border-slate-200"
                )}
              />
              <button type="button" onClick={() => setShowKonfirmasi((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                {showKonfirmasi ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {fields.konfirmasi && fields.konfirmasi === fields.password && (
                <CheckCircle size={16} className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500" />
              )}
            </div>
            {errors.konfirmasi && <FieldError msg={errors.konfirmasi} />}
          </div>

          {/* Persetujuan */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-emerald-600 shrink-0"
            />
            <span className="text-sm text-slate-600 leading-relaxed">
              Saya menyetujui{" "}
              <Link href="/terms" className="text-emerald-600 hover:underline font-medium" target="_blank">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-medium" target="_blank">
                Kebijakan Privasi
              </Link>{" "}
              ACO
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-1"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-emerald-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle size={12} /> {msg}
    </p>
  );
}
