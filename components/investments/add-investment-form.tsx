"use client";

import { createInvestment } from "@/app/actions/investments";
import { Account } from "@/types/accounts";
interface Props {
  accounts: Account[];
}
export function AddInvestmentForm({
  accounts,
}: Props) {
  return (
    <form
      action={createInvestment}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4"
    >
      <input
        name="name"
        placeholder="Nifty 50 ETF"
        className="w-full bg-zinc-800 rounded-xl p-4"
      />

      <select
        name="investmentType"
        className="w-full bg-zinc-800 rounded-xl p-4"
      >
        <option value="ETF">
          ETF
        </option>

        <option value="InvIT">
          InvIT
        </option>

        <option value="Stock">
          Stock
        </option>

        <option value="Gold">
          Gold
        </option>
      </select>

      <input
        name="units"
        type="number"
        placeholder="Units"
        className="w-full bg-zinc-800 rounded-xl p-4"
      />

      <input
        name="buyPrice"
        type="number"
        placeholder="Buy Price"
        className="w-full bg-zinc-800 rounded-xl p-4"
      />

      <input
  name="symbol"
  placeholder="NIFTYBEES"
  className="w-full bg-zinc-800 rounded-xl p-4"
/>
  <div>
  <label className="block mb-2">
    Account
  </label>

  <select
    name="accountId"
    required
    className="w-full bg-zinc-800 rounded-xl p-4"
  >
    <option value="">
      Select Account
    </option>

    {accounts.map((account) => (
      <option
        key={account.id}
        value={account.id}
      >
        {account.name}
      </option>
    ))}
  </select>
</div>
      <button
        type="submit"
        className="bg-white text-black px-5 py-3 rounded-full"
      >
        Add Investment
      </button>
    </form>
  );
}