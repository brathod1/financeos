import fs from "fs";
import path from "path";

const masterDir = path.join(
  process.cwd(),
  "data",
  "master"
);

const outputFile = path.join(
  process.cwd(),
  "data",
  "assets.csv"
);

const files = [
  "stocks.csv",
  "etfs.csv",
  "mutual_funds.csv",
  "reits.csv",
  "invits.csv",
  "crypto.csv",
];

const rows: string[] = [];

let headerWritten = false;

for (const file of files) {
  const filePath =
    path.join(masterDir, file);

  if (
    !fs.existsSync(filePath)
  ) {
    continue;
  }

  const content =
    fs
      .readFileSync(
        filePath,
        "utf8"
      )
      .trim();

  const lines =
    content.split("\n");

  if (
    lines.length === 0
  ) {
    continue;
  }

  if (
    !headerWritten
  ) {
    rows.push(lines[0]);
    headerWritten = true;
  }

  rows.push(
    ...lines.slice(1)
  );
}

fs.writeFileSync(
  outputFile,
  rows.join("\n")
);

console.log(
  `Built assets.csv with ${
    rows.length - 1
  } assets`
);