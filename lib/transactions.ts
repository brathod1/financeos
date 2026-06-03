import { supabase } from "@/supabase/client";
import { Transaction } from "@/types/transactions";

export async function getTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("transaction_date", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Transaction[]) || [];
}