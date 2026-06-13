"use server";

import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function updateInvestment(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const transactionId =
    formData.get(
      "transactionId"
    ) as string;

  const name = formData.get(
    "name"
  ) as string;

  const units = Number(
    formData.get("units")
  );

  const buyPrice = Number(
    formData.get("buyPrice")
  );
  const purchaseDate =
  formData.get(
    "purchaseDate"
  ) as string;

  const amount =
    units * buyPrice;

  const { error } =
    await supabase
      .from("investments")
      .update({
  name,
  units,
  buy_price:
    buyPrice,
  purchase_date:
    purchaseDate,
})
      .eq("id", id);

  if (error) {
    throw error;
  }

  await supabase
  .from("transactions")
  .update({
    title: `Buy ${name}`,
    amount,
    transaction_date:
      purchaseDate,
  })
    .eq(
      "id",
      transactionId
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


export async function deleteInvestment(
  formData: FormData
) {
  const id = formData.get(
    "id"
  ) as string;

  const transactionId =
    formData.get(
      "transactionId"
    ) as string;

  await supabase
    .from("transactions")
    .delete()
    .eq(
      "id",
      transactionId
    );

  await supabase
    .from("investments")
    .delete()
    .eq("id", id);

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