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
  categories,
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

  const startOfMonth =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

  const startOfLastMonth =
    new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

  const startOfYear =
    new Date(
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
            : dateFilter ===
              "thisMonth"
            ? transactionDate >=
              startOfMonth
            : dateFilter ===
              "lastMonth"
            ? transactionDate >=
                startOfLastMonth &&
              transactionDate <
                startOfMonth
            : dateFilter ===
              "thisYear"
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
    <div className="space-y-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
        w-full
        bg-[#0F1117]
        border
        border-white/5
        rounded-2xl
        p-4
        text-white
        "
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">

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
            className={`
              px-4
              py-2
              rounded-full
              border
              transition
              ${
                typeFilter === type
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-zinc-400"
              }
            `}
          >
            {type}
          </button>
        ))}

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="
          bg-[#0F1117]
          border
          border-white/5
          rounded-2xl
          p-4
          "
        >
          <option value="all">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={
                  category.id
                }
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(
              e.target.value
            )
          }
          className="
          bg-[#0F1117]
          border
          border-white/5
          rounded-2xl
          p-4
          "
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

      </div>

      {/* Transaction Feed */}
      <div
        className="
        bg-[#0F1117]
        border
        border-white/5
        rounded-[32px]
        overflow-hidden
        "
      >
        {filteredTransactions.length ===
        0 ? (
          <div className="p-12 text-center text-zinc-500">
            No transactions found
          </div>
        ) : (
          filteredTransactions.map(
            (transaction) => {
              const typeColor =
                transaction.transaction_type ===
                "income"
                  ? "text-green-500"
                  : transaction.transaction_type ===
                    "expense"
                  ? "text-red-500"
                  : transaction.transaction_type ===
                    "investment"
                  ? "text-amber-500"
                  : "text-blue-500";

              const typeIcon =
                transaction.transaction_type ===
                "income"
                  ? "+"
                  : transaction.transaction_type ===
                    "expense"
                  ? "-"
                  : transaction.transaction_type ===
                    "investment"
                  ? "↗"
                  : "↔";

              return (
                <div
                  key={
                    transaction.id
                  }
                  className="
flex
items-start
justify-between
px-8
py-5
border-b
border-white/5
hover:bg-white/[0.02]
transition
"
                >
                  <div className="flex items-center gap-5">

                    <div
                      className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/5
                      flex
                      items-center
                      justify-center
                      text-lg
                      "
                    >
                      {typeIcon}
                    </div>

                    <div>

                      <h3 className="text-xl font-medium">
                        {
                          transaction.title
                        }
                      </h3>

                      <div className="flex gap-2 mt-1 text-sm text-zinc-500">

                        <span
  className={`
    px-2.5
    py-1
    rounded-full
    text-xs
    font-medium
    ${
      transaction.transaction_type ===
      "income"
        ? "bg-green-500/10 text-green-500"
        : transaction.transaction_type ===
          "expense"
        ? "bg-red-500/10 text-red-500"
        : transaction.transaction_type ===
          "investment"
        ? "bg-amber-500/10 text-amber-500"
        : "bg-blue-500/10 text-blue-500"
    }
  `}
>
  {transaction.transaction_type}
</span>

                        <span>
                          •
                        </span>

                        <span>
                          {new Date(
  transaction.transaction_date
).toLocaleDateString(
  "en-IN",
  {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
)}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col items-end gap-3">

  <EditTransactionForm
    transaction={
      transaction
    }
  />

  <p
    className={`text-xl font-semibold ${typeColor}`}
  >
    {transaction.transaction_type ===
    "expense"
      ? "-₹"
      : "₹"}

    {Number(
      transaction.amount
    ).toLocaleString()}
  </p>

</div>
                </div>
              );
            }
          )
        )}
      </div>

    </div>
  );
}