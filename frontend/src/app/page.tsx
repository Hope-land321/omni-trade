import Link from "next/link";
import { MaterialIcon } from "@/components/common/material-icon";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { faqItems, featureCards, plans } from "@/lib/content";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCayZt9WD2soyNyG9I62nwIY7Mgy2Re_ep7E7HePjwHDgtkZz2p2JDQ9lX0c4_ioWInyJEr2HMAylzRgWbWbUg8sD5yulNo2nPz6EHTjtamzm2KwQep40-3RGhqDqpQ8gNTJAGbuQhLhE7LS2Sz-B-8SHesQf0mKrHEiJbK6bkj9pqrgvr8YdVUwAPVB8At6d4C7RqJ7csxYhHdisuurXDrZczvHMHuX1zwtvN1xNJJXhe1IlKc8e2WWgw5BER0E9fk-T8vqEdHRA";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-gutter pb-24 pt-xl">
          <div className="pointer-events-none absolute inset-0 bg-omni-hero" />
          <div className="relative mx-auto flex max-w-container-max flex-col items-center text-center">
            <div className="mb-md inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-sm py-base text-primary">
              <MaterialIcon className="mr-xs text-[16px]" name="smart_toy" />
              <span className="font-label-caps text-label-caps">PRO TRADING IA</span>
            </div>
            <h1 className="max-w-4xl font-h1 text-h1">
              Automatisez vos investissements avec l&apos;IA
            </h1>
            <p className="mt-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              Votre bot de trading intelligent disponible 24h/24 sur Telegram. Performance
              institutionnelle, simplicité grand public et accès contrôlé par abonnement.
            </p>
            <div className="mt-xl flex flex-col gap-md sm:flex-row">
              <Link className="primary-button px-xl py-md text-h3" href="#pricing">
                Découvrir nos plans
              </Link>
              <Link className="secondary-button px-xl py-md" href="/register?plan=pro">
                Commencer avec le plan Pro
              </Link>
            </div>

            <div className="glass-card mt-24 w-full max-w-5xl overflow-hidden rounded-xl border-t border-white/20">
              <div className="flex items-center justify-between border-b border-white/5 p-md">
                <div className="flex gap-xs">
                  <div className="h-3 w-3 rounded-full bg-error/40" />
                  <div className="h-3 w-3 rounded-full bg-tertiary/40" />
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                </div>
                <div className="font-data-mono text-data-mono text-primary">
                  LIVE MARKET ANALYSIS ENGINE
                </div>
              </div>
              <img
                alt="Omni-Trade analytics cockpit"
                className="h-[320px] w-full object-cover opacity-80 md:h-[420px]"
                src={heroImage}
              />
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-xl" id="features">
          <div className="mx-auto max-w-container-max px-gutter">
            <div className="mb-xl">
              <span className="mb-xs block font-label-caps text-label-caps text-primary">
                FONCTIONNALITÉS CLÉS
              </span>
              <h2 className="font-h2 text-h2">Puissance et simplicité</h2>
            </div>

            <div className="grid grid-cols-1 gap-md md:grid-cols-12">
              {featureCards.map((feature, index) => {
                const layoutClassName =
                  feature.tone === "large"
                    ? "md:col-span-8"
                    : feature.tone === "compact"
                      ? "md:col-span-4"
                      : "md:col-span-12";

                return (
                  <div className={`glass-card rounded-xl p-xl ${layoutClassName}`} key={feature.title}>
                    <div className="flex h-full flex-col justify-between gap-lg">
                      <div>
                        <MaterialIcon className="mb-md text-[48px] text-primary" name={feature.icon} />
                        <h3 className="mb-sm font-h3 text-h3 text-white">{feature.title}</h3>
                        <p className="max-w-2xl text-body-md text-on-surface-variant">
                          {feature.description}
                        </p>
                      </div>
                      {index === 2 ? (
                        <div className="rounded-lg border border-white/5 bg-surface/50 p-md font-data-mono text-data-mono">
                          <div className="mb-xs text-primary">[@OmniTrade_Bot]</div>
                          <div className="mb-xs text-on-surface">Trade execute: BTC/USDT</div>
                          <div className="mb-xs text-on-surface-variant">
                            Entree: $64,200 | TP: $66,500
                          </div>
                          <div className="text-primary-fixed-dim">Statut: En cours (+2.4%)</div>
                        </div>
                      ) : (
                        <div className="font-data-mono text-data-mono text-primary/60">
                          {index === 0 ? "SYSTEM STATUS: OPTIMIZED" : "EXECUTION LAYER: LIVE"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-xl" id="pricing">
          <div className="mx-auto max-w-container-max px-gutter">
            <div className="mb-xl text-center">
              <h2 className="font-h2 text-h2">Tarification flexible</h2>
              <p className="mx-auto mt-sm max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                Plusieurs plans pour l&apos;ancrage marketing, avec le plan Pro placé au centre du tunnel
                de conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-md md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  className={`glass-card relative flex flex-col rounded-xl p-xl ${
                    plan.recommended ? "scale-[1.02] border-t-2 border-primary" : ""
                  }`}
                  key={plan.id}
                >
                  {plan.recommended ? (
                    <div className="absolute -inset-4 -z-10 rounded-full bg-primary/10 opacity-60 blur-3xl" />
                  ) : null}
                  <div className="mb-md flex items-center justify-between">
                    <span
                      className={`rounded-full px-sm py-xs font-label-caps text-label-caps ${
                        plan.recommended
                          ? "bg-primary/10 text-primary"
                          : plan.id === "elite"
                            ? "bg-tertiary/20 text-on-tertiary-fixed"
                            : "bg-white/5 text-on-surface-variant"
                      }`}
                    >
                      {plan.label}
                    </span>
                    {plan.recommended ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Recommande
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-xl">
                    <span className="font-h2 text-h2 text-white">
                      {new Intl.NumberFormat("fr-FR").format(plan.price)}
                    </span>{" "}
                    <span className="font-body-md text-on-surface-variant">FCFA /{plan.cadence}</span>
                    <p className="mt-sm text-body-md text-on-surface-variant">{plan.description}</p>
                  </div>

                  <ul className="mb-xl flex-grow space-y-md text-left">
                    {plan.features.map((feature) => (
                      <li className="flex items-center text-body-md text-on-surface-variant" key={feature}>
                        <MaterialIcon className="mr-sm text-primary" name="check_circle" filled />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    className={plan.recommended ? "primary-button w-full justify-center py-md" : "secondary-button w-full justify-center py-md"}
                    href={`/register?plan=${plan.id}`}
                  >
                    Demarrer maintenant
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-xl text-center font-label-caps text-label-caps text-on-surface-variant">
              Tous les plans sont sans engagement, annulez a tout moment.
            </p>
          </div>
        </section>

        <section className="bg-surface-container-low py-xl" id="faq">
          <div className="mx-auto max-w-container-max px-gutter">
            <div className="mb-xl">
              <span className="mb-xs block font-label-caps text-label-caps text-primary">FAQ</span>
              <h2 className="font-h2 text-h2">Questions frequentes</h2>
            </div>

            <div className="grid gap-md">
              {faqItems.map((item) => (
                <details className="glass-card rounded-xl p-lg" key={item.question}>
                  <summary className="cursor-pointer list-none font-h3 text-h3 text-on-surface">
                    {item.question}
                  </summary>
                  <p className="mt-sm max-w-3xl text-body-md text-on-surface-variant">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
