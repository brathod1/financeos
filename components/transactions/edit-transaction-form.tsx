"use client";

import { Transaction } from "@/types/transactions";
import {
  updateTransaction,
  deleteTransaction,
} from "@/app/actions/transactions";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  transaction: Transaction;
}

export function EditTransactionForm({
  transaction,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
  <button
    className="
      h-10
      w-10
      rounded-xl
      bg-white/5
      border
      border-white/5
      flex
      items-center
      justify-center
      text-zinc-400
      hover:text-white
      hover:bg-white/10
      transition
    "
  >
    <Pencil size={16} />
  </button>
</DialogTrigger>

      <DialogContent className="bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <form
          action={updateTransaction}
          className="space-y-4"
        >
          <input
            type="hidden"
            name="id"
            value={transaction.id}
          />

          <input
            name="title"
            defaultValue={transaction.title}
            className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl p-4"
          />

          <input
            type="number"
            name="amount"
            defaultValue={transaction.amount}
            className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl p-4"

          
          />
        <select
  name="transactionType"
  defaultValue={
    transaction.transaction_type
  }
  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl p-4"
>
  <option value="expense">
    Expense
  </option>

  <option value="income">
    Income
  </option>

  <option value="investment">
    Investment
  </option>

  <option value="transfer">
    Transfer
  </option>
</select>


    <input
  type="date"
  name="transactionDate"
  defaultValue={
    transaction.transaction_date
  }
  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl p-4"
/>
          <Button
            type="submit"
            className="w-full"
          >
            Save Changes
          </Button>
        </form>

        <form action={deleteTransaction}>
          <input
            type="hidden"
            name="id"
            value={transaction.id}
          />

          <Button
            type="submit"
            variant="destructive"
            className="w-full"
          >
            Delete Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}