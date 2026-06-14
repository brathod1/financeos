import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});
import fs from "fs";
import path from "path";

// @ts-ignore
import csv from "csv-parser";

import { createClient } from "@supabase/supabase-js";
console.log(
  "SUPABASE URL:",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
  "SERVICE KEY EXISTS:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AssetRow {
  symbol: string;
  name: string;
  asset_type: string;
  exchange: string;
  sector: string;
}

async function seedAssets() {
  const assets: AssetRow[] = [];

  const csvPath = path.join(
    process.cwd(),
    "data",
    "assets.csv"
  );

  await new Promise<void>(
    (resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (row: any) => {
  if (!row.symbol) {
    return;
  }

  assets.push(row);
})
        .on("end", () => {
          resolve();
        })
        .on("error", reject);
    }
  );

  console.log(
    `Found ${assets.length} assets`
  );

  const { data, error } =
    await supabase
      .from("assets")
      .upsert(
        assets.map(
          (asset) => ({
            symbol:
              asset.symbol,

            name:
              asset.name,

            asset_type:
              asset.asset_type,

            exchange:
  asset.exchange,

sector:
  asset.sector,

is_active: true,
          })
        ),
        {
          onConflict:
            "symbol",
        }
      )
      .select();

  if (error) {
    console.error(
      "SEED ERROR:",
      error
    );

    process.exit(1);
  }

  console.log(
    `Inserted ${data?.length ?? 0} assets`
  );

  console.log(
    "Assets seeded successfully"
  );
}

seedAssets();