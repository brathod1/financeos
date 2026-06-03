export interface Account {
  id: string;
  user_id: string;

  name: string;

  account_type: string;

  starting_balance: number;

  include_in_cash: boolean;

  include_in_networth: boolean;

  created_at: string;
}