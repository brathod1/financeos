"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategory(
  formData: FormData
) {
  const name =
    formData.get("name") as string;

  const categoryType =
    formData.get(
      "categoryType"
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

  const { error } =
    await supabase
      .from("categories")
      .insert({
        user_id: user.id,

        name,

        category_type:
          categoryType,
      });

  if (error) {
    console.error(error);
    throw error;
  }

  revalidatePath(
    "/categories"
  );

  revalidatePath(
    "/transactions/new"
  );
}

export async function deleteCategory(
  formData: FormData
) {
  const categoryId =
    formData.get("id") as string;

  const { data: transactions } =
    await supabase
      .from("transactions")
      .select("id")
      .eq(
        "category_id",
        categoryId
      )
      .limit(1);

  if (
    transactions &&
    transactions.length > 0
  ) {
    throw new Error(
      "Category is being used by transactions."
    );
  }

  const { error } =
    await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

  if (error) {
    throw error;
  }

  revalidatePath(
    "/categories"
  );

  revalidatePath(
    "/transactions/new"
  );
}