import { getTransactions } from "@/lib/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 uppercase tracking-widest text-sm">
            Activity
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Transactions
          </h1>
        </div>

        <a
  href="/transactions/new"
  className="bg-white text-black px-5 py-3 rounded-full font-medium"
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
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
  {transactions.length === 0 ? (
    <div className="p-10 text-center text-zinc-500">
      No transactions yet
    </div>
  ) : (
    transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-6 border-b border-zinc-800"
          >
            <div>
  <p className="font-medium">
    {transaction.title}
  </p>

  <p className="text-sm text-zinc-500">
  {transaction.transaction_type}
</p>

<p className="text-xs text-zinc-600">
  {new Date(
    transaction.transaction_date
  ).toLocaleDateString()}
</p>
</div>

            <p
  className={`font-bold ${
    transaction.transaction_type === "income"
      ? "text-green-500"
      : transaction.transaction_type ===
        "expense"
      ? "text-red-500"
      : transaction.transaction_type ===
        "investment"
      ? "text-blue-500"
      : "text-yellow-500"
  }`}
>
  {transaction.transaction_type ===
"income"
  ? "+"
  : "-"}
₹{Number(
  transaction.amount
).toLocaleString()}
</p>
          </div>
                ))
      )}
    </div>
    </div>
  );
}