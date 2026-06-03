"use server";

import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function createCategory(
  formData: FormData
) {
  const name = formData.get("name") as string;

  const categoryType = formData.get(
    "categoryType"
  ) as string;

  const { error } = await supabase
    .from("categories")
    .insert({
      user_id:
        "00000000-0000-0000-0000-000000000001",

      name,

      category_type: categoryType,
    });

  if (error) {
    throw error;
  }

  revalidatePath("/categories");
  revalidatePath("/transactions/new");
}