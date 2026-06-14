"use client";

import {
  useState,
  useTransition,
} from "react";
import { sellInvestment } from "@/app/actions/sell-investment";
import { Account } from "@/types/accounts";

interface Props {
  symbol: string;
  units: number;
  avgCost: number;
  currentPrice: number;
  accounts: Account[];
}

export function SellInvestmentForm({
  symbol,
  units,
  avgCost,
  currentPrice,
  accounts,
}: Props) {
  const [mode, setMode] =
    useState<"quantity" | "amount">(
      "quantity"
    );

  const [sellUnits, setSellUnits] =
    useState(1);

  const [sellAmount, setSellAmount] =
    useState(100);
    const [sellPrice, setSellPrice] =
  useState(currentPrice);

  const [sellDate, setSellDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );
const [showConfirm, setShowConfirm] =
  useState(false);

  const [isPending, startTransition] =
  useTransition();
  const effectiveUnits =
  mode === "quantity"
    ? sellUnits
    : Number(
        (
          sellAmount /
          sellPrice
        ).toFixed(4)
      );

  const saleValue =
  effectiveUnits *
  sellPrice;

  const costBasis =
    effectiveUnits *
    avgCost;

  const profit =
    saleValue -
    costBasis;

  return (
    <details className="mt-4">
      <summary className="cursor-pointer text-red-400 text-sm hover:text-red-300">
        Sell
      </summary>

      <form
  action={(formData) => {
    startTransition(
      async () => {
        await sellInvestment(
          formData
        );
      }
    );
  }}
  className="mt-4 space-y-4"
>
        <input
          type="hidden"
          name="symbol"
          value={symbol}
        />

        <input
          type="hidden"
          name="sellUnits"
          value={effectiveUnits}
        />

        <input
  type="hidden"
  name="sellPrice"
  value={sellPrice}
/>

<input
  type="hidden"
  name="sellDate"
  value={sellDate}
/>

        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={
                mode === "quantity"
              }
              onChange={() =>
                setMode(
                  "quantity"
                )
              }
            />
            Quantity
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={
                mode === "amount"
              }
              onChange={() =>
                setMode(
                  "amount"
                )
              }
            />
            Amount
          </label>
        </div>

        <div className="bg-zinc-800 rounded-xl p-3">
          <p className="text-zinc-400 text-sm">
            Current Market Price
          </p>

          <p className="font-medium">
            ₹
            {currentPrice.toFixed(
              2
            )}
          </p>
        </div>
         <div>
  <label className="text-zinc-400 text-sm block mb-2">
    Sell Price
  </label>

  <input
    type="number"
    step="0.01"
    min="0"
    value={sellPrice}
    onChange={(e) =>
      setSellPrice(
        Number(
          e.target.value
        )
      )
    }
    className="
    w-full
    bg-zinc-800
    rounded-xl
    p-3
    "
  />
</div>

<div>
  <label className="text-zinc-400 text-sm block mb-2">
    Sell Date
  </label>

  <input
    type="date"
    value={sellDate}
    onChange={(e) =>
      setSellDate(
        e.target.value
      )
    }
    className="
    w-full
    bg-zinc-800
    rounded-xl
    p-3
    "
  />
</div>
        {mode === "quantity" && (
          <>
            <div>
              <label className="text-zinc-400 text-sm block mb-2">
                Quantity to Sell
                (Max {units})
              </label>

              <input
                type="number"
                step="0.0001"
                min="0"
                max={units}
                value={sellUnits}
                onChange={(e) =>
                  setSellUnits(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full bg-zinc-800 rounded-xl p-3"
              />
            </div>

            <div className="bg-zinc-800 rounded-xl p-3">
              Amount Received:
₹
{(
  sellUnits *
  sellPrice
).toFixed(2)}
            </div>
          </>
        )}

        {mode === "amount" && (
          <>
            <div>
              <label className="text-zinc-400 text-sm block mb-2">
                Amount to Sell
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                value={sellAmount}
                onChange={(e) =>
                  setSellAmount(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full bg-zinc-800 rounded-xl p-3"
              />
            </div>

            <div className="bg-zinc-800 rounded-xl p-3">
              Quantity:
              {" "}
              {effectiveUnits.toFixed(
                4
              )}
              {" "}
              units
            </div>
          </>
        )}

        <select
          name="accountId"
          required
          className="w-full bg-zinc-800 rounded-xl p-3"
        >
          <option value="">
            Select Account
          </option>

          {accounts.map(
            (account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            )
          )}
        </select>

        <div
  className="
  bg-zinc-800
  rounded-xl
  p-4
  border
  border-zinc-700
  "
>
  <p
    className="
    text-xs
    uppercase
    tracking-widest
    text-zinc-500
    mb-4
    "
  >
    Trade Preview
  </p>

  <div className="space-y-3 text-sm">

    <div className="flex justify-between">
      <span className="text-zinc-400">
        Asset
      </span>

      <span className="font-medium">
        {symbol}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">
        Units
      </span>

      <span>
        {effectiveUnits.toFixed(4)}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">
        Sale Price
      </span>

      <span>
        ₹{sellPrice.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">
        Sale Value
      </span>

      <span>
        ₹{saleValue.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">
        Cost Basis
      </span>

      <span>
        ₹{costBasis.toFixed(2)}
      </span>
    </div>

    <div className="border-t border-zinc-700 pt-3 flex justify-between">

      <span className="font-medium">
        Realized P&L
      </span>

      <span
        className={
          profit >= 0
            ? "text-green-500 font-semibold"
            : "text-red-500 font-semibold"
        }
      >
        {profit >= 0
          ? "+"
          : ""}
        ₹
        {profit.toFixed(2)}
      </span>

    </div>
  </div>
</div>

        {!showConfirm ? (
  <button
    type="button"
    onClick={() =>
      setShowConfirm(true)
    }
    className="
      w-full
      bg-red-600
      hover:bg-red-700
      rounded-xl
      py-3
      font-medium
    "
  >
    Review Sale
  </button>
) : (
  <div
    className="
      bg-zinc-900
      border
      border-red-500/30
      rounded-xl
      p-4
      space-y-4
    "
  >
    <div>
      <h4 className="font-semibold">
        Confirm Sale
      </h4>

      <p className="text-zinc-400 text-sm mt-1">
        Please review the details
        before selling.
      </p>
    </div>

    <div className="space-y-2 text-sm">

      <div className="flex justify-between">
        <span>Asset</span>
        <span>{symbol}</span>
      </div>

      <div className="flex justify-between">
        <span>Units</span>
        <span>
          {effectiveUnits.toFixed(4)}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Sale Value</span>
        <span>
          ₹{saleValue.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Cost Basis</span>
        <span>
          ₹{costBasis.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between font-semibold">
        <span>Profit / Loss</span>

        <span
          className={
            profit >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {profit >= 0
            ? "+"
            : ""}
          ₹
          {profit.toFixed(2)}
        </span>
      </div>

    </div>

    <div className="flex gap-3">

      <button
  type="button"
  disabled={isPending}
  onClick={() =>
    setShowConfirm(false)
  }
        className="
          flex-1
          border
          border-zinc-700
          rounded-xl
          py-3
        "
      >
        Cancel
      </button>

      <button
  type="submit"
  disabled={isPending}
  className="
    flex-1
    bg-red-600
    hover:bg-red-700
    rounded-xl
    py-3
    font-medium
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {isPending
    ? "Selling..."
    : "Sell Now"}
</button>

    </div>
  </div>
)}
      </form>
    </details>
  );
}