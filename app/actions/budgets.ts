"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBudget(
  formData: FormData
) {
  const categoryId = formData.get(
    "categoryId"
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
  const monthlyLimit = Number(
    formData.get("monthlyLimit")
  );

  const { error } = await supabase
    .from("budgets")
    .insert({
      user_id: user.id,
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