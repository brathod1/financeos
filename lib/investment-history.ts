import { createClient }
from "@/supabase/server";

import { InvestmentHistory }
from "@/types/investment-history";

export async function getInvestmentHistory(
  symbol: string
): Promise<
  InvestmentHistory[]
> {

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } =
    await supabase
      .from(
        "investment_transactions"
      )
      
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "symbol",
        symbol
      )
      .order(
        "transaction_date",
        {
          ascending: false,
        }
      );
console.log(
  "HISTORY QUERY FULL",
  JSON.stringify(
    data,
    null,
    2
  )
);
  if (error) {
    console.error(error);
    return [];
  }

  return (
    data || []
  ).map(
    (transaction) => ({
      type:
        transaction.transaction_type,

      symbol:
        transaction.symbol,

      units:
        Number(
          transaction.units
        ),

      price:
        Number(
          transaction.price
        ),

      date:
        transaction.transaction_date,

      profitLoss:
  transaction.profit_loss
    ? Number(
        transaction.profit_loss
      )
    : undefined,
    })
  );
}