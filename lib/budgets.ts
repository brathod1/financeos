import { supabase } from "@/supabase/client";
import { Budget } from "@/types/budget";

export async function getBudgets(): Promise<
  Budget[]
> {
  const { data, error } =
    await supabase
      .from("budgets")
      .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Budget[]) || [];
}