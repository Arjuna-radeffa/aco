"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, Lock } from "lucide-react";

type FormState = {
  error?: string;
  locked?: boolean;
  lockMinutes?: number;
};

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formState, setFormState] = useState<FormState>({});
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDisabled = !email.trim() || !password.trim() || locked || loading;

  function validateEmail(value: string) {
    if (!value) { setEmailError(""); return; }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setEmailError(valid ? "" : "Format email tidak valid");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isDisabled) return;

    setLoading(true);
    setFormState({});

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    // Mock: always fail for demo (replace with real auth)
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= MAX_ATTEMPTS) {
      setLocked(true);
      setFormState({ locked: true, lockMinutes: LOCK_MINUTES });
      setTimeout(() => {
        setLocked(false);
        setAttempts(0);
        setFormState({});
      }, LOCK_MINUTES * 60 * 1000);
    } else {
      setFormState({ error: "Email atau password tidak sesuai." });
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Lock size={22} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Masuk ke ACO</h1>
          <p className="text-sm text-slate-500">Selamat datang kembali</p>
        </div>

        {/* Error / Locked banner */}
        {formState.locked && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">
              Terlalu banyak percobaan gagal. Akun dikunci sementara selama{" "}
              <strong>{LOCK_MINUTES} menit</strong>. Silakan coba lagi nanti.
            </p>
          </div>
        )}
        {formState.error && !formState.locked && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{formState.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="nama@email.com"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                emailError ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
              }`}
            />
            {emailError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-600 hover:underline font-medium"
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
