import type { ReactNode } from "react";
import { SideNav } from "@/components/platform/side-nav";

type PlatformShellProps = {
  role: "user" | "admin";
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PlatformShell({ role, title, subtitle, actions, children }: PlatformShellProps) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav role={role} />
      <main className="md:ml-64">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-container-max items-center justify-between gap-md px-gutter py-md">
            <div>
              <p className="font-label-caps text-label-caps text-primary">
                {role === "admin" ? "Admin Console" : "Client Portal"}
              </p>
              <h1 className="mt-xs font-h3 text-h3 text-on-surface">{title}</h1>
              <p className="mt-xs max-w-2xl text-body-md text-on-surface-variant">{subtitle}</p>
            </div>
            {actions ? <div className="flex items-center gap-sm">{actions}</div> : null}
          </div>
        </header>
        <section className="mx-auto max-w-container-max space-y-lg px-gutter py-lg">{children}</section>
      </main>
    </div>
  );
}
