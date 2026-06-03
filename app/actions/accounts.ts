"use server";

import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function createAccount(
  formData: FormData
) {
  const name = formData.get("name") as string;

  const accountType = formData.get(
    "accountType"
  ) as string;

  const startingBalance = Number(
    formData.get("startingBalance")
  );

  const includeInCash =
    formData.get("includeInCash") === "on";

  const includeInNetWorth =
    formData.get("includeInNetWorth") ===
    "on";

  const { error } = await supabase
    .from("accounts")
    .insert({
      user_id:
        "00000000-0000-0000-0000-000000000001",

      name,

      account_type: accountType,

      starting_balance:
        startingBalance,

      include_in_cash:
        includeInCash,

      include_in_networth:
        includeInNetWorth,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  revalidatePath("/accounts");
}

export async function updateAccount(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const name = formData.get("name") as string;

  const accountType = formData.get(
    "accountType"
  ) as string;

  const startingBalance = Number(
    formData.get("startingBalance")
  );

  const includeInCash =
    formData.get("includeInCash") === "on";

  const includeInNetWorth =
    formData.get("includeInNetWorth") ===
    "on";

  const { error } = await supabase
    .from("accounts")
    .update({
      name,
      account_type: accountType,
      starting_balance: startingBalance,
      include_in_cash: includeInCash,
      include_in_networth:
        includeInNetWorth,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  revalidatePath("/accounts");
  revalidatePath("/");
}