import { createClient } from "@/supabase/server";

export async function getPortfolioHistory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } =
    await supabase
      .from("portfolio_snapshots")
      .select("*")
      .eq("user_id", user.id)
      .order(
        "snapshot_date",
        {
          ascending: true,
        }
      );

  return data ?? [];
}