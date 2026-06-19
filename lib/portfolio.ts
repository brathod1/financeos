import { getInvestments } from "@/lib/investments";
import { getCurrentPrice } from "@/lib/market-prices";


export async function getPortfolioValue() {
  const investments =
    await getInvestments();

  let value = 0;

  for (const investment of investments) {
    const currentPrice =
      investment.symbol
        ? await getCurrentPrice(
            investment.symbol
          )
        : 0;

    value +=
      Number(investment.units) *
      currentPrice;
  }

  return value;
}