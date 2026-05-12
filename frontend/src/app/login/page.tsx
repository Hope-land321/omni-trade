"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/forms/login-form";

const decorativeImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdlePrle-eaWmVjQBPGc50QK-pd7mIx9Vd4xdmiW8_akWSQ9ufFHni2r0ecmY9MwiQ7gBz6S1YGuNBRdRzu7t3o_AFZFIjQ51nd9DwcefKpgy4SgPy_WPgNy1L4ZSi8DaSMkvTQhknRaGc4RT3_AkrTInmjY-pnvGOkCI3uXmIcAd-O0YLI2WGOZ5oxIqbrh93lnmYncfP9vPeDSqnpD_w1wKXv5wYh23Srqefk7Ql0FFrZwzlQwPZmzfX0EytyqOeWkCpoxWEVQ";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const activated = searchParams.get("activated") === "1";

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0A0F1E]" />
        <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-gutter py-xl">
        <LoginForm activated={activated} defaultEmail={email} />
      </main>

      <div className="fixed bottom-12 right-12 hidden h-[320px] w-[320px] overflow-hidden rounded-2xl glass-card opacity-40 lg:block">
        <img alt="Trading desk illustration" className="h-full w-full object-cover" src={decorativeImage} />
      </div>

      <footer className="relative z-10 px-gutter py-md text-center">
        <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant/40">
          © 2026 Omni-Trade Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
