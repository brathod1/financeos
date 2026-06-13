export interface Asset {
  id: string;

  symbol: string;

  name: string;

  asset_type: string;

  exchange: string | null;

  is_active: boolean;

  created_at: string;
}