import Link from "next/link";

type SiteHeaderProps = {
  stepLabel?: string;
};

export function SiteHeader({ stepLabel }: SiteHeaderProps) {
  if (stepLabel) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-gutter">
          <Link className="font-h2 text-h2 font-bold tracking-tight text-primary" href="/">
            Omni-Trade
          </Link>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            {stepLabel}
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-gutter">
        <Link className="font-h2 text-h2 font-bold tracking-tight text-primary" href="/">
          Omni-Trade
        </Link>
        <nav className="hidden items-center gap-md md:flex">
          <Link className="font-label-caps text-label-caps text-primary" href="/">
            Platform
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary"
            href="/#features"
          >
            Solutions
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary"
            href="/#pricing"
          >
            Pricing
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary"
            href="/#faq"
          >
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-sm">
          <Link
            className="hidden font-label-caps text-label-caps text-on-surface-variant hover:text-primary md:inline-flex"
            href="/login"
          >
            Log In
          </Link>
          <Link className="primary-button" href="/register?plan=pro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
