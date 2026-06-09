console.log("INVESTMENTS PAGE");
import { getInvestments } from "@/lib/investments";
import { AddInvestmentForm } from "@/components/investments/add-investment-form";
import { getAccounts } from "@/lib/accounts";
import { EditInvestmentForm } from "@/components/investments/edit-investment-form";
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
        investment.symbol ||
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

const allocationData =
  holdings.map(
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
const history =
  await getPortfolioHistory();

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

const totalProfitLoss =
  portfolioValue -
  totalInvested;

const portfolioReturn =
  totalInvested > 0
    ? (totalProfitLoss /
        totalInvested) *
      100
    : 0;
  return (
  <div className="space-y-8">
    <div>
      <p className="text-zinc-400 uppercase tracking-widest text-sm">
        Portfolio
      </p>

      <h1 className="text-5xl font-bold mt-2">
        Investments
      </h1>
    </div>

    <AddInvestmentForm
      accounts={accounts}
    />
  <form action={saveSnapshot}>
  <button
    type="submit"
    className="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800"
  >
    📸 Take Snapshot
  </button>
</form>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-8">
        Portfolio Summary
      </h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-zinc-500 text-sm">
            Invested
          </p>

          <p className="text-4xl font-bold mt-2">
            ₹
            {totalInvested.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-zinc-500 text-sm">
            Current Value
          </p>

          <p className="text-4xl font-bold mt-2">
            ₹
            {portfolioValue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800">
        <p className="text-zinc-500 text-sm">
          Profit / Loss
        </p>

        <div className="flex items-center gap-4 mt-2">
          <p
            className={`text-4xl font-bold ${
              totalProfitLoss >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹
            {totalProfitLoss.toLocaleString()}
          </p>

          <div
            className={`px-3 py-1 rounded-full text-sm ${
              totalProfitLoss >= 0
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {portfolioReturn.toFixed(
              2
            )}
            %
          </div>
        </div>
      </div>
    </div>
    <PortfolioHistoryChart
  data={history}
/>
    <AllocationChart
  title="Allocation by Holdings"
  data={allocationData}
/>

<AllocationChart
  title="Allocation by Asset Type"
  data={assetTypeData}
/>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
      {holdings.length === 0 ? (
        <div className="p-10 text-center text-zinc-500">
          No investments yet
        </div>
      ) : (
        holdings.map(
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
  <div className="flex justify-between">

    <div>
      <p className="text-zinc-500 text-sm">
        Qty {holding.units}
        {" • "}
        Avg ₹
        {avgCost.toFixed(2)}
      </p>

      <h3 className="text-2xl font-semibold mt-3">
        {holding.symbol.toUpperCase()}
      </h3>

      <p className="text-zinc-500 mt-2">
        Invested ₹
        {holding.invested.toLocaleString()}
      </p>
    </div>

    <div className="text-right">

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
  </div>
);}