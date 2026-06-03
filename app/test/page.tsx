import { getAccounts } from "@/lib/accounts";
import { getTransactions } from "@/lib/transactions";

export default async function HomePage() {
  const accounts = await getAccounts();
  const transactions = await getTransactions();

  const cashAvailable = accounts
    .filter((a) => a.include_in_cash)
    .reduce(
      (sum, a) => sum + Number(a.starting_balance),
      0
    );

  const portfolioValue = accounts
    .filter((a) => a.account_type === "investment")
    .reduce(
      (sum, a) => sum + Number(a.starting_balance),
      0
    );

  const netWorth = accounts
    .filter((a) => a.include_in_networth)
    .reduce(
      (sum, a) => sum + Number(a.starting_balance),
      0
    );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        FinanceOS
      </h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-sm text-gray-500">
            Net Worth
          </h2>
          <p className="text-3xl font-bold">
            ₹{netWorth.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-sm text-gray-500">
            Cash Available
          </h2>
          <p className="text-3xl font-bold">
            ₹{cashAvailable.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-sm text-gray-500">
            Portfolio Value
          </h2>
          <p className="text-3xl font-bold">
            ₹{portfolioValue.toLocaleString()}
          </p>
        </div>
      </div>

      <>
  <div className="bg-white rounded-xl p-6 shadow mb-6">
    <h2 className="text-xl font-semibold mb-4">
      Accounts
    </h2>

    <div className="space-y-2">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="flex justify-between border-b pb-2"
        >
          <span>{account.name}</span>

          <span>
            ₹
            {Number(
              account.starting_balance
            ).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-white rounded-xl p-6 shadow">
    <h2 className="text-xl font-semibold mb-4">
      Recent Transactions
    </h2>

    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between border-b pb-2"
        >
          <span>{transaction.title}</span>

          <span>
            ₹{Number(transaction.amount).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  </div>
</>
    </main>
  );
}