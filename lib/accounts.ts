import { supabase } from "@/supabase/client";

export async function getAccounts() {
  const { data, error } = await supabase
    .from("accounts")
    .select("*");

  console.log("ACCOUNTS DATA:", data);
  console.log("ACCOUNTS ERROR:", error);

  if (error) {
    return [];
  }

  return data || [];
}