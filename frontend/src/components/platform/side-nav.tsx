"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, dashboardNav } from "@/lib/content";
import { MaterialIcon } from "@/components/common/material-icon";

type SideNavProps = {
  role: "user" | "admin";
};

export function SideNav({ role }: SideNavProps) {
  const pathname = usePathname();
  const items = role === "admin" ? adminNav : dashboardNav;

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/5 bg-surface-container py-md shadow-xl md:flex">
      <Link className="px-4 py-6 font-h3 text-h3 font-bold tracking-tight text-primary" href={role === "admin" ? "/admin" : "/dashboard"}>
        Omni-Trade
      </Link>

      <div className="mb-xl px-4">
        <div className="flex items-center gap-xs rounded-lg p-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/20 text-primary">
            {role === "admin" ? "AD" : "PT"}
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface">
              {role === "admin" ? "Admin Omni" : "Pro Trader"}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              {role === "admin" ? "Control Tower" : "Institutional Tier"}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-xs px-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              className={`flex items-center gap-sm rounded-lg px-4 py-3 transition-all duration-200 ${
                active
                  ? "translate-x-1 border-r-4 border-primary bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
              href={item.href}
              key={item.href}
            >
              <MaterialIcon name={item.icon} />
              <span className="font-label-caps text-label-caps">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-xs px-4 pt-md">
        <Link
          className="flex items-center gap-sm rounded-lg px-4 py-3 text-on-surface-variant transition-all duration-200 hover:bg-white/5 hover:text-on-surface"
          href="#"
        >
          <MaterialIcon name="help" />
          <span className="font-label-caps text-label-caps">Support</span>
        </Link>
        <Link
          className="flex items-center gap-sm rounded-lg px-4 py-3 text-error transition-all duration-200 hover:bg-error/5"
          href="/"
        >
          <MaterialIcon name="logout" />
          <span className="font-label-caps text-label-caps">Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
}
