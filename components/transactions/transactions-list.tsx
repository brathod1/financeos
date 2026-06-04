"use client";

import { useState } from "react";
import { Transaction } from "@/types/transactions";
import { EditTransactionForm } from "./edit-transaction-form";
import { Category } from "@/types/category";

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

export function TransactionsList({
  transactions,
  categories
}: Props) {
  const [search, setSearch] =
    useState("");
  const [typeFilter, setTypeFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [dateFilter, setDateFilter] =
    useState("all");
  

  const today = new Date();

const startOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  1
);

const startOfLastMonth = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  1
);

const startOfYear = new Date(
  today.getFullYear(),
  0,
  1
);


  const filteredTransactions =
  transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesType =
        typeFilter === "all"
          ? true
          : transaction.transaction_type ===
            typeFilter;

      const matchesCategory =
  categoryFilter === "all"
    ? true
    : transaction.category_id ===
      categoryFilter;
const transactionDate =
  new Date(
    transaction.transaction_date
  );

const matchesDate =
  dateFilter === "all"
    ? true
    : dateFilter === "thisMonth"
    ? transactionDate >=
      startOfMonth
    : dateFilter === "lastMonth"
    ? transactionDate >=
        startOfLastMonth &&
      transactionDate <
        startOfMonth
    : dateFilter === "thisYear"
    ? transactionDate >=
      startOfYear
    : true;
      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesDate
      );
    }
  );

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
      />
        <div className="flex gap-2 flex-wrap">

  {[
    "all",
    "expense",
    "income",
    "investment",
    "transfer",
  ].map((type) => (
    <button
      key={type}
      type="button"
      onClick={() =>
        setTypeFilter(type)
      }
      className={`px-4 py-2 rounded-full border ${
        typeFilter === type
          ? "bg-white text-black"
          : "border-zinc-700 text-zinc-300"
      }`}
    >
      {type}
    </button>
  ))}

</div>

        <select
        value={categoryFilter}
        onChange={(e) =>
            setCategoryFilter(
            e.target.value
            )
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
        >
        <option value="all">
            All Categories
        </option>

        {categories.map((category: Category) => (
            <option
            key={category.id}
            value={category.id}
            >
            {category.name}
            </option>
        ))}
        </select>

        <select
  value={dateFilter}
  onChange={(e) =>
    setDateFilter(
      e.target.value
    )
  }
  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
>
  <option value="all">
    All Time
  </option>

  <option value="thisMonth">
    This Month
  </option>

  <option value="lastMonth">
    Last Month
  </option>

  <option value="thisYear">
    This Year
  </option>
</select>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
        {filteredTransactions.length ===
        0 ? (
          <div className="p-10 text-center text-zinc-500">
            No transactions found
          </div>
        ) : (
          filteredTransactions.map(
            (transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-6 border-b border-zinc-800"
              >
                <div>
                  <p className="font-medium">
                    {transaction.title}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {
                      transaction.transaction_type
                    }
                  </p>

                  <p className="text-xs text-zinc-600">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <EditTransactionForm
                    transaction={
                      transaction
                    }
                  />

                  <p
                    className={`font-bold ${
                      transaction.transaction_type ===
                      "income"
                        ? "text-green-500"
                        : transaction.transaction_type ===
                          "expense"
                        ? "text-red-500"
                        : transaction.transaction_type ===
                          "investment"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    ₹
                    {Number(
                      transaction.amount
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>

    </div>
  );
}