"use client";

import { useSearchParams } from "next/navigation";
import { OtpForm } from "@/components/forms/otp-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function LoginTwoFactorPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "trader@omnitrade.io";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-gutter py-xl">
        <div className="absolute left-[-5%] top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-5%] h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />

        <div className="w-full max-w-[480px]">
          <OtpForm
            badgeLabel="VERIFIE"
            description={`Un code a 6 chiffres a ete envoye sur Telegram pour ${email}.`}
            footerNote="@OmniTrade_Auth_Bot"
            helperHref="#"
            helperLabel="Renvoyer"
            showTimer
            submitLabel="Verifier"
            targetHref="/dashboard"
            title="Verification 2FA"
          />
        </div>
      </main>
      <SiteFooter compact />
    </div>
  );
}
