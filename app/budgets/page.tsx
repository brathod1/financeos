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

        <h1 className="text-5xl md:text-7xl font-bold mt-2">
          Budgets
        </h1>

        <p className="text-zinc-500 mt-4">
  Set monthly spending limits and track progress.
</p>
      </div>
      

      <AddBudgetForm
        categories={categories}
      />
{budgets.length === 0 && (
  <div
    className="
    bg-zinc-900
    border
    border-zinc-800
    rounded-2xl
    p-8
    text-center
    "
  >
    <div className="text-5xl mb-4">
      💰
    </div>

    <h3 className="text-xl font-semibold">
      No budgets yet
    </h3>

    <p className="text-zinc-500 mt-2">
      Create your first budget to start tracking spending.
    </p>
  </div>
)}
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
  className="
bg-[#0F1117]
border
border-white/5
rounded-[32px]
p-6
md:p-8
"
>
  <div
  className="
  flex
  flex-col
  md:flex-row
  gap-2
  md:justify-between
  mb-4
  "
>
    <div>
  <p className="text-zinc-500 uppercase text-xs tracking-wider">
    Category
  </p>

  <h3 className="font-semibold mt-1">
    {category?.name}
  </h3>
</div>

    <span className="font-semibold">
  ₹
  {budgetAmount.toLocaleString()}
</span>
  </div>

  <div className="space-y-2 text-sm">
    <div className="flex justify-between gap-4">
      <span>Spent</span>

      <span>
        ₹{spent.toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between gap-4">
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

  <div className="w-full bg-zinc-800 h-4 rounded-full mt-4 overflow-hidden">
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

  <p
  className={`
  text-xs
  mt-2
  ${
    percentage >= 100
      ? "text-red-500"
      : percentage >= 80
      ? "text-yellow-500"
      : "text-zinc-500"
  }
`}
>
  {Math.round(percentage)}% used
  {percentage >= 100 && " • Over Budget"}
</p>
</div>
        
          );
        })}
      </div>

    </div>
  );
}