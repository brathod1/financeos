"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddInvestmentForm } from "./add-investment-form";

export function AddInvestmentDialog({
  accounts,
}: {
  accounts: any[];
}) {
  return (
    <Dialog>
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
        />
      </DialogContent>
    </Dialog>
  );
}