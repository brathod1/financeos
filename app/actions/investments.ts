"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createInvestment(
  formData: FormData
) {
  const name =
    formData.get("name") as string;

  const investmentType =
    formData.get(
      "investmentType"
    ) as string;

  const units = Number(
    formData.get("units")
  );

  const buyPrice = Number(
    formData.get("buyPrice")
  );

  const accountId =
    formData.get(
      "accountId"
    ) as string;

  const symbol =
    formData.get(
      "symbol"
    ) as string;

  const investmentAmount =
    units * buyPrice;

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

  const {
    data: transaction,
    error: transactionError,
  } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,

      title: `Buy ${name}`,

      amount:
        investmentAmount,

      account_id:
        accountId,

      transaction_type:
        "investment",

      transaction_date:
        today,
    })
    .select()
    .single();

  if (transactionError) {
    console.error(
      transactionError
    );
    throw transactionError;
  }

  const { error } =
    await supabase
      .from("investments")
      .insert({
        user_id: user.id,

        name,

        symbol,

        account_id:
          accountId,

        investment_type:
          investmentType,

        units,

        buy_price:
          buyPrice,

        transaction_id:
          transaction.id,
      });

  if (error) {
    console.error(error);
    throw error;
  }

  revalidatePath(
    "/investments"
  );

  revalidatePath(
    "/transactions"
  );

  revalidatePath(
    "/accounts"
  );

  revalidatePath("/");
}