import Link from "next/link";

type SiteFooterProps = {
  compact?: boolean;
};

export function SiteFooter({ compact = false }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest">
      <div
        className={`mx-auto grid max-w-container-max gap-md px-gutter ${
          compact ? "py-lg md:grid-cols-2" : "py-xl md:grid-cols-2"
        }`}
      >
        <div className="space-y-sm">
          <div className="font-h3 text-h3 text-on-surface">Omni-Trade</div>
          <p className="max-w-md text-body-md text-on-surface-variant">
            L&apos;intelligence artificielle au service de vos actifs financiers. Précis,
            automatisé et sécurisé.
          </p>
          <div className="text-body-md text-on-surface-variant/70">
            © 2026 Omni-Trade Technologies. All rights reserved.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-md md:justify-self-end">
          <div className="space-y-sm">
            <span className="font-label-caps text-label-caps text-primary">Legal</span>
            <Link className="block text-body-md text-on-surface-variant hover:text-primary" href="#">
              Privacy Policy
            </Link>
            <Link className="block text-body-md text-on-surface-variant hover:text-primary" href="#">
              Terms of Service
            </Link>
          </div>
          <div className="space-y-sm">
            <span className="font-label-caps text-label-caps text-primary">Support</span>
            <Link className="block text-body-md text-on-surface-variant hover:text-primary" href="#">
              API Documentation
            </Link>
            <Link className="block text-body-md text-on-surface-variant hover:text-primary" href="#">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
