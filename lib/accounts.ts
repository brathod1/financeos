import { supabase } from "@/supabase/client";
import { Account } from "@/types/accounts";

export async function getAccounts(): Promise<Account[]> {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Account[]) || [];
}