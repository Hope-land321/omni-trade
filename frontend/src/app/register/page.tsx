import { RegisterForm } from "@/components/forms/register-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader stepLabel="Step 1 of 3" />
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-gutter py-xl">
        <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-on-primary-fixed-variant/10 blur-[120px]" />
        <RegisterForm />
      </main>
      <SiteFooter compact />
    </div>
  );
}
