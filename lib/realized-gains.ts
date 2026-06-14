import { createClient }
from "@/supabase/server";

export async function getRealizedProfit() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return 0;
  }

  const { data, error } =
    await supabase
      .from("realized_gains")
      .select("profit_loss")
      .eq(
        "user_id",
        user.id
      );

  if (error) {
    console.error(error);
    return 0;
  }

  return (
    data?.reduce(
      (sum, row) =>
        sum +
        Number(
          row.profit_loss
        ),
      0
    ) || 0
  );
}