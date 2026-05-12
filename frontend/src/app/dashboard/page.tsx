import Link from "next/link";
import { MaterialIcon } from "@/components/common/material-icon";
import { PlatformShell } from "@/components/platform/platform-shell";
import { billingHistory, dashboardMetrics, formatCurrencyCfa } from "@/lib/content";

export default function DashboardPage() {
  return (
    <PlatformShell
      actions={
        <>
          <button className="secondary-button !px-sm !py-xs">
            <MaterialIcon name="notifications" />
          </button>
          <Link className="primary-button" href="https://t.me/OmniTradeBot">
            Rejoindre Telegram
          </Link>
        </>
      }
      role="user"
      subtitle="Retrouve ici l'etat de ton abonnement, l'acces au bot et l'historique des paiements."
      title="Client Dashboard"
    >
      <div className="status-banner-active flex flex-col items-start justify-between gap-md rounded-xl p-md md:flex-row md:items-center">
        <div className="flex items-center gap-sm">
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
          <p className="text-body-md text-on-surface">
            <span className="font-semibold text-green-400">Bot actif</span> — abonnement valide jusqu&apos;au 7 juin 2026
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-xs rounded-lg bg-[#24A1DE] px-md py-sm font-label-caps text-label-caps text-white transition-colors hover:bg-[#24A1DE]/90"
          href="https://t.me/OmniTradeBot"
        >
          <MaterialIcon className="text-[20px]" name="send" />
          ACCEDER AU BOT
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        {dashboardMetrics.map((metric) => (
          <div className="metric-card relative overflow-hidden" key={metric.label}>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-transparent opacity-50" />
            <div className="mb-sm flex items-start justify-between">
              <MaterialIcon className="text-primary-container" name={metric.icon} />
              {metric.chip ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-primary">
                  {metric.chip}
                </span>
              ) : null}
            </div>
            <div className="mb-xs font-label-caps text-label-caps text-on-surface-variant">{metric.label}</div>
            <div className="font-h2 text-h2 text-on-surface">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] p-md">
          <div>
            <h2 className="font-h3 text-h3 text-on-surface">Historique de facturation</h2>
            <p className="text-body-md text-on-surface-variant">
              Les mouvements ci-dessous seront remplaces par les paiements verifies via webhook.
            </p>
          </div>
          <button className="inline-flex items-center gap-xs font-label-caps text-label-caps text-primary hover:underline">
            <MaterialIcon className="text-[18px]" name="download" />
            Tout exporter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Date
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Designation
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Montant
                </th>
                <th className="border-b border-white/5 px-md py-sm font-label-caps text-label-caps text-on-surface-variant">
                  Methode
                </th>
                <th className="border-b border-white/5 px-md py-sm text-right font-label-caps text-label-caps text-on-surface-variant">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {billingHistory.map((row) => (
                <tr className="transition-colors hover:bg-white/5" key={row.invoice}>
                  <td className="px-md py-md font-data-mono text-data-mono text-on-surface">{row.date}</td>
                  <td className="px-md py-md">
                    <div className="font-semibold text-on-surface">{row.label}</div>
                    <div className="text-xs text-on-surface-variant">Facture #{row.invoice}</div>
                  </td>
                  <td className="px-md py-md font-data-mono text-data-mono text-on-surface">
                    {formatCurrencyCfa(row.amount)}
                  </td>
                  <td className="px-md py-md text-on-surface-variant">{row.provider}</td>
                  <td className="px-md py-md text-right">
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-sm py-xs text-[10px] font-label-caps uppercase text-green-400">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformShell>
  );
}
