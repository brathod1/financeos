console.log("ANALYTICS PAGE");
import { getTransactions } from "@/lib/transactions";
import { getBudgets } from "@/lib/budgets";
import { getCategories } from "@/lib/categories";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { CategorySpendingChart } from "@/components/charts/category-spending-chart";
export default async function AnalyticsPage() {
  const transactions =
    await getTransactions();

  const budgets =
    await getBudgets();

  const categories =
    await getCategories();

  const totalIncome = transactions
    .filter(
      (t) =>
        t.transaction_type ===
        "income"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const totalExpenses = transactions
    .filter(
      (t) =>
        t.transaction_type ===
        "expense"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const savingsRate =
    totalIncome > 0
      ? (
          ((totalIncome -
            totalExpenses) /
            totalIncome) *
          100
        ).toFixed(1)
      : "0";
 const categorySpendingData =
  categories
    .filter(
      (category) =>
        category.category_type ===
        "expense"
    )
    .map((category) => {
      const amount =
        transactions
          .filter(
            (transaction) =>
              transaction.category_id ===
              category.id
          )
          .reduce(
            (sum, transaction) =>
              sum +
              Number(
                transaction.amount
              ),
            0
          );

      return {
        category: category.name,
        amount,
      };
    })
    .filter(
      (item) => item.amount > 0
    )
    .sort(
      (a, b) =>
        b.amount - a.amount
    );
  return (
    <div className="space-y-8">
      <div>
        <p className="text-zinc-400 uppercase tracking-widest text-sm">
          Insights
        </p>

        <h1 className="text-5xl font-bold mt-2">
          Analytics
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Income
          </p>

          <h2 className="text-3xl font-bold text-green-500 mt-2">
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Expenses
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-500">
            Savings Rate
          </p>

          <h2 className="text-3xl font-bold text-blue-500 mt-2">
            {savingsRate}%
          </h2>
        </div>
      </div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <h2 className="text-xl font-semibold mb-4">
    Income vs Expenses
  </h2>

  <IncomeExpenseChart
    income={totalIncome}
    expenses={totalExpenses}
  />
</div>

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
  <h2 className="text-xl font-semibold mb-4">
    Spending By Category
  </h2>

  <CategorySpendingChart
    data={categorySpendingData}
  />
</div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Budget Health
        </h2>

        <div className="space-y-4">
          {budgets.map((budget) => {
            const category =
              categories.find(
                (c) =>
                  c.id ===
                  budget.category_id
              );

            const spent =
              transactions
                .filter(
                  (t) =>
                    t.category_id ===
                    budget.category_id
                )
                .reduce(
                  (sum, t) =>
                    sum +
                    Number(
                      t.amount
                    ),
                  0
                );

            const percentage =
              (
                (spent /
                  Number(
                    budget.monthly_limit
                  )) *
                100
              ).toFixed(0);

            return (
              <div
                key={budget.id}
                className="flex justify-between"
              >
                <span>
                  {category?.name}
                </span>

                <span>
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}