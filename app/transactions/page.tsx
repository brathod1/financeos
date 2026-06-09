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
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-10">

  <div>
    <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
      ACTIVITY
    </p>

    <h1 className="text-7xl font-bold tracking-tight mt-4">
      Transactions
    </h1>
  </div>

  <a
    href="/transactions/new"
    className="
      bg-white
      text-black
      px-8
      py-4
      rounded-full
      font-medium
      text-lg
    "
  >
    + Add
  </a>

</div>
<div className="grid gap-6 md:grid-cols-4">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-zinc-500 text-sm">
      Income
    </p>

    <h2 className="text-3xl font-bold text-green-500 mt-3">
      ₹{totalIncome.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-zinc-500 text-sm">
      Expenses
    </p>

    <h2 className="text-3xl font-bold text-red-500 mt-3">
      ₹{totalExpenses.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-zinc-500 text-sm">
      Investments
    </p>

    <h2 className="text-3xl font-bold text-blue-500 mt-3">
      ₹{totalInvestments.toLocaleString()}
    </h2>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <p className="text-zinc-500 text-sm">
      Transfers
    </p>

    <h2 className="text-3xl font-bold text-yellow-500 mt-3">
      ₹{totalTransfers.toLocaleString()}
    </h2>
  </div>

</div>
      <TransactionsList
  transactions={transactions}
  categories={categories}
/>
    </div>
  );
}