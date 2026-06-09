import { createClient } from "@/supabase/server";
import { Transaction } from "@/types/transactions";

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("transaction_date", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Transaction[]) || [];
}