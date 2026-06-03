import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  TrendingUp,
  Target,
  BarChart3,
  Settings
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: Wallet,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
  {
    label: "Investments",
    href: "/investments",
    icon: TrendingUp,
  },
  {
    label: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-zinc-800 min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          FinanceOS
        </h1>
      </div>

      <nav className="space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}