import { supabase } from "@/supabase/client";

export async function getTransactions() {
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

  return data || [];
}