"use client";

import { Account } from "@/types/accounts";
import { updateAccount } from "@/app/actions/accounts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
interface Props {
  account: Account;
}

export function EditAccountForm({
  account,
}: Props) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="mt-4"
      >
        ✏️ Edit
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Edit Account
        </DialogTitle>
      </DialogHeader>

      <form
        action={updateAccount}
        className="space-y-4"
      >
        <input
          type="hidden"
          name="id"
          value={account.id}
        />

        <input
          name="name"
          defaultValue={account.name}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
        />

        <select
          name="accountType"
          defaultValue={account.account_type}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
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
          type="number"
          name="startingBalance"
          defaultValue={
            account.starting_balance
          }
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="includeInCash"
            defaultChecked={
              account.include_in_cash
            }
          />

          Include In Cash
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="includeInNetWorth"
            defaultChecked={
              account.include_in_networth
            }
          />

          Include In Net Worth
        </label>

        <Button type="submit">
          Save Changes
        </Button>
      </form>
    </DialogContent>
  </Dialog>
  );
}