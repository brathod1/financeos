import { createClient } from "@/supabase/server";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } =
    await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user.id)
      .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return (
    (data as Category[]) || []
  );
}