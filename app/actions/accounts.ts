"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
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

  const authSupabase =
  await createClient();

const {
  data: { user },
} = await authSupabase.auth.getUser();

console.log(
  "USER:",
  user
);

if (!user) {
  console.log(
    "AUTH FAILED"
  );
  return;
}

const { error } = await supabase
  .from("accounts")
  .insert({
    user_id: user.id,

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

export async function deleteAccount(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const { count } = await supabase
    .from("transactions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("account_id", id);

  if ((count ?? 0) > 0) {
    throw new Error(
      "Cannot delete account with transactions"
    );
  }

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/accounts");
  revalidatePath("/");
}