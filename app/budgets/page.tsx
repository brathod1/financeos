import { getBudgets } from "@/lib/budgets";
import { getCategories } from "@/lib/categories";
import { AddBudgetForm } from "@/components/budgets/add-budget-form";
import { getTransactions } from "@/lib/transactions";
export default async function BudgetsPage() {
  const budgets =
    await getBudgets();

  const categories =
    await getCategories();

  const transactions =
  await getTransactions();

  return (
    <div className="space-y-8">

      <div>
        <p className="text-zinc-400 uppercase tracking-widest text-sm">
          Planning
        </p>

        <h1 className="text-5xl font-bold mt-2">
          Budgets
        </h1>
      </div>

      <AddBudgetForm
        categories={categories}
      />

      <div className="space-y-4">
        {budgets.map((budget) => {
          const category =
            categories.find(
              (c) =>
                c.id ===
                budget.category_id
            );
          const spent = transactions
  .filter(
    (transaction) =>
      transaction.transaction_type ===
        "expense" &&
      transaction.category_id ===
        budget.category_id
  )
  .reduce(
    (sum, transaction) =>
      sum +
      Number(transaction.amount),
    0
  );

const budgetAmount = Number(
  budget.monthly_limit
);

const remaining =
  budgetAmount - spent;

const percentage =
  budgetAmount > 0
    ? Math.min(
        (spent / budgetAmount) * 100,
        100
      )
    : 0;
          return (
            <div
                    key={budget.id}
  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
>
  <div className="flex justify-between mb-4">
    <h3 className="font-semibold">
      {category?.name}
    </h3>

    <span>
      ₹
      {budgetAmount.toLocaleString()}
    </span>
  </div>

  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Spent</span>

      <span>
        ₹{spent.toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Remaining</span>

      <span
        className={
          remaining >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      >
        ₹
        {remaining.toLocaleString()}
      </span>
    </div>
  </div>

  <div className="w-full bg-zinc-800 h-3 rounded-full mt-4 overflow-hidden">
    <div
      className={`h-full ${
        percentage >= 100
          ? "bg-red-500"
          : percentage >= 80
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
      style={{
        width: `${percentage}%`,
      }}
    />
  </div>

  <p className="text-xs text-zinc-500 mt-2">
    {Math.round(percentage)}%
    used
  </p>
</div>
        
          );
        })}
      </div>

    </div>
  );
}