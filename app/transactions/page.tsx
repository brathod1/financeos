import { getTransactions } from "@/lib/transactions";
import { EditTransactionForm } from "@/components/transactions/edit-transaction-form";
import { TransactionsList } from "@/components/transactions/transactions-list";
import { getCategories } from "@/lib/categories";
export default async function TransactionsPage() {
  const transactions = await getTransactions();
  const categories = await getCategories();
  const totalIncome = transactions
  .filter(
    (transaction) =>
      transaction.transaction_type === "income"
  )
  .reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

const totalExpenses = transactions
  .filter(
    (transaction) =>
      transaction.transaction_type === "expense"
  )
  .reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

const totalInvestments = transactions
  .filter(
    (transaction) =>
      transaction.transaction_type === "investment"
  )
  .reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );

const totalTransfers = transactions
  .filter(
    (transaction) =>
      transaction.transaction_type === "transfer"
  )
  .reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount),
    0
  );
  return (
    <div className="space-y-8 w-full">
      <div
  className="
  flex
  flex-col
  md:flex-row
  gap-4
  md:items-center
  md:justify-between
  mb-10
  "
>

  <div>
    <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
      ACTIVITY
    </p>

    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mt-2">
      Transactions
    </h1>
    <p className="text-zinc-500 mt-3">
  Track income, expenses and investments.
</p>
  </div>

  <a
    href="/transactions/new"
    className="
  w-fit
  bg-white
  text-black
  px-5
  py-3
  rounded-xl
  font-medium
  text-center
"
  >
    + Add
  </a>

</div>
<div
  className="
  w-full
  grid
  grid-cols-2
  md:grid-cols-4
  gap-4
  "
>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
    <p className="text-zinc-500 text-sm">
      Income
    </p>

    <h2
  className="
  text-2xl
  md:text-3xl
  font-bold
  mt-2
  "
>
      ₹{totalIncome.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
    <p className="text-zinc-500 text-sm">
      Expenses
    </p>

    <h2
  className="
  text-2xl
  md:text-3xl
  font-bold
  mt-2
  "
>
      ₹{totalExpenses.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
    <p className="text-zinc-500 text-sm">
      Investments
    </p>

    <h2
  className="
  text-2xl
  md:text-3xl
  font-bold
  mt-2
  "
>
      ₹{totalInvestments.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
    <p className="text-zinc-500 text-sm">
      Transfers
    </p>

    <h2
  className="
  text-2xl
  md:text-3xl
  font-bold
  mt-2
  "
>
      ₹{totalTransfers.toLocaleString()}
    </h2>
  </div>

</div>
<div>
  <h2 className="text-xl font-semibold">
    Recent Transactions
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    Latest activity across all accounts
  </p>
</div>
      <TransactionsList
  transactions={transactions}
  categories={categories}
/>
    </div>
  );
}