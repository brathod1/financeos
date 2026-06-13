"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddInvestmentForm } from "./add-investment-form";
import { Asset }
from "@/types/asset";
export function AddInvestmentDialog({
  accounts,
  assets,
}: {
  accounts: any[];
  assets: Asset[];
}) {
  const [open, setOpen] =
    useState(false);
    console.log(
  "ASSETS DIALOG",
  assets
);
  return (
    <Dialog
  open={open}
  onOpenChange={setOpen}
>
      <DialogTrigger asChild>
        <button
          className="
          w-full
          md:w-auto
          bg-white
          text-black
          px-6
          py-3
          rounded-full
          font-medium
          "
        >
          + Add Investment
        </button>
      </DialogTrigger>

      <DialogContent
        className="
        bg-[#0F1117]
        border-white/10
        text-white
        max-h-[90vh]
        overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle>
            Add Investment
          </DialogTitle>
        </DialogHeader>

        <AddInvestmentForm
          accounts={accounts}
           assets={assets}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}