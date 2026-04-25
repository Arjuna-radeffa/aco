"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useState } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleResend() {
    setResending(true);
    await new Promise((r) => setTimeout(r, 800));
    setResending(false);
    setResent(true);
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <Mail size={30} className="text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Cek Email Anda</h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          Email verifikasi telah dikirim ke
        </p>
        {email && (
          <p className="text-sm font-semibold text-slate-800 bg-slate-50 rounded-lg px-4 py-2 inline-block mb-5">
            {email}
          </p>
        )}
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Klik tautan di email tersebut untuk mengaktifkan akun Anda. Tautan
          berlaku selama <strong>24 jam</strong>.
        </p>

        {/* Steps */}
        <div className="text-left bg-slate-50 rounded-xl p-4 mb-6 space-y-2.5">
          {[
            "Buka inbox email Anda",
            "Cari email dari no-reply@aco.id",
            "Klik tombol \"Verifikasi Email\"",
            "Anda akan diarahkan untuk melengkapi KYC",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600">{step}</p>
            </div>
          ))}
        </div>

        {/* Resend */}
        {resent ? (
          <p className="text-sm text-emerald-600 font-medium mb-4">
            ✓ Email verifikasi berhasil dikirim ulang
          </p>
        ) : (
          <p className="text-sm text-slate-500 mb-4">
            Tidak menerima email?{" "}
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-emerald-600 font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
            >
              {resending && <RefreshCw size={12} className="animate-spin" />}
              {resending ? "Mengirim..." : "Kirim ulang"}
            </button>
          </p>
        )}

        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium"
        >
          Jelajahi proyek sambil menunggu <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
