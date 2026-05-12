export type PlanId = "starter" | "pro" | "elite";

export type Plan = {
  id: PlanId;
  label: string;
  name: string;
  price: number;
  cadence: string;
  description: string;
  features: string[];
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    label: "STARTER",
    name: "Starter",
    price: 4900,
    cadence: "mois",
    description: "Une rampe d'accès simple pour découvrir le bot et ses premiers signaux.",
    features: [
      "Accès basique au bot IA",
      "Signaux limités à 5 par jour",
      "Support par email",
    ],
  },
  {
    id: "pro",
    label: "PRO",
    name: "Pro",
    price: 9900,
    cadence: "mois",
    description: "Le plan principal pour vendre Omni-Trade avec un tunnel centré sur la performance.",
    features: [
      "Accès complet au bot IA",
      "Trades illimités 24h/24",
      "Support prioritaire",
      "Alertes Telegram instantanées",
    ],
    recommended: true,
  },
  {
    id: "elite",
    label: "ELITE",
    name: "Elite",
    price: 19900,
    cadence: "mois",
    description: "Une offre premium pour renforcer l'ancrage marketing et la valeur perçue.",
    features: [
      "Signaux institutionnels avancés",
      "Support dédié 1-on-1",
      "Canal Telegram exclusif",
      "Analyse personnalisée du portefeuille",
    ],
  },
];

export const paymentProviders = [
  {
    id: "kiapay",
    name: "KiaPay",
    description: "Mobile Money & cartes",
    surfaceClassName: "bg-white text-slate-900",
  },
  {
    id: "fedapay",
    name: "FedaPay",
    description: "Passerelle sécurisée UEMOA",
    surfaceClassName: "bg-[#0041FF] text-white",
  },
];

export const featureCards = [
  {
    title: "Analyse IA en temps réel",
    description:
      "Nos algorithmes scannent les marchés en continu pour repérer les fenêtres d'exécution à forte probabilité.",
    icon: "query_stats",
    tone: "large",
  },
  {
    title: "Exécution automatique",
    description:
      "Le bot exécute vos ordres selon vos paramètres, sans fatigue ni latence humaine.",
    icon: "bolt",
    tone: "compact",
  },
  {
    title: "Notifications Telegram",
    description:
      "Recevez vos alertes, confirmations et rappels d'abonnement directement dans Telegram.",
    icon: "send",
    tone: "wide",
  },
];

export const faqItems = [
  {
    question: "Comment l'accès au bot est-il contrôlé ?",
    answer:
      "L'accès est validé côté plateforme puis recontrôlé côté bot Telegram. Un abonnement expiré révoque automatiquement l'accès.",
  },
  {
    question: "Quels moyens de paiement sont pris en charge ?",
    answer:
      "Le MVP prévoit KiaPay et FedaPay pour encaisser le Mobile Money en XOF selon le pays et l'opérateur du client.",
  },
  {
    question: "Que reçoit l'utilisateur après paiement ?",
    answer:
      "Un code d'activation à 6 caractères est envoyé par email. Une fois validé, l'utilisateur peut récupérer l'accès Telegram.",
  },
  {
    question: "Le bot est-il hébergé sur la plateforme ?",
    answer:
      "Non. Omni-Trade vend l'accès et contrôle les droits, mais le bot reste indépendant côté Telegram.",
  },
];

export const dashboardMetrics = [
  { label: "Abonnement", value: "Actif", icon: "card_membership", chip: "Pro" },
  { label: "Prochaine échéance", value: "7 juin 2026", icon: "event" },
  { label: "Jours restants", value: "27", icon: "schedule" },
];

export const billingHistory = [
  {
    date: "07 juin 2026",
    label: "Renouvellement Pro",
    invoice: "OMNI-2026-089",
    amount: 9900,
    provider: "FedaPay",
    status: "Payé",
  },
  {
    date: "07 mai 2026",
    label: "Activation initiale Pro",
    invoice: "OMNI-2026-012",
    amount: 9900,
    provider: "KiaPay",
    status: "Payé",
  },
];

export const adminMetrics = [
  { label: "Abonnés actifs", value: "2 489", delta: "+12,5%", icon: "group_add" },
  { label: "Revenus ce mois", value: "24 651 000 FCFA", delta: "+8,2%", icon: "payments" },
  { label: "Nouveaux inscrits", value: "340", delta: "+340", icon: "person_add" },
  { label: "Abonnements expirés", value: "84", delta: "+5%", icon: "event_busy" },
];

export const adminUsers = [
  {
    initials: "AM",
    name: "Alexandre Martin",
    email: "a.martin@omnitrade.io",
    status: "Actif",
    createdAt: "12 oct. 2025",
    lastSeen: "Il y a 10 min",
  },
  {
    initials: "SC",
    name: "Sarah Chen",
    email: "s.chen@global.com",
    status: "Expiré",
    createdAt: "05 sept. 2025",
    lastSeen: "20 oct. 2025",
  },
  {
    initials: "JD",
    name: "Julien Durand",
    email: "j.durand@techmail.fr",
    status: "En attente",
    createdAt: "25 oct. 2025",
    lastSeen: "Jamais",
  },
  {
    initials: "LD",
    name: "Lucas Dubois",
    email: "lucas.d@quant.io",
    status: "Actif",
    createdAt: "02 août 2025",
    lastSeen: "Il y a 2h",
  },
];

export const adminPayments = [
  {
    user: "Alexandre Martin",
    amount: 9900,
    provider: "FedaPay",
    status: "completed",
    date: "07 juin 2026",
  },
  {
    user: "Sarah Chen",
    amount: 19900,
    provider: "KiaPay",
    status: "completed",
    date: "02 juin 2026",
  },
  {
    user: "Julien Durand",
    amount: 4900,
    provider: "FedaPay",
    status: "pending",
    date: "01 juin 2026",
  },
  {
    user: "Lucas Dubois",
    amount: 9900,
    provider: "KiaPay",
    status: "failed",
    date: "28 mai 2026",
  },
];

export const dashboardNav = [
  { href: "/dashboard", label: "Accueil", icon: "dashboard" },
  { href: "/dashboard/subscription", label: "Mon abonnement", icon: "account_balance_wallet" },
  { href: "/dashboard/settings", label: "Paramètres", icon: "settings" },
];

export const adminNav = [
  { href: "/admin", label: "Vue d'ensemble", icon: "dashboard" },
  { href: "/admin/users", label: "Utilisateurs", icon: "group" },
  { href: "/admin/payments", label: "Paiements", icon: "payments" },
];

export function getPlanFromSlug(slug?: string | null) {
  return plans.find((plan) => plan.id === slug) ?? plans.find((plan) => plan.recommended) ?? plans[0];
}

export function formatCurrencyCfa(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}
