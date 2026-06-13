export interface Investment {
  id: string;

  user_id: string;

  name: string;

  symbol: string;

  investment_type: string;

  units: number;

  buy_price: number;

  current_price: number;

  transaction_id?: string;

  created_at: string;

  purchase_date: string;
}