import { createClient } from "@/supabase/server";
import { Budget } from "@/types/budget";

export async function getBudgets(): Promise<Budget[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } =
    await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Budget[]) || [];
}