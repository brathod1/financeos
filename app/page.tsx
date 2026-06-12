
import { getAccounts } from "@/lib/accounts";
import { getTransactions } from "@/lib/transactions";
import { calculateAccountBalance } from "@/lib/balances";
import { getCategories } from "@/lib/categories";
import { SpendingChart }

from "@/components/charts/spending-chart";
import { getPortfolioValue }
from "@/lib/portfolio";

export default async function HomePage() {
  const accounts = await getAccounts();
  const transactions = await getTransactions();
  


  const categories = await getCategories();
  const now = new Date();

const currentMonthTransactions =
  transactions.filter((transaction) => {
    const date = new Date(
      transaction.transaction_date
    );

    return (
      date.getMonth() ===
        now.getMonth() &&
      date.getFullYear() ===
        now.getFullYear()
    );
  });

  const monthlyIncome =
  currentMonthTransactions
    .filter(
      (transaction) =>
        transaction.transaction_type ===
        "income"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount),
      0
    );

const monthlyExpenses =
  currentMonthTransactions
    .filter(
      (transaction) =>
        transaction.transaction_type ===
        "expense"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount),
      0
    );


const monthlyInvestments =
  currentMonthTransactions
    .filter(
      (transaction) =>
        transaction.transaction_type ===
        "investment"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount),
      0
    );

const monthlySavings =
  monthlyIncome -
  monthlyExpenses -
  monthlyInvestments;

const monthlyExpenseTransactions =
  currentMonthTransactions.filter(
    (transaction) =>
      transaction.transaction_type ===
      "expense"
  );

const spendingByCategory: Record<
  string,
  number
> = {};

currentMonthTransactions
  .filter(
    (transaction) =>
      transaction.transaction_type ===
      "expense"
  )
  .forEach((transaction) => {
    const category = categories.find(
      (c) =>
        c.id === transaction.category_id
    );

    const categoryName =
      category?.name ?? "Uncategorized";

    spendingByCategory[categoryName] =
      (spendingByCategory[
        categoryName
      ] ?? 0) +
      Number(transaction.amount);
  });

const topCategories = Object.entries(
  spendingByCategory
)


  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
const chartData =
  topCategories.map(
    ([name, amount]) => ({
      name,
      amount,
    })
  );

  const biggestCategory =
  topCategories.length > 0
    ? topCategories[0]
    : null;

const expenseTransactions =
  currentMonthTransactions.filter(
    (t) =>
      t.transaction_type ===
      "expense"
  );

const largestExpense =
  expenseTransactions.length > 0
    ? expenseTransactions.reduce(
        (largest, current) =>
          Number(current.amount) >
          Number(largest.amount)
            ? current
            : largest
      )
    : null;

const averageExpense =
  expenseTransactions.length > 0
    ? expenseTransactions.reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      ) /
      expenseTransactions.length
    : 0;
  const cashAvailable = accounts
  .filter((account) => account.include_in_cash)
  .reduce((totalCash, account) => {
    
    
    const balance = calculateAccountBalance(
      account.id,
      Number(account.starting_balance),
      transactions
    );

    return totalCash + balance;
  }, 0);

   

const moneyInvested = transactions

  .filter(
    (transaction) =>
      transaction.transaction_type === "investment"
  )
  
  .reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

const portfolioValue =
  await getPortfolioValue();

