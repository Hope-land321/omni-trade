import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-gutter">
      <div className="glass-card-strong max-w-xl rounded-xl p-xl text-center">
        <p className="font-label-caps text-label-caps text-primary">404</p>
        <h1 className="mt-sm font-h2 text-h2 text-on-surface">Route introuvable</h1>
        <p className="mt-sm text-body-md text-on-surface-variant">
          La page demandée n&apos;existe pas encore dans le portail Omni-Trade.
        </p>
        <Link className="primary-button mt-lg" href="/">
          Revenir à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
