import { createClient }
from "@/supabase/server";

import { Asset }
from "@/types/asset";

export async function getAssets():
Promise<Asset[]> {

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("assets")
      .select("*")
      
      .order("name");
console.log(
  "ASSETS QUERY",
  data,
  error
);
  if (error) {
  console.log(
    "ASSETS ERROR",
    JSON.stringify(
      error,
      null,
      2
    )
  );

  return [];
}

  return (
    (data as Asset[]) || []
  );
}