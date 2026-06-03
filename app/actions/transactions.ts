"use server";

import { supabase } from "@/supabase/client";

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

if (!categoryId) {
  throw new Error(
    "Category is required"
  );
}

  const { error } = await supabase
    .from("transactions")
    .insert({
      user_id:
        "00000000-0000-0000-0000-000000000001",

      title,

      amount,

      account_id: accountId,

      category_id: categoryId,

      transaction_type: transactionType,

      transaction_date:
        new Date().toISOString(),
    });

  if (error) {
    console.error(error);
  }
}