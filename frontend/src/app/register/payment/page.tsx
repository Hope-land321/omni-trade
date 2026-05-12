"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MaterialIcon } from "@/components/common/material-icon";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { formatCurrencyCfa, getPlanFromSlug, paymentProviders } from "@/lib/content";

export default function RegisterPaymentPage() {
  const searchParams = useSearchParams();
  const selectedPlan = getPlanFromSlug(searchParams.get("plan"));
  const email = searchParams.get("email") ?? "user@example.com";
  const name = searchParams.get("name") ?? "Trader";

  return (
    <div className="min-h-screen">
      <SiteHeader stepLabel="Step 2 of 3" />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-gutter py-xl">
        <div className="grid w-full max-w-6xl gap-lg lg:grid-cols-12">
          <div className="space-y-xl lg:col-span-5">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface">Complete your subscription</h1>
              <p className="mt-md text-body-lg text-on-surface-variant">
                Bonjour {name}, il ne reste plus que le choix du paiement pour ouvrir
                l&apos;accès Telegram au bot.
              </p>
            </div>

            <div className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary">
                  <MaterialIcon className="text-[20px]" filled name="check" />
                </div>
                <div className="h-[2px] w-8 bg-primary" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                  2
                </div>
                <div className="h-[2px] w-8 bg-surface-variant" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">
                  3
                </div>
              </div>
              <div className="flex gap-lg text-label-caps uppercase">
                <span className="text-primary">Account</span>
                <span className="text-primary">Payment</span>
                <span className="text-on-surface-variant">Launch</span>
              </div>
            </div>

            <div className="surface-panel">
              <div className="mb-sm flex items-start justify-between gap-sm">
                <span className="rounded bg-tertiary-container/30 px-xs py-1 font-label-caps text-label-caps text-on-tertiary-container">
                  Selected Plan
                </span>
                <Link className="font-label-caps text-label-caps text-primary hover:underline" href="/#pricing">
                  Change
                </Link>
              </div>
              <div className="flex items-baseline gap-xs">
                <span className="font-h2 text-h2 text-primary">{formatCurrencyCfa(selectedPlan.price).replace(" FCFA", "")}</span>
                <span className="font-data-mono text-data-mono uppercase text-on-surface-variant">
                  FCFA / {selectedPlan.cadence}
                </span>
              </div>
              <p className="mt-sm text-body-md text-on-surface-variant">
                Email de livraison du code d&apos;activation: <span className="text-on-surface">{email}</span>
              </p>
              <div className="mt-md space-y-xs border-t border-white/5 pt-md">
                {selectedPlan.features.map((feature) => (
                  <div className="flex items-center gap-xs text-on-surface-variant" key={feature}>
                    <MaterialIcon className="text-[18px] text-primary" filled name="verified" />
                    <span className="text-body-md">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card-strong relative overflow-hidden rounded-xl p-xl">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
              <div className="relative z-10">
                <h2 className="font-h3 text-h3 text-on-surface">Choose payment method</h2>
                <div className="mt-xl space-y-md">
                  {paymentProviders.map((provider) => {
                    const params = new URLSearchParams({
                      plan: selectedPlan.id,
                      email,
                      provider: provider.id,
                    });

                    return (
                      <Link
                        className="glass-card group flex items-center justify-between rounded-lg border border-white/10 p-md transition-all duration-200 hover:border-primary/50"
                        href={`/register/activation?${params.toString()}`}
                        key={provider.id}
                      >
                        <div className="flex items-center gap-md">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-lg px-xs font-h3 text-body-lg ${provider.surfaceClassName}`}
                          >
                            {provider.name.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-h3 text-body-lg text-on-surface">{provider.name}</div>
                            <div className="text-body-md text-on-surface-variant">{provider.description}</div>
                          </div>
                        </div>
                        <MaterialIcon
                          className="text-on-surface-variant transition-colors group-hover:text-primary"
                          name="arrow_forward_ios"
                        />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-xl flex items-center justify-center gap-sm border-t border-white/5 pt-xl text-on-surface-variant">
                  <MaterialIcon className="text-primary" filled name="security" />
                  <span className="font-label-caps text-label-caps uppercase tracking-widest">
                    Chiffrement SSL 256-bit
                  </span>
                </div>

                <div className="mt-lg text-center">
                  <Link className="inline-flex items-center gap-xs text-body-md text-on-surface-variant hover:text-on-surface" href="/register">
                    <MaterialIcon className="text-[18px]" name="arrow_back" />
                    Return to profile setup
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-lg grid grid-cols-3 gap-md">
              <div className="p-sm text-center">
                <div className="mb-1 font-data-mono text-data-mono text-primary">99.9%</div>
                <div className="font-label-caps text-[10px] uppercase text-on-surface-variant">Uptime</div>
              </div>
              <div className="p-sm text-center">
                <div className="mb-1 font-data-mono text-data-mono text-primary">24/7</div>
                <div className="font-label-caps text-[10px] uppercase text-on-surface-variant">Support</div>
              </div>
              <div className="p-sm text-center">
                <div className="mb-1 font-data-mono text-data-mono text-primary">PCI-DSS</div>
                <div className="font-label-caps text-[10px] uppercase text-on-surface-variant">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter compact />
    </div>
  );
}
