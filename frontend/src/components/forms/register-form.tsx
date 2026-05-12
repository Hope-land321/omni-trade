"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getPlanFromSlug } from "@/lib/content";
import { MaterialIcon } from "@/components/common/material-icon";

const strengthLabels = ["Faible", "Correct", "Solide", "Fort"];

function getStrengthScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;
  return score;
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = getPlanFromSlug(searchParams.get("plan"));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strengthScore = useMemo(() => getStrengthScore(password), [password]);
  const isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isValid = fullName.trim() && email.trim() && isPasswordValid && passwordsMatch;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      return;
    }

    const params = new URLSearchParams({
      plan: selectedPlan.id,
      email,
      name: fullName,
    });

    router.push(`/register/payment?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-lg rounded-xl border border-primary/20 bg-primary/10 p-md">
        <div className="flex items-start justify-between gap-sm">
          <div>
            <p className="font-label-caps text-label-caps text-primary">Plan sélectionné</p>
            <h2 className="mt-xs font-h3 text-h3 text-on-surface">{selectedPlan.name}</h2>
            <p className="mt-xs text-body-md text-on-surface-variant">{selectedPlan.description}</p>
          </div>
          <Link className="text-label-caps text-primary hover:underline" href="/#pricing">
            Changer
          </Link>
        </div>
      </div>

      <div className="mb-xl">
        <div className="mb-sm flex items-end justify-between">
          <div>
            <span className="mb-xs block font-label-caps text-label-caps text-primary">
              Step 1 of 3
            </span>
            <h1 className="font-h2 text-h2 text-on-surface">Créer votre compte</h1>
          </div>
          <span className="font-data-mono text-data-mono text-on-surface-variant">33% Complete</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-container-highest">
          <div className="h-full w-1/3 rounded-full bg-primary shadow-[0_0_10px_rgba(173,198,255,0.5)]" />
        </div>
      </div>

      <div className="glass-card-strong rounded-xl p-lg">
        <form className="space-y-md" onSubmit={handleSubmit}>
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="full-name">
              Nom complet
            </label>
            <input
              className="w-full rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
              id="full-name"
              name="fullName"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="John Doe"
              value={fullName}
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nom@entreprise.com"
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm pr-12 text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
                id="password"
                name="password"
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
            <div className="pt-xs">
              <div className="mb-xs flex gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      index < strengthScore ? "bg-primary" : "bg-surface-container-highest"
                    }`}
                    key={index}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between gap-sm text-[10px] uppercase tracking-wider">
                <span className={strengthScore >= 2 ? "text-primary" : "text-error"}>
                  {strengthLabels[Math.max(strengthScore - 1, 0)]}
                </span>
                <span className="text-on-surface-variant">Min. 8 caractères, 1 majuscule, 1 chiffre</span>
              </div>
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="confirm-password">
              Confirmer le mot de passe
            </label>
            <input
              className="w-full rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30"
              id="confirm-password"
              name="confirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
            />
          </div>

          {submitted && !isValid ? (
            <div className="rounded-lg border border-error/20 bg-error/10 p-sm text-sm text-error">
              Vérifie le formulaire: nom, email, mot de passe valide et confirmation identique.
            </div>
          ) : null}

          <button className="primary-button w-full justify-center gap-xs py-md" type="submit">
            Continuer
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </button>

          <div className="grid gap-xs text-xs text-on-surface-variant">
            <p className={isPasswordValid ? "text-primary" : ""}>Mot de passe conforme aux critères de sécurité</p>
            <p className={passwordsMatch ? "text-primary" : ""}>Confirmation du mot de passe identique</p>
          </div>

          <p className="text-center text-sm text-on-surface-variant">
            En continuant, vous acceptez nos{" "}
            <Link className="text-primary hover:underline" href="#">
              conditions
            </Link>{" "}
            et notre{" "}
            <Link className="text-primary hover:underline" href="#">
              politique de confidentialité
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
