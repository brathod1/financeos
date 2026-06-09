
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  TrendingUp,
  Target,
  BarChart3,
  Settings,
  Tag,
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
    label: "Categories",
    href: "/categories",
    icon: Tag,
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
];

import { createClient } from "@/supabase/server";
import { signOut } from "@/app/actions/auth";
import { deleteAccount } from "@/app/actions/delete-accounts";
import { DeleteDataButton } from "@/components/auth/delete-data-buttons";
export async function Sidebar() {
    console.log("SIDEBAR RENDERED");
    const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();
  return (
    <aside
      className="
      w-72
      bg-black
      border-r
      border-white/5
      min-h-screen
      px-4
      py-6
      flex
      flex-col
      "
    >
      <div className="px-4 mb-10">
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
          Personal Finance
        </p>

        <h1 className="text-3xl font-bold mt-3">
          FinanceOS
        </h1>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              text-zinc-400
              hover:text-white
              hover:bg-white/5
              transition-all
              duration-200
              "
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-4">
  <Link
    href="/settings"
    className="
      flex
      items-center
      gap-4
      px-4
      py-4
      rounded-2xl
      text-zinc-400
      hover:text-white
      hover:bg-white/5
      transition-all
      duration-200
    "
  >
    <Settings size={20} />
    Settings
  </Link>

  {user && (
  <div
    className="
      border
      border-white/10
      rounded-2xl
      p-4
      bg-white/[0.02]
      mt-4
    "
  >
    <div className="flex items-center gap-3 mb-4">
      <div
        className="
          w-10
          h-10
          rounded-full
          bg-white/10
          flex
          items-center
          justify-center
          font-bold
          text-white
        "
      >
        {user.user_metadata?.full_name?.[0] ??
          user.email?.[0]?.toUpperCase()}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {user.user_metadata?.full_name}
        </p>

        <p className="text-xs text-zinc-500 truncate">
          {user.email}
        </p>
      </div>
    </div>

    <div className="space-y-1">
      <form action={signOut}>
        <button
          className="
            w-full
            text-left
            px-3
            py-2
            rounded-xl
            text-zinc-400
            hover:text-white
            hover:bg-white/5
            transition
          "
        >
          Logout
        </button>
      </form>

      <form action={deleteAccount}>
  <DeleteDataButton />
</form>
    </div>
  </div>
)}
</div>
    </aside>
  );
}