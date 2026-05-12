import { PlatformShell } from "@/components/platform/platform-shell";

export default function DashboardSettingsPage() {
  return (
    <PlatformShell
      role="user"
      subtitle="Mets a jour tes informations personnelles, ton mot de passe et la securisation 2FA."
      title="Parametres"
    >
      <div className="grid gap-lg lg:grid-cols-2">
        <div className="surface-panel space-y-md">
          <div>
            <p className="font-label-caps text-label-caps text-primary">PROFIL</p>
            <h2 className="mt-sm font-h3 text-h3 text-on-surface">Informations du compte</h2>
          </div>
          <div className="grid gap-md">
            <input className="rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none" defaultValue="Pro Trader" />
            <input className="rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none" defaultValue="pro@omnitrade.io" />
            <button className="primary-button w-fit">Enregistrer</button>
          </div>
        </div>

        <div className="surface-panel space-y-md">
          <div>
            <p className="font-label-caps text-label-caps text-primary">SECURITE</p>
            <h2 className="mt-sm font-h3 text-h3 text-on-surface">Mot de passe & 2FA</h2>
          </div>
          <div className="grid gap-md">
            <input className="rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none" placeholder="Mot de passe actuel" type="password" />
            <input className="rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none" placeholder="Nouveau mot de passe" type="password" />
            <input className="rounded-lg border border-outline-variant bg-[#0F172A] px-md py-sm text-on-surface outline-none" placeholder="Confirmation" type="password" />
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-md">
              <p className="font-semibold text-primary">2FA Telegram activee</p>
              <p className="mt-xs text-body-md text-on-surface-variant">
                Le code de verification est envoye via @OmniTrade_Auth_Bot lors des connexions sensibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PlatformShell>
  );
}
