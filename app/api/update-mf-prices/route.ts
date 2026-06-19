import { NextResponse } from "next/server";

import { supabaseAdmin }
from "@/lib/supabase-admin";

import {
  fetchAmfiNavs,
} from "@/lib/amfi/fetch-nav";

export async function GET() {

  try {

    const navMap =
      await fetchAmfiNavs();

    const {
      data: funds,
      error,
    } =
      await supabaseAdmin
        .from("assets")
        .select(
          "id,symbol,amfi_code"
        )
        .eq(
          "asset_type",
          "Mutual Fund"
        );

    if (error) {
      throw error;
    }

    let updated = 0;
    let failed = 0;

    for (const fund of funds) {

      if (
        !fund.amfi_code
      ) {
        failed++;
        continue;
      }

      const nav =
        navMap.get(
          fund.amfi_code
        );

      if (!nav) {
        failed++;
        continue;
      }

      const {
        error:
          updateError,
      } =
        await supabaseAdmin
          .from("assets")
          .update({
            current_price:
              nav,

            last_updated:
              new Date()
                .toISOString(),
          })
          .eq(
            "id",
            fund.id
          );

      if (
        updateError
      ) {
        failed++;
        continue;
      }

      updated++;
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
        error:
          String(err),
      },
      {
        status: 500,
      }
    );

  }

}