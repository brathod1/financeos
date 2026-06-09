import { createClient } from "@/supabase/server";
import { Investment } from "@/types/investment";

export async function getInvestments(): Promise<Investment[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } =
    await supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);
    return [];
  }

  return (
    (data as Investment[]) ||
    []
  );
}