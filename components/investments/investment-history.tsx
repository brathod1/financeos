interface HistoryItem {
  type: "BUY" | "SELL";

  symbol: string;

  units: number;

  price: number;

  date: string;

  profitLoss?: number;
}

export function InvestmentHistory({
  history,
}: {
  history: HistoryItem[];
}) {
    console.log(
    "INVESTMENT HISTORY COMPONENT",
    history
  );
  return (
    <div className="mt-4 space-y-3">

      {history.map(
        (item, index) => (
          <div
            key={index}
            className="
            bg-zinc-800
            rounded-xl
            p-4
            "
          >
            <div className="flex justify-between">

              <span
                className={
                  item.type ===
                  "BUY"
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {item.type}
              </span>

              <span className="text-zinc-400 text-sm">
                {item.date}
              </span>

            </div>

            <div className="mt-2 text-sm">

              <p>
                {item.units}
                {" "}
                units @ ₹
                {item.price}
              </p>

              {item.type === "SELL" && (
                  <p
  className={
    (item.profitLoss ?? 0) >= 0
      ? "text-green-500"
      : "text-red-500"
  }
>
  Profit:
  {" "}
  ₹
  {(item.profitLoss ?? 0).toFixed(
    2
  )}
</p>
                )}

            </div>
          </div>
        )
      )}

    </div>
  );
}