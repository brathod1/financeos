
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
      const netSavings =
  totalIncome - totalExpenses;
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
    INSIGHTS
  </p>

  <h1 className="text-5xl md:text-7xl font-bold mt-2">
    Analytics
  </h1>

  <p className="text-zinc-500 mt-4">
    Understand your spending, income and financial trends.
  </p>
</div>

      <div
  className="
  grid
  grid-cols-1
  md:grid-cols-4
  gap-4
  md:gap-6
  "
>
        <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
          <p className="text-zinc-500">
            Income
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-green-500 mt-2">
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
          <p className="text-zinc-500">
            Expenses
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-red-500 mt-2">
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
          <p className="text-zinc-500">
            Savings Rate
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mt-2">
            {savingsRate}%
          </h2>
        </div>
        <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
  <p className="text-zinc-500">
    Net Savings
  </p>

  <h2
    className={`text-2xl md:text-3xl font-bold mt-2 ${
      netSavings >= 0
        ? "text-green-500"
        : "text-red-500"
    }`}
  >
    ₹{netSavings.toLocaleString()}
  </h2>
</div>
      </div>

      <div>
  <h2 className="text-xl font-semibold">
    Financial Trends
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    Compare income and expenses.
  </p>
</div>

    <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
  <h2 className="text-xl font-semibold mb-4">
    Income vs Expenses
  </h2>

  <IncomeExpenseChart
    income={totalIncome}
    expenses={totalExpenses}
  />
</div>

<div>
  <h2 className="text-xl font-semibold">
    Spending Breakdown
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    See where your money is going.
  </p>
</div>
<div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
  <h2 className="text-xl font-semibold mb-4">
    Spending By Category
  </h2>

  {categorySpendingData.length === 0 ? (
  <div className="text-center py-10">
    <div className="text-5xl mb-4">
      📊
    </div>

    <p className="text-zinc-500">
      No spending data available.
    </p>
  </div>
) : (
  <CategorySpendingChart
    data={categorySpendingData}
  />
)}
</div>
      <div className="bg-[#0F1117] border border-white/5 rounded-[32px] p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">
          Budget Health
        </h2>
        {budgets.length === 0 && (
  <div className="text-center py-6">
    <div className="text-4xl mb-3">
      📊
    </div>

    <p className="text-zinc-500">
      No budgets created yet.
    </p>
  </div>
)}
        {budgets.length > 0 && (
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
  className="
  flex
  justify-between
  items-center
  py-3
  border-b
  border-white/5
  "
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
        )}
      </div>
        
    </div>
  );
}