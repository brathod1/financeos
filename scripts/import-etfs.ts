import fs from "fs";
import path from "path";

// @ts-ignore
import csv from "csv-parser";

const inputFile = path.join(
  process.cwd(),
  "data/raw/nse_etfs.csv"
);

const outputFile = path.join(
  process.cwd(),
  "data/master/etfs.csv"
);

const rows: string[] = [];

rows.push(
  "symbol,name,asset_type,exchange,sector,currency,fund_house"
);

async function run() {

  const data: any[] = [];

  await new Promise<void>(
    (resolve, reject) => {

      fs.createReadStream(inputFile)
        .pipe(csv())
        .on("data", row => {
          data.push(row);
        })
        .on("end", () => resolve())
        .on("error", reject);

    }
  );

  for (const row of data) {

    const symbol =
      row["SYMBOL \r"]?.trim()
      || row["SYMBOL"]?.trim();

    const name =
      row["UNDERLYING ASSET \r"]?.trim()
      || row["UNDERLYING ASSET"]?.trim();

    if (!symbol) continue;

    rows.push(
      [
        symbol,
        `"${name}"`,
        "ETF",
        "NSE",
        "ETF",
        "INR",
        ""
      ].join(",")
    );
  }

  fs.writeFileSync(
    outputFile,
    rows.join("\n")
  );

  console.log(
    `Generated ${
      rows.length - 1
    } ETFs`
  );

}

run();