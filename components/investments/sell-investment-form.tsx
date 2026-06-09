"use client";

import { useState } from "react";
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

  const effectiveUnits =
    mode === "quantity"
      ? sellUnits
      : Number(
          (
            sellAmount /
            currentPrice
          ).toFixed(4)
        );

  const saleValue =
    effectiveUnits *
    currentPrice;

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
        action={sellInvestment}
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
          value={currentPrice}
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
                currentPrice
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

        <div className="bg-zinc-800 rounded-xl p-4 text-sm space-y-2">
          <p>
            Units:
            {" "}
            {effectiveUnits.toFixed(
              4
            )}
          </p>

          <p>
            Sale Value:
            ₹
            {saleValue.toFixed(
              2
            )}
          </p>

          <p>
            Cost Basis:
            ₹
            {costBasis.toFixed(
              2
            )}
          </p>

          <p
            className={
              profit >= 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            Profit:
            ₹
            {profit.toFixed(
              2
            )}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-medium"
        >
          Confirm Sell
        </button>
      </form>
    </details>
  );
}