export interface Transaction {
  id: string;

  user_id: string;

  transaction_type: string;

  account_id: string;

  transfer_account_id?: string;

  category_id?: string;

  title: string;

  notes?: string;

  amount: number;

  transaction_date: string;

  created_at: string;
}