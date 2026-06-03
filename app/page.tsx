
import { getAccounts } from "@/lib/accounts";
import { getTransactions } from "@/lib/transactions";
import { calculateAccountBalance } from "@/lib/balances";
export default async function HomePage() {
  const accounts = await getAccounts();
  const transactions = await getTransactions();

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

const portfolioValue = accounts
  .filter((a) => a.account_type === "investment")
  .reduce(
    (sum, a) => sum + Number(a.starting_balance),
    0
  );

const netWorth =
  cashAvailable + portfolioValue;
  return (
    
      <div className="space-y-8">
        <div>
          <p className="text-zinc-400 uppercase tracking-widest text-sm">
            Overview
          </p>

          <h1 className="text-5xl font-bold mt-2">
  Finance Dashboard
</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">
              Net Worth
            </p>

            <h2 className="text-4xl font-bold mt-4">
              ₹{netWorth.toLocaleString()}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">
              Cash Available
            </p>

            <h2 className="text-4xl font-bold mt-4">
              ₹{cashAvailable.toLocaleString()}
            </h2>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
  <p className="text-zinc-400 text-sm">
    Money Invested
  </p>

  <h2 className="text-4xl font-bold mt-4">
    ₹{moneyInvested.toLocaleString()}
  </h2>
</div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">
              Portfolio Value
            </p>

            <h2 className="text-4xl font-bold mt-4">
              ₹{portfolioValue.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">
            Accounts
          </h2>

          <div className="space-y-3">
            {accounts.map((account) => {
  const balance = calculateAccountBalance(
  account.id,
  Number(account.starting_balance),
  transactions
);

  return (
    <div
      key={account.id}
      className="flex justify-between border-b border-zinc-800 pb-3"
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

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">
            Recent Transactions
          </h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between border-b border-zinc-800 pb-3"
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
    
  );
}