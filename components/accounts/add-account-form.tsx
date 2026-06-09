"use client";

import { createAccount } from "@/app/actions/accounts";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddAccountForm() {
  return (
    <Dialog>

      <DialogTrigger asChild>
        <button
          className="
          bg-white
          text-black
          px-6
          py-3
          rounded-full
          font-medium
          hover:scale-[1.02]
          transition
          "
        >
          + Add Account
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#0F1117] border-white/10 text-white">

        <DialogHeader>
          <DialogTitle>
            Add Account
          </DialogTitle>
        </DialogHeader>

        <form
          action={createAccount}
          className="space-y-5 mt-4"
        >

          <input
            name="name"
            required
            placeholder="Account Name"
            className="
            w-full
            bg-black/20
            border
            border-white/5
            rounded-2xl
            p-4
            "
          />

          <select
            name="accountType"
            className="
            w-full
            bg-black/20
            border
            border-white/5
            rounded-2xl
            p-4
            "
          >
            <option value="checking">
              Checking
            </option>

            <option value="savings">
              Savings
            </option>

            <option value="investment">
              Investment
            </option>
          </select>

          <input
            name="startingBalance"
            type="number"
            min="0"
            defaultValue="0"
            className="
            w-full
            bg-black/20
            border
            border-white/5
            rounded-2xl
            p-4
            "
          />

          <label className="flex items-center gap-3 text-zinc-300">
            <input
              type="checkbox"
              name="includeInCash"
              defaultChecked
            />
            Include In Cash
          </label>

          <label className="flex items-center gap-3 text-zinc-300">
            <input
              type="checkbox"
              name="includeInNetWorth"
              defaultChecked
            />
            Include In Net Worth
          </label>

          <button
            type="submit"
            className="
            bg-white
            text-black
            px-6
            py-3
            rounded-full
            font-medium
            "
          >
            Create Account
          </button>

        </form>

      </DialogContent>

    </Dialog>
  );
}