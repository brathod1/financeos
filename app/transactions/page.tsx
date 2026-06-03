import { getTransactions } from "@/lib/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

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

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-6 border-b border-zinc-800"
          >
            <div>
              <p className="font-medium">
                {transaction.title}
              </p>
            </div>

            <p className="font-bold">
              ₹{Number(transaction.amount).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}