import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

import { supabaseAdmin }
from "@/lib/supabase-admin";

const yahooFinance =
  new YahooFinance();

export async function GET() {

  try {

    const {
      data: assets,
      error,
    } = await supabaseAdmin
      .from("assets")
      .select(
        "id,symbol,asset_type"
      )
      .in(
        "asset_type",
        [
          "Stock",
          "ETF",
          "REIT",
          "InvIT",
        ]
      );

    if (error) {
      throw error;
    }

    let updated = 0;
    let failed = 0;

    for (const asset of assets) {

      try {

        const yahooSymbol =
          `${asset.symbol}.NS`;

        const quote: any =
          await yahooFinance.quote(
            yahooSymbol
          );

        const price =
          quote?.regularMarketPrice;

        if (!price) {
          failed++;
          continue;
        }

        const {
          error: updateError,
        } =
          await supabaseAdmin
            .from("assets")
            .update({
              current_price:
                price,

              last_updated:
                new Date()
                  .toISOString(),
            })
            .eq(
              "id",
              asset.id
            );

        if (updateError) {
          failed++;
          continue;
        }

        updated++;

      } catch (err) {

        console.error(
          asset.symbol,
          err
        );

        failed++;

      }

    }

    return NextResponse.json({
      success: true,
      updated,
      failed,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      {
        status: 500,
      }
    );

  }

}