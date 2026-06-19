import fs from "fs";
import path from "path";

const inputFile = path.join(
  process.cwd(),
  "data/raw/nifty500.csv"
);

const outputFile = path.join(
  process.cwd(),
  "data/master/stocks.csv"
);

const content = fs
  .readFileSync(inputFile, "utf8")
  .split("\n");

const rows: string[] = [];

rows.push(
  "symbol,name,asset_type,exchange,sector,currency,fund_house,amfi_code,plan_type,option_type"
);

for (let i = 1; i < content.length; i++) {
  const line = content[i].trim();

  if (!line) continue;

  const parts = line.split(",");

  if (parts.length < 5)
    continue;

  const companyName =
    parts[0]?.trim();

  const industry =
    parts[1]?.trim();

  const symbol =
    parts[2]?.trim();

  rows.push(
    [
      symbol,
      `"${companyName}"`,
      "Stock",
      "NSE",
      `"${industry}"`,
      "INR",
      "",
      "",
      "",
      "",
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
  } stocks`
);