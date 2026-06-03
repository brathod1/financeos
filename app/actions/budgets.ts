"use server";

import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function createBudget(
  formData: FormData
) {
  const categoryId = formData.get(
    "categoryId"
  ) as string;

  const monthlyLimit = Number(
    formData.get("monthlyLimit")
  );

  const { error } = await supabase
    .from("budgets")
    .insert({
      user_id:
        "00000000-0000-0000-0000-000000000001",
      category_id: categoryId,
      monthly_limit: monthlyLimit,
    });

  if (error) throw error;

  revalidatePath("/budgets");
}

export async function deleteBudget(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/budgets");
}