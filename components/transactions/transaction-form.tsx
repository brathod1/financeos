
"use client";

import { createTransaction } from "@/app/actions/transactions";
import { Account } from "@/types/accounts";
import { Category } from "@/types/category";
import { useState } from "react";

interface TransactionFormProps {
  accounts: Account[];
  categories: Category[];
}

export function TransactionForm({
  accounts,
  categories,
}: TransactionFormProps) {
  const [transactionType, setTransactionType] =
    useState("expense");

  const filteredCategories = categories
  .filter(
    (category) =>
      category.category_type ===
      transactionType
  )
  .sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-zinc-400 uppercase tracking-widest text-sm">
          Create
        </p>

        <h1 className="text-5xl font-bold mt-2">
          New Transaction
        </h1>
      </div>

      <form
        action={createTransaction}
        className="space-y-6"
      >
        <div>
          <label className="block mb-2">
            Transaction Type
          </label>

          <select
            name="transactionType"
            value={transactionType}
            onChange={(e) =>
              setTransactionType(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
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
        </div>

        <div>
          <label className="block mb-2">
            Title
          </label>

          <input
            name="title"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            placeholder="Lunch"
          />
        </div>

        <div>
          <label className="block mb-2">
            Amount
          </label>

          <input
            name="amount"
            type="number"
            min="1"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block mb-2">
            Account
          </label>

          <select
            name="accountId"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {transactionType === "transfer" && (
          <div>
            <label className="block mb-2">
              Transfer To Account
            </label>

            <select
              name="transferAccountId"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            >
              <option value="">
                Select Account
              </option>

              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {transactionType !== "transfer" &&
          (
            <div>
              <label className="block mb-2">
                Category
              </label>

              <select
                name="categoryId"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              >
                {filteredCategories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded-full font-medium"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}