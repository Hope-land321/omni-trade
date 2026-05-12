import Link from "next/link";
import { PlatformShell } from "@/components/platform/platform-shell";
import { billingHistory, formatCurrencyCfa, getPlanFromSlug } from "@/lib/content";

export default function DashboardSubscriptionPage() {
  const currentPlan = getPlanFromSlug("pro");

  return (
    <PlatformShell
      actions={
        <Link className="primary-button" href="/register/payment?plan=pro&email=renew@omnitrade.io">
          Renouveler
        </Link>
      }
      role="user"
      subtitle="Vue detaillee du plan actuel, de la prochaine echeance et des paiements precedents."
      title="Mon abonnement"
    >
      <div className="grid gap-lg lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel">
          <p className="font-label-caps text-label-caps text-primary">PLAN ACTUEL</p>
          <h2 className="mt-sm font-h2 text-h2 text-on-surface">{currentPlan.name}</h2>
          <p className="mt-sm max-w-xl text-body-md text-on-surface-variant">{currentPlan.description}</p>
          <div className="mt-lg rounded-xl border border-white/5 bg-white/[0.03] p-md">
            <div className="font-h2 text-h2 text-primary">{formatCurrencyCfa(currentPlan.price)}</div>
            <div className="mt-xs text-body-md text-on-surface-variant">Facturation mensuelle en XOF via KiaPay ou FedaPay.</div>
          </div>
          <ul className="mt-lg space-y-sm">
            {currentPlan.features.map((feature) => (
              <li className="flex items-center gap-xs text-on-surface-variant" key={feature}>
                <span className="h-2 w-2 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel">
          <p className="font-label-caps text-label-caps text-primary">STATUT</p>
          <div className="mt-md rounded-xl border border-green-500/20 bg-green-500/10 p-md text-green-400">
            Actif jusqu&apos;au 7 juin 2026
          </div>
          <div className="mt-lg space-y-sm text-body-md text-on-surface-variant">
            <p>Dernier paiement confirme le 7 mai 2026</p>
            <p>Code d&apos;activation utilise avec succes</p>
            <p>Controle d&apos;acces Telegram en ligne</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="border-b border-white/5 p-md">
          <h2 className="font-h3 text-h3 text-on-surface">Historique complet</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Date
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Libelle
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Montant
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Provider
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {billingHistory.map((row) => (
                <tr key={row.invoice}>
                  <td className="px-md py-md text-on-surface">{row.date}</td>
                  <td className="px-md py-md text-on-surface">{row.label}</td>
                  <td className="px-md py-md text-on-surface">{formatCurrencyCfa(row.amount)}</td>
                  <td className="px-md py-md text-on-surface-variant">{row.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformShell>
  );
}
