export interface InvestmentHistory {
  type: "BUY" | "SELL";

  symbol: string;

  units: number;

  price: number;

  date: string;

  profitLoss?: number;
}