"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Delete user data first

  await supabase
    .from("transactions")
    .delete()
    .eq("user_id", user.id);

  await supabase
    .from("investments")
    .delete()
    .eq("user_id", user.id);

  await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id);

  await supabase
    .from("categories")
    .delete()
    .eq("user_id", user.id);

  await supabase
    .from("accounts")
    .delete()
    .eq("user_id", user.id);

  await supabase
    .from("portfolio_snapshots")
    .delete()
    .eq("user_id", user.id);

  await supabase.auth.signOut();

  redirect("/login");
}