"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
export async function createTransaction(
  formData: FormData
) {
  const title = formData.get("title") as string;

  const amount = Number(
    formData.get("amount")
  );

  const accountId = formData.get(
    "accountId"
  ) as string;

  const categoryId = formData.get(
    "categoryId"
  ) as string;

  const transferAccountId = formData.get(
  "transferAccountId"
) as string;

  const transactionType = formData.get(
    "transactionType"
  ) as string;

  if (!title?.trim()) {
  throw new Error("Title is required");
}

if (!amount || amount <= 0) {
  throw new Error(
    "Amount must be greater than 0"
  );
}

if (!accountId) {
  throw new Error(
    "Account is required"
  );
}

if (
  transactionType === "transfer" &&
  !transferAccountId
) {
  throw new Error(
    "Destination account required"
  );
}
if (
  transactionType === "expense" &&
  !categoryId
) {
  throw new Error(
    "Category is required for expenses"
  );
}
const authSupabase =
  await createClient();

const {
  data: { user },
} = await authSupabase.auth.getUser();

if (!user) {
  throw new Error(
    "Not authenticated"
  );
}

  const { error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,

      title,

      amount,

      account_id: accountId,

      transfer_account_id:
  transactionType === "transfer"
    ? transferAccountId
    : null,

      category_id:
  transactionType === "expense"
    ? categoryId
    : null,

      transaction_type: transactionType,

      transaction_date:
  new Date()
    .toISOString()
    .split("T")[0],
    });

  if (error) {
    console.error(error);
  }
}

import { revalidatePath } from "next/cache";

export async function updateTransaction(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const title = formData.get(
    "title"
  ) as string;
  
  const transactionType =
  formData.get(
    "transactionType"
  ) as string;

const transactionDate =
  formData.get(
    "transactionDate"
  ) as string;
  const amount = Number(
    formData.get("amount")
  );

  const { error } = await supabase
    .from("transactions")
    .update({
  title,
  amount,
  transaction_type:
    transactionType,
  transaction_date:
    transactionDate,
})
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/transactions");
  revalidatePath("/");
  redirect("/transactions");
}

export async function deleteTransaction(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
  console.error(
    "Delete transaction error:",
    error
  );

  throw error;
}

  revalidatePath("/transactions");
  revalidatePath("/");
  redirect("/transactions");
}