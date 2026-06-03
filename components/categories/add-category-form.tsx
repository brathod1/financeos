"use client";

import { createCategory } from "@/app/actions/categories";

export function AddCategoryForm() {
  return (
    <form
      action={createCategory}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4"
    >
      <input
        name="name"
        required
        placeholder="Category Name"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
      />

      <select
        name="categoryType"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
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
      </select>

      <button
        type="submit"
        className="bg-white text-black px-5 py-3 rounded-full"
      >
        Add Category
      </button>
    </form>
  );
}