import { PlatformShell } from "@/components/platform/platform-shell";
import { adminPayments, formatCurrencyCfa } from "@/lib/content";

export default function AdminPaymentsPage() {
  return (
    <PlatformShell
      role="admin"
      subtitle="Tableau des transactions, providers et statuts de paiement pour le support et le pilotage business."
      title="Paiements"
    >
      <div className="glass-card overflow-hidden rounded-xl">
        <table className="w-full border-collapse text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                Utilisateur
              </th>
              <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                Montant
              </th>
              <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                Provider
              </th>
              <th className="border-b border-white/5 px-gutter py-4 font-label-caps text-label-caps text-on-surface-variant">
                Date
              </th>
              <th className="border-b border-white/5 px-gutter py-4 text-right font-label-caps text-label-caps text-on-surface-variant">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {adminPayments.map((payment) => (
              <tr className="transition-colors hover:bg-white/[0.03]" key={`${payment.user}-${payment.date}`}>
                <td className="px-gutter py-4 text-on-surface">{payment.user}</td>
                <td className="px-gutter py-4 text-on-surface">{formatCurrencyCfa(payment.amount)}</td>
                <td className="px-gutter py-4 text-on-surface-variant">{payment.provider}</td>
                <td className="px-gutter py-4 text-on-surface-variant">{payment.date}</td>
                <td className="px-gutter py-4 text-right">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlatformShell>
  );
}
