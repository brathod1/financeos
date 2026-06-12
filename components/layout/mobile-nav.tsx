"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu }
from "@/components/layout/mobile-menu";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  Menu,
} from "lucide-react";

export function MobileNav() {
     const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href;
     
  return (
    <div
      className="
      md:hidden
      fixed
      bottom-0
      left-0
      right-0
      h-20
      bg-black
      border-t
      border-white/10
      flex
      justify-around
      items-center
pb-2
      z-50
      "
    >
      <Link
  href="/"
  className={`
    p-2
    rounded-xl
    transition-all
hover:scale-105
active:scale-95
    ${
      isActive("/")
        ? "bg-white text-black"
        : "text-zinc-400"
    }
  `}
>
  <LayoutDashboard size={20} />
</Link>

      <Link
  href="/accounts"
  className={`
    p-2
    rounded-xl
    transition-all
hover:scale-105
active:scale-95
    ${
      isActive("/accounts")
        ? "bg-white text-black"
        : "text-zinc-400"
    }
  `}
>
  <Wallet size={20} />
</Link>

     <Link
  href="/transactions"
  className={`
    p-2
    rounded-xl
    transition-all
hover:scale-105
active:scale-95
    ${
      isActive("/transactions")
        ? "bg-white text-black"
        : "text-zinc-400"
    }
  `}
>
  <ArrowLeftRight size={20} />
</Link>

      <Link
  href="/investments"
  className={`
    p-2
    rounded-xl
    transition-all
hover:scale-105
active:scale-95
    ${
      isActive("/investments")
        ? "bg-white text-black"
        : "text-zinc-400"
    }
  `}
>
  <TrendingUp size={20} />
</Link>

      <MobileMenu />
    </div>
  );
}