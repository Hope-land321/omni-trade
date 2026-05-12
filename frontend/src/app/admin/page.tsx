import Link from "next/link";
import { MaterialIcon } from "@/components/common/material-icon";
import { PlatformShell } from "@/components/platform/platform-shell";
import { adminMetrics, adminUsers } from "@/lib/content";

export default function AdminPage() {
  return (
    <PlatformShell
      actions={
        <>
          <Link className="secondary-button" href="/admin/users">
            Utilisateurs
          </Link>
          <Link className="primary-button" href="/admin/payments">
            Paiements
          </Link>
        </>
      }
      role="admin"
      subtitle="Vue d'ensemble des indicateurs commerciaux, des utilisateurs et du cycle de paiement Omni-Trade."
      title="Tableau de bord"
    >
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {adminMetrics.map((metric) => (
          <div className="metric-card space-y-sm" key={metric.label}>
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MaterialIcon name={metric.icon} />
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-1 font-data-mono text-xs text-primary">
                {metric.delta}
              </span>
            </div>
            <div>
              <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">{metric.label}</p>
              <h3 className="font-h2 text-h2 text-on-surface">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-3">
        <div className="space-y-md xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-h3 text-h3 text-on-surface">Gestion des utilisateurs</h2>
              <p className="text-body-md text-on-surface-variant">
                Apercu des derniers comptes actifs, expires ou en attente.
              </p>
            </div>
            <Link className="primary-button" href="/admin/users">
              Voir tout
            </Link>
          </div>

          <div className="glass-card overflow-hidden rounded-xl">
            <table className="w-full border-collapse text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                    Utilisateur
                  </th>
                  <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                    Statut
                  </th>
                  <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                    Inscription
                  </th>
                  <th className="border-b border-white/5 px-gutter py-4 text-right font-label-caps text-label-caps text-on-surface-variant">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {adminUsers.slice(0, 4).map((user) => (
                  <tr className="transition-colors hover:bg-white/[0.03]" key={user.email}>
                    <td className="px-gutter py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{user.name}</p>
                          <p className="font-data-mono text-xs text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-gutter py-4 font-data-mono text-data-mono text-on-surface-variant">
                      {user.createdAt}
                    </td>
                    <td className="px-gutter py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary">
                        <MaterialIcon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-lg">
          <div className="surface-panel space-y-md">
            <div className="flex items-center justify-between">
              <h3 className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">
                Performance hebdomadaire
              </h3>
              <MaterialIcon className="text-on-surface-variant" name="trending_up" />
            </div>
            <div className="flex h-40 items-end justify-between gap-1">
              {[40, 65, 55, 90, 72, 84, 58].map((height) => (
                <div className="relative h-full w-full rounded-t-sm bg-white/5" key={height}>
                  <div className="absolute bottom-0 w-full rounded-t-sm bg-primary-container transition-all hover:bg-primary" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
            <p className="text-body-md text-on-surface-variant">
              Le dashboard admin final affichera les revenus et inscriptions sur 30 jours via l&apos;API.
            </p>
          </div>

          <div className="surface-panel">
            <h3 className="font-h3 text-h3 text-on-surface">Prochaines actions</h3>
            <ul className="mt-md space-y-sm text-on-surface-variant">
              <li className="flex gap-xs">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Connecter les vrais endpoints stats et exports CSV.
              </li>
              <li className="flex gap-xs">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Brancher les actions Activer / Suspendre / Desactiver.
              </li>
              <li className="flex gap-xs">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Remplacer les donnees mock par les webhooks confirms.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PlatformShell>
  );
}
