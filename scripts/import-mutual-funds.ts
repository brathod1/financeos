import fs from "fs";
import path from "path";

const inputFile = path.join(
  process.cwd(),
  "data/raw/amfi.txt"
);

const outputFile = path.join(
  process.cwd(),
  "data/master/mutual_funds.csv"
);

const lines = fs
  .readFileSync(inputFile, "utf8")
  .split("\n");

const rows: string[] = [];

rows.push(
  "symbol,name,asset_type,exchange,sector,currency,fund_house,amfi_code,plan_type,option_type"
);

let currentFundHouse = "";

for (const rawLine of lines) {
  const line = rawLine.trim();

  if (!line) continue;

  if (
    !line.includes(";") &&
    !line.includes("Scheme")
  ) {
    currentFundHouse = line;
    continue;
  }

  const parts =
    line.split(";");

  if (parts.length < 4)
    continue;

  const amfiCode =
    parts[0]?.trim();

  const schemeName =
    parts[3]?.trim();

  if (!amfiCode)
    continue;

  if (
    !schemeName
      .toLowerCase()
      .includes("direct")
  ) {
    continue;
  }

  if (
    !schemeName
      .toLowerCase()
      .includes("growth")
  ) {
    continue;
  }

  const symbol =
    `MF-${amfiCode}`;

  rows.push(
    [
      symbol,
      `"${schemeName}"`,
      "Mutual Fund",
      "AMFI",
      "Mutual Fund",
      "INR",
      `"${currentFundHouse}"`,
      amfiCode,
      "Direct",
      "Growth",
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
  } mutual funds`
);