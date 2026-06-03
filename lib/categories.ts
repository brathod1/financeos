import { supabase } from "@/supabase/client";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Category[]) || [];
}