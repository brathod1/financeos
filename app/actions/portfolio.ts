"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { getPortfolioValue } from "@/lib/portfolio";



export async function saveSnapshot() {
  const portfolioValue =
    await getPortfolioValue();

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

const authSupabase =
  await createClient();

const {
  data: { user },
} =
  await authSupabase.auth.getUser();

if (!user) {
  throw new Error(
    "Not authenticated"
  );
}

  const { data: existing } =
    await supabase
      .from("portfolio_snapshots")
      .select("id")
      .eq(
  "user_id",
  user.id
)

.eq(
  "snapshot_date",
  today
)
      
      .maybeSingle();

  let error = null;

  if (existing) {
    const result =
      await supabase
        .from(
          "portfolio_snapshots"
        )
        .update({
          portfolio_value:
            portfolioValue,

          net_worth:
            portfolioValue,
        })
        .eq(
  "user_id",
  user.id
)

.eq(
  "snapshot_date",
  today
)

    error = result.error;

    console.log(
      "Updated existing snapshot"
    );
  } else {
    const result =
      await supabase
        .from(
          "portfolio_snapshots"
        )
        .insert({
  user_id:
    user.id,

  snapshot_date:
    today,

  portfolio_value:
    portfolioValue,

  net_worth:
    portfolioValue,
});

    error = result.error;

    console.log(
      "Created new snapshot"
    );
  }

  if (error) {
    console.error(error);
    throw error;
  }

  revalidatePath(
    "/investments"
  );
}