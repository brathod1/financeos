
import { getInvestments } from "@/lib/investments";
import { AddInvestmentForm } from "@/components/investments/add-investment-form";
import { getAccounts } from "@/lib/accounts";
import {
  getRealizedProfit,
} from "@/lib/realized-gains";
import { getAssets }
from "@/lib/assets";
import {
  getInvestmentHistory,
} from "@/lib/investment-history";

import {
  InvestmentHistory,
} from "@/components/investments/investment-history";
import { EditInvestmentForm } from "@/components/investments/edit-investment-form";
import { AddInvestmentDialog }
from "@/components/investments/add-investment-dialog";
import { getCurrentPrice }
from "@/lib/market-prices";
import {
  SellInvestmentForm,
} from "@/components/investments/sell-investment-form";
import { AllocationChart }
from "@/components/investments/allocation-chart";
import {
  getPortfolioHistory,
} from "@/lib/portfolio-history";
import { saveSnapshot }
from "@/app/actions/portfolio";
import {
  PortfolioHistoryChart,
} from "@/components/investments/portfolio-history-chart";
export default async function InvestmentsPage() {
  const rawInvestments =
  await getInvestments();

const investments =
  await Promise.all(
    rawInvestments.map(
      async (investment) => {
        const currentPrice =
          investment.symbol
            ? await getCurrentPrice(
                investment.symbol
              )
            : 0;

        return {
          ...investment,
          currentPrice,
        };
      }
    )
  );
  
const holdings = Object.values(
  investments.reduce(
    (acc, investment) => {
      const symbol =
  investment.symbol
    ?.trim()
    .toUpperCase() ||
  "UNKNOWN";

      if (!acc[symbol]) {
        acc[symbol] = {
          symbol,

          name:
            investment.symbol ||
            investment.name,

          investmentType:
            investment.investment_type,

          units: 0,

          invested: 0,

          currentPrice:
            investment.currentPrice,
        };
      }

      acc[symbol].units +=
        Number(
          investment.units
        );

      acc[symbol].invested +=
        Number(
          investment.units
        ) *
        Number(
          investment.buy_price
        );

      return acc;
    },
    {} as Record<
      string,
      {
        symbol: string;
        name: string;
        investmentType: string;
        units: number;
        invested: number;
        currentPrice: number;
      }
    >
  )
);
holdings.sort(
  (a, b) =>
    b.units *
      b.currentPrice -
    a.units *
      a.currentPrice
);
const holdingsWithHistory =
  await Promise.all(
    holdings.map(
      async (
        holding
      ) => ({
        ...holding,

        history:
  await getInvestmentHistory(
    holding.symbol
  ),
      })
    )
  );
  console.log(
  "HOLDINGS WITH HISTORY",
  JSON.stringify(
    holdingsWithHistory,
    null,
    2
  )
);
const allocationData =
  holdingsWithHistory.map(
    (holding) => ({
      name:
        holding.symbol.toUpperCase(),

      value:
        holding.units *
        holding.currentPrice,
    })
  );

  const assetTypeData =
  Object.values(
    holdings.reduce(
      (acc, holding) => {
        const type =
          holding.investmentType;

        const value =
          holding.units *
          holding.currentPrice;

        if (!acc[type]) {
          acc[type] = {
            name: type,
            value: 0,
          };
        }

        acc[type].value += value;

        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          value: number;
        }
      >
    )
  );
const accounts =
  await getAccounts();
  const assets =
  await getAssets();
  
const history =
  await getPortfolioHistory();
const realizedProfit =
  await getRealizedProfit();
const totalInvested =
  investments.reduce(
    (sum, investment) =>
      sum +
      Number(investment.units) *
      Number(investment.buy_price),
    0
  );

const portfolioValue =
  investments.reduce(
    (sum, investment) =>
      sum +
      Number(investment.units) *
      Number(investment.currentPrice),
    0
  );

const unrealizedProfit =
  portfolioValue -
  totalInvested;

const totalReturn =
  unrealizedProfit +
  realizedProfit;

const portfolioReturn =
  totalInvested > 0
    ? (totalReturn /
        totalInvested) *
      100
    : 0;
  return (
  <div className="space-y-8">
    <div>
      <p className="text-zinc-400 uppercase tracking-widest text-sm">
        Portfolio
      </p>

      <h1 className="text-5xl md:text-7xl font-bold mt-2">
        Investments
      </h1>

      <p className="text-zinc-500 mt-4">
  Track portfolio value, returns and asset allocation.
</p>
<div className="mt-6">
  <AddInvestmentDialog
    accounts={accounts}
    assets={assets}
  />
</div>

    </div>
  
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <div
  className="
  flex
  justify-between
  items-center
  mb-8
  "
>
  <h2 className="text-xl font-semibold">
    Portfolio Summary
  </h2>

  <span
    className="
    px-3
    py-1
    rounded-full
    bg-white/5
    text-sm
    "
  >
    {holdingsWithHistory.length} Holdings
  </span>
</div>

      <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-6
  "
>
        <div>
          <p className="text-zinc-500 text-sm">
            Invested
          </p>

          <p className="text-3xl md:text-4xl font-bold mt-2">
            ₹
            {totalInvested.toLocaleString()}
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-zinc-500 text-sm">
            Current Value
          </p>

         <p className="text-3xl md:text-4xl font-bold mt-2">
            ₹
            {portfolioValue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800">

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    "
  >

    <div>
      <p className="text-zinc-500 text-sm">
        Unrealized Profit
      </p>

      <p
        className={`text-2xl font-bold ${
          unrealizedProfit >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        ₹
        {unrealizedProfit.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Realized Profit
      </p>

      <p
        className={`text-2xl font-bold ${
          realizedProfit >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        ₹
        {realizedProfit.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        Total Return
      </p>

      <p
        className={`text-2xl font-bold ${
          totalReturn >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        ₹
        {totalReturn.toLocaleString()}
      </p>

      <p className="text-zinc-500 text-sm mt-1">
        {portfolioReturn.toFixed(
          2
        )}
        %
      </p>
    </div>

  </div>

</div>
    </div>

    <div>
  <h2 className="text-xl font-semibold">
    Holdings
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    Current positions and returns
  </p>
</div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
      {holdingsWithHistory.length === 0 ? (
        <div
  className="
  p-6
  md:p-10
  text-center
  "
>
  <>
  <div className="text-5xl mb-4">
  💹
</div>

  <h3 className="text-xl font-semibold"> 
    No investments yet
  </h3>
</>
  <p className="text-zinc-500 mt-2">
    Add your first investment to start tracking returns.
  </p>
</div>
      ) : (
        holdingsWithHistory.map(
  (holding) => {
            const avgCost =
  holding.units > 0
    ? holding.invested /
      holding.units
    : 0;

const currentValue =
  holding.units *
  holding.currentPrice;

const profitLoss =
  currentValue -
  holding.invested;

const returnPercent =
  holding.invested > 0
    ? (profitLoss /
        holding.invested) *
      100
    : 0;

            return (
              <div
  key={holding.symbol}
  className="p-6 border-b border-zinc-800"
>
  <div
  className="
  flex
  flex-col
  md:flex-row
  gap-6
  md:justify-between
  "
>

    <div>
      <p className="text-zinc-500 text-sm">
        Qty {holding.units}
        {" • "}
        Avg ₹
        {avgCost.toFixed(2)}
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-3">
        {holding.symbol.toUpperCase()}
      </h3>
       <div className="mt-2">
  <span
    className="
    px-3
    py-1
    rounded-full
    text-xs
    bg-white/5
    border
    border-white/10
    "
  >
    {holding.investmentType}
  </span>
</div>         
      <div className="mt-3 space-y-1">
  <p className="text-zinc-500">
    Invested ₹
    {holding.invested.toLocaleString()}
  </p>

  <p className="text-white font-semibold">
    Current Value ₹
    {currentValue.toLocaleString()}
  </p>
</div>
    </div>

    <div className="md:text-right">

      <p
        className={`text-2xl font-bold ${
          profitLoss >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {profitLoss >= 0
          ? "+"
          : ""}
        ₹
        {profitLoss.toLocaleString()}
      </p>

      <p
        className={`text-sm ${
          profitLoss >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {returnPercent.toFixed(
          2
        )}
        %
      </p>

      <p className="text-zinc-500 mt-4">
        LTP ₹
        {holding.currentPrice.toFixed(
          2
        )}
      </p>

      <p className="text-zinc-400 text-sm">
        Current ₹
        {currentValue.toLocaleString()}
      </p>

      <details className="mt-4">

  <summary
    className="
    cursor-pointer
    text-sm
    text-zinc-400
    hover:text-white
    "
  >
    View History
  </summary>

  <InvestmentHistory
    history={
  holding.history
}
  />

</details>
<SellInvestmentForm
  symbol={holding.symbol}
  units={holding.units}
  avgCost={avgCost}
  currentPrice={
    holding.currentPrice
  }
  accounts={accounts}
/>
    </div>

  </div>
</div>
            );
          }
        )
      )}
    </div>


    <div>
  <h2 className="text-xl font-semibold">
    Performance
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    Portfolio value over time
  </p>
</div>
    <PortfolioHistoryChart
  data={history}
/>
<form action={saveSnapshot}>
  <button
    type="submit"
    className="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800"
  >
    📸 Take Snapshot
  </button>
</form>

<div>
  <h2 className="text-xl font-semibold">
    Allocation
  </h2>

  <p className="text-zinc-500 text-sm mt-1">
    Breakdown of your portfolio
  </p>
</div>
    <AllocationChart
  title="Allocation by Holdings"
  data={allocationData}
/>

<AllocationChart
  title="Allocation by Asset Type"
  data={assetTypeData}
/>

  </div>
);}