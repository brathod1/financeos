export interface Asset {
  id: string;

  symbol: string;

  name: string;

  asset_type: string;

  exchange: string | null;

  sector: string | null;

  currency: string | null;

  fund_house: string | null;

  isin: string | null;

  market_cap: string | null;

  logo_url: string | null;

  is_active: boolean;

  created_at: string;

  amfi_code: string | null;

plan_type: string | null;

option_type: string | null;

current_price: number | null;

last_updated: string | null;
}