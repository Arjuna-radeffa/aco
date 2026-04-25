"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function validateEmail(value: string) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setEmailError(valid ? "" : "Format email tidak valid");
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Email Terkirim</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Jika alamat email tersebut terdaftar di ACO, Anda akan menerima
            instruksi reset password dalam beberapa menit. Periksa juga folder
            spam jika tidak menerima email.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 font-semibold hover:underline"
          >
            <ArrowLeft size={14} /> Kembali ke Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Mail size={22} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Lupa Password</h1>
          <p className="text-sm text-slate-500">
            Masukkan email akun Anda. Kami akan mengirimkan instruksi untuk
            mengatur ulang password.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="nama@email.com"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                emailError ? "border-red-300 bg-red-50" : "border-slate-200"
              }`}
            />
            {emailError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!email.trim() || loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Mengirim..." : "Kirim Instruksi Reset"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 font-medium"
          >
            <ArrowLeft size={14} /> Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}
