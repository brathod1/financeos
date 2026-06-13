"use client";

import { createBudget } from "@/app/actions/budgets";
import { Category } from "@/types/category";

interface Props {
  categories: Category[];
}

export function AddBudgetForm({
  categories,
}: Props) {
  return (
    <form
      action={createBudget}
      className="
bg-zinc-900
border
border-zinc-800
rounded-2xl
p-4
md:p-6
space-y-4
"
    >
      <select
        name="categoryId"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
      >
        {categories
          .filter(
            (c) =>
              c.category_type ===
              "expense"
          )
          .map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
      </select>

      <input
  type="number"
  name="monthlyLimit"
  min="0"
  step="0.01"
  placeholder="Monthly Budget (₹)"
  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
/>

      <button
  type="submit"
  className="
  w-full
  bg-white
  text-black
  px-4
  py-3
  rounded-full
  font-medium
  "
>
  Add Budget
</button>
    </form>
  );
}