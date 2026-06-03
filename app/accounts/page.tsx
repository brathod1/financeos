import { getAccounts } from "@/lib/accounts";
import { AddAccountForm } from "@/components/accounts/add-account-form";
import { getTransactions } from "@/lib/transactions";
import { calculateAccountBalance } from "@/lib/balances";
import { EditAccountForm } from "@/components/accounts/edit-account-form";
export default async function AccountsPage() {
  const accounts = await getAccounts();
const transactions = await getTransactions();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 uppercase tracking-widest text-sm">
            Money In Accounts
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Accounts
          </h1>
        </div>

        <AddAccountForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <p className="text-zinc-500 uppercase text-sm">
              {account.account_type}
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {account.name}
            </h2>

            <p className="text-4xl font-bold mt-6">
  ₹{
    (
      account.account_type === "investment"
        ? Number(account.starting_balance)
        : calculateAccountBalance(
            account.id,
            Number(account.starting_balance),
            transactions
          )
    ).toLocaleString()
  }
</p>
<EditAccountForm account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}