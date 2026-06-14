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
const purchaseDate =
  formData.get(
    "purchaseDate"
  ) as string;
  const investmentAmount =
    units * buyPrice;
if (!name?.trim()) {
  throw new Error(
    "Please select an asset"
  );
}

if (!symbol?.trim()) {
  throw new Error(
    "Please select an asset"
  );
}

if (!investmentType?.trim()) {
  throw new Error(
    "Invalid asset type"
  );
}

if (!accountId?.trim()) {
  throw new Error(
    "Please select an account"
  );
}

if (
  !units ||
  units <= 0
) {
  throw new Error(
    "Units must be greater than 0"
  );
}

if (
  !buyPrice ||
  buyPrice <= 0
) {
  throw new Error(
    "Buy price must be greater than 0"
  );
}

if (
  !purchaseDate
) {
  throw new Error(
    "Purchase date is required"
  );
}


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
console.log(
  "CURRENT USER",
  user.id
);
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
  purchaseDate,
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

          purchase_date:
  purchaseDate,
      });

  if (error) {
    console.error(error);
    throw error;
  }
const serverSupabase =
  await createClient();

const { error: historyError } =
  await serverSupabase
    .from(
      "investment_transactions"
    )
    .insert({
      user_id: user.id,

      symbol,

      name,

      transaction_type:
        "BUY",

      units,

      price: buyPrice,

      amount:
        investmentAmount,

      transaction_date:
        purchaseDate,
    });

console.log(
  "BUY HISTORY ERROR",
  historyError
);
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