const netWorth =
  cashAvailable + portfolioValue;
  return (
    
      <div className="space-y-10 max-w-7xl mx-auto">
        <div className="mb-8">
  <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
  TRACK • PLAN • GROW
</p>

  <h1
  className="
  text-4xl
  md:text-7xl
  font-bold
  tracking-tight
  mt-4
  "
>
  Good to see you 👋
</h1>

  <p className="text-zinc-500 text-lg mt-4">
  Welcome back to North.
</p>
</div>

        <div
  className="
  grid
  grid-cols-2
xl:grid-cols-4
  gap-6
  "
>
          <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-8
  border
  border-white/5
  min-h-[140px]
md:min-h-[220px]
  flex
  flex-col
  justify-between
"
>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
              Net Worth
            </p>

            <h2
  className="
  text-2xl
md:text-6xl
  font-bold
  tracking-tight
  "
>
              ₹{netWorth.toLocaleString()}
            </h2>
          </div>

          <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-8
  border
  border-white/5
  min-h-[140px]
md:min-h-[220px]
  flex
  flex-col
  justify-between
"
>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
              Cash Available
            </p>

            <h2
  className="
  text-2xl
md:text-6xl
  font-bold
  tracking-tight
  "
>
              ₹{cashAvailable.toLocaleString()}
            </h2>
          </div>
          <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-8
  border
  border-white/5
  min-h-[140px]
md:min-h-[220px]
  flex
  flex-col
  justify-between
"
>
  <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
    Money Invested
  </p>

  <h2
  className="
  text-2xl
md:text-6xl
  font-bold
  tracking-tight
  "
>
    ₹{moneyInvested.toLocaleString()}
  </h2>
</div>
          <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-8
  border
  border-white/5
  min-h-[140px]
md:min-h-[220px]
  flex
  flex-col
  justify-between
"
>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
              Portfolio Value
            </p>

            <h2
  className="
  text-2xl
md:text-6xl
  font-bold
  tracking-tight
  "
>
              ₹{portfolioValue.toLocaleString()}
            </h2>
          </div>
        </div>
      <div
  className="
  space-y-6
"
>
 <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-6
  border
  border-white/5
  "
>
  <h2 className="text-xl font-semibold mb-4">
    Quick Actions
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    <a
  href="/transactions/new"
  className="
  bg-black/30
  border
  border-white/5
  rounded-xl
  p-3
  text-sm
  text-center
  transition-all
  hover:bg-white/5
"
>
  Add Transaction
</a>

    <a 
    href="/accounts"
    className="
  bg-black/30
  border
  border-white/5
  rounded-xl
  p-3
  text-sm
  text-center
  transition-all
  hover:bg-white/5
">
  
  Add Account
    </a>

    <a href="/categories"className="
  bg-black/30
  border
  border-white/5
  rounded-xl
  p-3
  text-sm
  text-center
  transition-all
  hover:bg-white/5
">
      Categories
    </a>

    <a href="/investments" className="
  bg-black/30
  border
  border-white/5
  rounded-xl
  p-3
  text-sm
  text-center
  transition-all
  hover:bg-white/5
">
      Investments
    </a>

  </div>
</div> 
  <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-6
  border
  border-white/5
  "
>
  <h2 className="text-xl font-semibold mb-6">
    This Month
  </h2>

  <div
  className="
  grid
  grid-cols-2
  md:grid-cols-4
  gap-6
  "
>

    <div>
      <p className="text-zinc-500 text-sm">
        Income
      </p>

      <p className="text-green-500 text-2xl font-bold">
        ₹{monthlyIncome.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Expenses
      </p>

      <p className="text-red-500 text-2xl font-bold">
        ₹{monthlyExpenses.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Investments
      </p>

      <p className="text-blue-500 text-2xl font-bold">
        ₹{monthlyInvestments.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Savings
      </p>

      <p
        className={`text-2xl font-bold ${
          monthlySavings >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        ₹{monthlySavings.toLocaleString()}
      </p>
      <div
  className="
  grid
  grid-cols-2
  md:grid-cols-4
  gap-6
  "
> </div>
    </div>

  </div>
  </div>
</div>

<div className="bg-[#0F1117]
rounded-[32px]
p-6
md:p-8
border
border-white/5">
  <h2 className="text-xl font-semibold mb-4">
    Top Spending Categories
  </h2>

  {topCategories.length === 0 ? (
    <p className="text-zinc-500">
      No expenses this month
    </p>
  ) : (
    <div className="space-y-3">
      {topCategories.map(
        ([name, amount]) => (
          <div
            key={name}
            className="flex justify-between border-b border-zinc-800 pb-2"
          >
            <span>{name}</span>

            <span className="text-red-500 font-medium">
              ₹{amount.toLocaleString()}
            </span>
          </div>
        )
      )}
    </div>
  )}
</div>

<div className="bg-[#0F1117]
rounded-[32px]
p-6
md:p-8
border
border-white/5">
  <h2 className="text-xl font-semibold mb-4">
    Spending Breakdown
  </h2>

  <SpendingChart
    data={chartData}
  />
</div>

<div className="bg-[#0F1117]
rounded-[32px]
p-6
md:p-8
border
border-white/5">
  <h2 className="text-xl font-semibold mb-4">
    Spending Insights
  </h2>

  <div
  className="
  grid
  grid-cols-2
  md:grid-cols-4
  gap-6
  "
>

    <div>
      <p className="text-zinc-500 text-sm">
        Top Category
      </p>

      <p className="font-bold text-lg">
        {biggestCategory?.[0] ??
          "-"}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Largest Expense
      </p>

      <p className="font-bold text-lg">
        ₹
        {largestExpense
          ? Number(
              largestExpense.amount
            ).toLocaleString()
          : "0"}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Transactions
      </p>

      <p className="font-bold text-lg">
        {
          currentMonthTransactions.length
        }
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Avg Expense
      </p>

      <p className="font-bold text-lg">
        ₹
        {Math.round(
          averageExpense
        ).toLocaleString()}
      </p>
    </div>

  </div>
</div>
<div
  className="
  grid
  md:grid-cols-2
  gap-6
  "
>

        <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-6
  md:p-8
  border
  border-white/5
  "
>
  <h2 className="text-xl font-semibold mb-6">
    Accounts
  </h2>

  <div className="space-y-3">

    {accounts.length === 0 && (
      <p className="text-zinc-500">
        No accounts yet.
      </p>
    )}

    {accounts.map((account) => {
      const balance =
        calculateAccountBalance(
          account.id,
          Number(account.starting_balance),
          transactions
        );

      return (
        <div
          key={account.id}
          className="
          flex
          justify-between
          gap-4
          border-b
          border-white/5
          pb-3
          "
        >
          <span>{account.name}</span>

          <span>
            ₹{balance.toLocaleString()}
          </span>
        </div>
      );
    })}
  </div>
</div>

        <div
  className="
  bg-[#0F1117]
  rounded-[32px]
  p-6
  md:p-8
  border
  border-white/5
  "
>
  <h2 className="text-xl font-semibold mb-6">
    Recent Transactions
  </h2>

  <div className="space-y-3">

            {transactions.length === 0 && (
  <p className="text-zinc-500">
    No transactions yet.
  </p>
)}
            {transactions
          
  .slice(0, 5)
  .map((transaction) => (
              <div
                key={transaction.id}
                className="
flex
justify-between
gap-4
border-b
border-zinc-800
pb-3
"
              >
                <span>{transaction.title}</span>

                <span>
                  ₹{Number(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}