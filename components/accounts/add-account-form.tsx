"use client";

import { createAccount } from "@/app/actions/accounts";

export function AddAccountForm() {
  return (
    <form
      action={createAccount}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        Add Account
      </h2>

      <input
        name="name"
        required
        placeholder="Account Name"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
      />

      <select
        name="accountType"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
      >
        <option value="checking">
          Checking
        </option>

        <option value="savings">
          Savings
        </option>

        <option value="investment">
          Investment
        </option>
      </select>

      <input
        name="startingBalance"
        type="number"
        min="0"
        defaultValue="0"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="includeInCash"
          defaultChecked
        />

        Include In Cash
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="includeInNetWorth"
          defaultChecked
        />

        Include In Net Worth
      </label>

      <button
        type="submit"
        className="bg-white text-black px-5 py-3 rounded-full font-medium"
      >
        Create Account
      </button>
    </form>
  );
}