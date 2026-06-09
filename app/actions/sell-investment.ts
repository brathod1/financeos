"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function sellInvestment(
  formData: FormData
) {
  const symbol =
    formData.get(
      "symbol"
    ) as string;

  const sellUnits =
    Number(
      formData.get(
        "sellUnits"
      )
    );

  const sellPrice =
    Number(
      formData.get(
        "sellPrice"
      )
    );

  const accountId =
    formData.get(
      "accountId"
    ) as string;

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

  // Validation
  if (!symbol) {
    throw new Error(
      "Symbol is required"
    );
  }

  if (
    !sellUnits ||
    sellUnits <= 0
  ) {
    throw new Error(
      "Invalid quantity"
    );
  }

  if (
    !sellPrice ||
    sellPrice <= 0
  ) {
    throw new Error(
      "Invalid sell price"
    );
  }

  if (!accountId) {
    throw new Error(
      "Please select an account"
    );
  }

  const { data: investments } =
    await supabase
  .from("investments")
  .select("*")
  .eq("user_id", user.id)
  .eq("symbol", symbol)
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (
    !investments ||
    investments.length === 0
  ) {
    throw new Error(
      "Holding not found"
    );
  }

  const totalUnits =
    investments.reduce(
      (sum, investment) =>
        sum +
        Number(
          investment.units
        ),
      0
    );

  if (
    sellUnits > totalUnits
  ) {
    throw new Error(
      `Cannot sell more than ${totalUnits} units`
    );
  }

  let remainingToSell =
    sellUnits;

  for (const investment of investments) {
    if (
      remainingToSell <= 0
    ) {
      break;
    }

    const units =
      Number(
        investment.units
      );

    // Sell entire lot
    if (
      units <=
      remainingToSell
    ) {
      remainingToSell -=
        units;

      await supabase
        .from(
          "investments"
        )
        .delete()
        .eq(
          "id",
          investment.id
        );
    }

    // Sell partial lot
    else {
      await supabase
        .from(
          "investments"
        )
        .update({
          units: Number(
            (
              units -
              remainingToSell
            ).toFixed(4)
          ),
        })
        .eq(
          "id",
          investment.id
        );

      remainingToSell = 0;
    }
  }

  const saleAmount =
    sellUnits *
    sellPrice;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const { error } =
    await supabase
      .from("transactions")
      .insert({
        user_id:
          "00000000-0000-0000-0000-000000000001",

        title:
          `Sell ${sellUnits.toFixed(
            4
          )} ${symbol.toUpperCase()}`,

        amount:
          saleAmount,

        account_id:
          accountId,

        transaction_type:
          "investment_sell",

        transaction_date:
          today,
      });

  if (error) {
    throw error;
  }

  revalidatePath(
    "/investments"
  );

  revalidatePath(
    "/accounts"
  );

  revalidatePath(
    "/transactions"
  );

  revalidatePath("/");
}