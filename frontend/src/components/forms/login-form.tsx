"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/common/material-icon";

type LoginFormProps = {
  defaultEmail?: string;
  activated?: boolean;
};

export function LoginForm({ defaultEmail = "", activated = false }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ email });
    router.push(`/login/2fa?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="mb-xl flex flex-col items-center text-center">
        <div className="electric-glow mb-md flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
          <MaterialIcon className="text-4xl text-on-primary" name="account_balance" />
        </div>
        <h1 className="font-h2 text-h2 tracking-tight text-primary">Omni-Trade</h1>
        <p className="text-body-md text-on-surface-variant">
          Accédez à votre cockpit de trading institutionnel.
        </p>
      </div>

      {activated ? (
        <div className="mb-md rounded-xl border border-primary/20 bg-primary/10 p-sm text-sm text-primary">
          Votre compte a été activé. Connectez-vous pour lancer la vérification 2FA.
        </div>
      ) : null}

      <div className="glass-card-strong rounded-xl p-xl">
        <form className="space-y-md" onSubmit={handleSubmit}>
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps uppercase text-on-surface-variant" htmlFor="login-email">
              Email professionnel
            </label>
            <div className="relative">
              <MaterialIcon className="absolute left-md top-1/2 -translate-y-1/2 text-outline" name="mail" />
              <input
                className="w-full rounded-lg border border-outline-variant bg-[#0F172A] py-md pl-12 pr-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
                id="login-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nom@entreprise.com"
                type="email"
                value={email}
              />
            </div>
          </div>

          <div className="space-y-xs">
            <div className="flex items-center justify-between">
              <label className="font-label-caps text-label-caps uppercase text-on-surface-variant" htmlFor="login-password">
                Mot de passe
              </label>
              <Link className="text-label-caps text-primary hover:text-primary-container" href="#">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <MaterialIcon className="absolute left-md top-1/2 -translate-y-1/2 text-outline" name="lock" />
              <input
                className="w-full rounded-lg border border-outline-variant bg-[#0F172A] py-md pl-12 pr-12 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
                id="login-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
              </button>
            </div>
          </div>

          <button className="primary-button w-full justify-center py-md text-body-md" type="submit">
            Se connecter
          </button>

          <div className="rounded-lg border border-white/10 bg-white/5 p-sm text-sm text-on-surface-variant">
            En mode démo, la connexion poursuit vers l&apos;étape 2FA Telegram pour refléter le cahier des charges.
          </div>
        </form>
      </div>

      <p className="mt-xl text-center text-on-surface-variant">
        Nouveau sur la plateforme ?{" "}
        <Link className="font-semibold text-primary hover:underline" href="/register?plan=pro">
          Demander un accès
        </Link>
      </p>
    </div>
  );
}
