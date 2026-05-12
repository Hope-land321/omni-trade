"use client";

import { useSearchParams } from "next/navigation";
import { OtpForm } from "@/components/forms/otp-form";

export default function RegisterActivationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "user@example.com";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-gutter py-xl">
      <div className="mb-xl w-full max-w-lg">
        <div className="mb-xs flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant">Étape 3 sur 3</span>
          <span className="font-label-caps text-label-caps text-primary">Activation du compte</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-container">
          <div className="h-full w-full bg-primary" />
        </div>
      </div>

      <div className="w-full max-w-xl">
        <OtpForm
          description={`Nous avons envoye un code d'activation a ${email}. Entrez les 6 chiffres pour continuer.`}
          helperHref="#"
          helperLabel="Renvoyer le code"
          submitLabel="Activer mon compte"
          targetHref={`/login?activated=1&email=${encodeURIComponent(email)}`}
          title="Verifiez votre email"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] h-[30%] w-[30%] rounded-full bg-on-primary-fixed-variant/10 blur-[100px]" />
      </div>
    </main>
  );
}
