"use server";

import { supabase } from "@/supabase/client";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function sellInvestment(
  formData: FormData
) {
  const symbol =
    formData.get(
      "symbol"
    ) as string;

  const sellUnits =
    Number(
      formData.get(
        "sellUnits"
      )
    );

  const sellPrice =
    Number(
      formData.get(
        "sellPrice"
      )
    );
const sellDate =
  formData.get(
    "sellDate"
  ) as string;
  const accountId =
    formData.get(
      "accountId"
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
console.log(
  "CURRENT USER",
  user.id
);
  // Validation
  if (!symbol) {
    throw new Error(
      "Symbol is required"
    );
  }

  if (
    !sellUnits ||
    sellUnits <= 0
  ) {
    throw new Error(
      "Invalid quantity"
    );
  }

  if (
    !sellPrice ||
    sellPrice <= 0
  ) {
    throw new Error(
      "Invalid sell price"
    );
  }

  if (!accountId) {
    throw new Error(
      "Please select an account"
    );
  }

  const { data: investments } =
    await supabase
  .from("investments")
  .select("*")
  .eq("user_id", user.id)
  .eq("symbol", symbol)
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (
    !investments ||
    investments.length === 0
  ) {
    throw new Error(
      "Holding not found"
    );
  }

  const totalUnits =
    investments.reduce(
      (sum, investment) =>
        sum +
        Number(
          investment.units
        ),
      0
    );

  if (
    sellUnits > totalUnits
  ) {
    throw new Error(
      `Cannot sell more than ${totalUnits} units`
    );
  }

  let remainingToSell =
    sellUnits;
let costBasis = 0;
  for (const investment of investments) {
    if (
      remainingToSell <= 0
    ) {
      break;
    }
    
    const units =
      Number(
        investment.units
      );

    // Sell entire lot
    if (
  units <=
  remainingToSell
) {

  costBasis +=
    units *
    Number(
      investment.buy_price
    );

  remainingToSell -=
    units;

  await supabase
    .from(
      "investments"
    )
    .delete()
    .eq(
      "id",
      investment.id
    );
}

    // Sell partial lot
    else {

  costBasis +=
    remainingToSell *
    Number(
      investment.buy_price
    );

  await supabase
    .from(
      "investments"
    )
    .update({
      units: Number(
        (
          units -
          remainingToSell
        ).toFixed(4)
      ),
    })
    .eq(
      "id",
      investment.id
    );

  remainingToSell = 0;
}
  }

  const saleAmount =
    sellUnits *
    sellPrice;
    console.log(
  "SELL ACTION STARTED"
);
  const realizedProfit =
  saleAmount - costBasis;
  const transactionDate =
  sellDate ||
  new Date()
    .toISOString()
    .split("T")[0];
await supabase
  .from("realized_gains")
  .insert({
    user_id: user.id,

    symbol,

    units: sellUnits,

    sale_price:
      sellPrice,

    sale_value:
      saleAmount,

    cost_basis:
      costBasis,

    profit_loss:
      realizedProfit,

    sold_at: transactionDate,
  });
  

const serverSupabase =
  await createClient();

const { error: historyError } =
  await serverSupabase
    .from(
      "investment_transactions"
    )
    .insert({
      user_id: user.id,

      symbol,

      name: symbol,

      transaction_type:
        "SELL",

      units: sellUnits,

      price: sellPrice,
      
      amount: saleAmount,
      profit_loss: realizedProfit,
      transaction_date:
        transactionDate,
    });

console.log(
  "SELL HISTORY ERROR",
  historyError
);



  revalidatePath(
    "/investments"
  );

  revalidatePath(
    "/accounts"
  );

  revalidatePath(
    "/transactions"
  );

  revalidatePath("/");
  revalidatePath(
  "/analytics"
);
}