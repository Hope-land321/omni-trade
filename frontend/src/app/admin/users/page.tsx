import { MaterialIcon } from "@/components/common/material-icon";
import { PlatformShell } from "@/components/platform/platform-shell";
import { adminUsers } from "@/lib/content";

export default function AdminUsersPage() {
  return (
    <PlatformShell
      actions={
        <>
          <button className="secondary-button">
            <MaterialIcon className="text-sm" name="filter_list" />
            Filtres
          </button>
          <button className="primary-button">
            <MaterialIcon className="text-sm" name="download" />
            Export CSV
          </button>
        </>
      }
      role="admin"
      subtitle="Liste paginee des utilisateurs avec statut, date d'inscription et actions administratives."
      title="Utilisateurs"
    >
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
              <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                Derniere connexion
              </th>
              <th className="border-b border-white/5 px-gutter py-4 text-right font-label-caps text-label-caps text-on-surface-variant">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {adminUsers.map((user) => (
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
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {user.status}
                  </span>
                </td>
                <td className="px-gutter py-4 text-on-surface-variant">{user.createdAt}</td>
                <td className="px-gutter py-4 text-on-surface-variant">{user.lastSeen}</td>
                <td className="px-gutter py-4 text-right">
                  <button className="secondary-button !px-sm !py-xs">Voir detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlatformShell>
  );
}
