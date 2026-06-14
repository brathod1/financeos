"use client";

import { createInvestment } from "@/app/actions/investments";
import {
  useRef,
  useState,
  useTransition,
} from "react";
import { Account } from "@/types/accounts";
import { Asset } from "@/types/asset";
import { AssetSearch } from "./asset-search";
interface Props {
  accounts: Account[];
  assets: Asset[];

  setOpen: (
    open: boolean
  ) => void;
}
export function AddInvestmentForm({
  accounts,
  assets,
  setOpen,
}: Props) {
  const formRef =
  useRef<HTMLFormElement>(
    null
  );
  const [selectedAsset, setSelectedAsset] =
  useState<Asset | null>(
    null
  );
  const [isPending, startTransition] =
  useTransition();
  console.log(
  "ASSETS FORM",
  assets
);
  async function handleSubmit(
  formData: FormData
) {
  startTransition(
    async () => {
      await createInvestment(
        formData
      );

      formRef.current?.reset();

      setSelectedAsset(
        null
      );

      setOpen(false);
    }
  );
}
  return (
    <form
  ref={formRef}
  action={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4"
    >
      <div>
  <label className="block mb-2">
    Search Asset
  </label>

  <AssetSearch
    assets={assets}
    onSelect={(asset) =>
      setSelectedAsset(
        asset
      )
    }
  />
</div>
      <input
  name="name"
  placeholder="Asset Name"
  value={
    selectedAsset?.name ??
    ""
  }
  readOnly
  className="w-full bg-zinc-800 rounded-xl p-4"
/>

    <select
  name="investmentTypeDisplay"
  value={
    selectedAsset?.asset_type ?? ""
  }
  disabled
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
  type="hidden"
  name="investmentType"
  value={
    selectedAsset?.asset_type ?? ""
  }
/>

      <input
  name="units"
  type="number"
  min="0.0001"
required
  step="0.01"
  placeholder="Units"
  className="w-full bg-zinc-800 rounded-xl p-4"
/>

      <input
  name="buyPrice"
  type="number"
  min="0.01"
required
  step="0.01"
  placeholder="Buy Price"
  className="w-full bg-zinc-800 rounded-xl p-4"
/>

      <input
  name="symbol"
  value={
    selectedAsset?.symbol ??
    ""
  }
  required
  readOnly
  className="w-full bg-zinc-800 rounded-xl p-4"
/>
<div>
  <label className="block mb-2">
    Purchase Date
  </label>

  <input
    type="date"
    name="purchaseDate"
    required
    defaultValue={
      new Date()
        .toISOString()
        .split("T")[0]
    }
    className="
    w-full
    bg-zinc-800
    rounded-xl
    p-4
    "
  />
</div>
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
  disabled={isPending}
  className="
    bg-white
    text-black
    px-5
    py-3
    rounded-full
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {isPending
    ? "Adding..."
    : "Add Investment"}
</button>
    </form>
  );
}