import { getAccounts } from "@/lib/accounts";
import { AddAccountForm } from "@/components/accounts/add-account-form";
import { getTransactions } from "@/lib/transactions";
import { calculateAccountBalance } from "@/lib/balances";
import { EditAccountForm } from "@/components/accounts/edit-account-form";

import {
  Wallet,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export default async function AccountsPage() {
  const accounts =
    await getAccounts();

  const transactions =
    await getTransactions();

  const getIcon = (
    type: string
  ) => {
    switch (type) {
      case "checking":
        return (
          <Wallet
            size={24}
            className="text-blue-500"
          />
        );

      case "savings":
        return (
          <PiggyBank
            size={24}
            className="text-green-500"
          />
        );

      case "investment":
        return (
          <TrendingUp
            size={24}
            className="text-amber-500"
          />
        );

      default:
        return (
          <Wallet
            size={24}
            className="text-zinc-400"
          />
        );
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      <div
  className="
  flex
  flex-col
  md:flex-row
  gap-4
  md:items-center
  md:justify-between
  "
>

        <div>
  <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
    MONEY IN ACCOUNTS
  </p>

  <h1
  className="
  text-4xl
  md:text-7xl
  font-bold
  tracking-tight
  mt-2
  "
>
    Accounts
  </h1>

  <p className="text-zinc-500 text-lg mt-4">
    Manage your cash, savings and investment accounts.
  </p>
</div>

        <AddAccountForm />
      </div>

      {accounts.length === 0 ? (

  <div
    className="
    bg-[#0F1117]
    border
    border-white/5
    rounded-[32px]
    p-10
    text-center
    "
  >
    <div className="text-5xl mb-4">
      💰
    </div>

    <h2 className="text-2xl font-semibold">
      No Accounts Yet
    </h2>

    <p className="text-zinc-500 mt-3">
      Add your first bank account to start tracking your money.
    </p>
  </div>

) : (

  <div className="grid gap-6 md:grid-cols-2">

    {accounts.map(
          (account) => {
            const balance =
              calculateAccountBalance(
                account.id,
                Number(
                  account.starting_balance
                ),
                transactions
              );

            return (
              <div
                key={account.id}
                className="
                bg-[#0F1117]
                border
                border-white/5
                rounded-[32px]
                p-8
                min-h-[260px]
                flex
                flex-col
                justify-between
                "
              >
                <div>

                  <div
                    className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/5
                    flex
                    items-center
                    justify-center
                    "
                  >
                    {getIcon(
                      account.account_type
                    )}
                  </div>

                  <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs mt-6">
                    {account.account_type}
                  </p>

                  <h2 className="text-3xl font-semibold mt-2">
                    {account.name}
                  </h2>
                </div>

                <div>

                  <p className="text-5xl font-bold tracking-tight">
                    ₹
                    {balance.toLocaleString()}
                  </p>

                  <div className="mt-6">
                    <EditAccountForm
                      account={account}
                    />
                  </div>

                </div>
              </div>
            );
          }
        )}

      </div>
      )}
    </div>
  );
}