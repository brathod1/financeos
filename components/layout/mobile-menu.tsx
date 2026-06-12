"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Menu,
  Tag,
  PiggyBank,
  Target,
  Settings,
  BarChart3,
} from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
      >
        <Menu size={22} />
      </button>

      {open && (
        <>
          <div
            className="
            fixed
            inset-0
            bg-black/70
            z-50
            "
            onClick={() =>
              setOpen(false)
            }
          />

          <div
            className="
            fixed
            top-0
            right-0
            h-full
            w-72
            bg-[#0F1117]
            z-50
            p-6
            "
          >
            <div
              className="
              flex
              justify-between
              items-center
              mb-8
              "
            >
              <div>
  <h2 className="text-xl font-bold">
    North
  </h2>

  <p className="text-zinc-500 text-sm">
    Track. Plan. Grow.
  </p>
</div>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">

              <Link
  href="/categories"
  className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-white/5
transition
"
  onClick={() => setOpen(false)}
>
                <Tag size={20} />
                Categories
              </Link>

              <Link
  href="/budgets"
  className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-white/5
transition
"
  onClick={() => setOpen(false)}
>
                <PiggyBank size={20} />
                Budgets
              </Link>

              <Link
  href="/goals"
  className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-white/5
transition
"
  onClick={() => setOpen(false)}
>
                <Target size={20} />
                Goals
              </Link>
                <Link
  href="/analytics"
  className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-white/5
transition
"
  onClick={() => setOpen(false)}
>
  <BarChart3 size={20} />
  Analytics
</Link>
              <Link
  href="/settings"
  className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-white/5
transition
"
  onClick={() => setOpen(false)}
>
                <Settings size={20} />
                Settings
              </Link>

            </div>
          </div>
        </>
      )}
    </>
  );
}