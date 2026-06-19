export async function fetchAmfiNavs() {
  const response = await fetch(
    "https://www.amfiindia.com/spages/NAVAll.txt",
    {
      cache: "no-store",
    }
  );

  const text =
    await response.text();

  const lines =
    text.split("\n");

  const navMap =
    new Map<
      string,
      number
    >();

  for (const rawLine of lines) {

    const line =
      rawLine.trim();

    if (
      !line.includes(";")
    ) {
      continue;
    }

    const parts =
      line.split(";");

    if (
      parts.length < 5
    ) {
      continue;
    }

    const amfiCode =
      parts[0]?.trim();

    const nav =
      Number(parts[4]);

    if (
      !amfiCode ||
      Number.isNaN(nav)
    ) {
      continue;
    }

    navMap.set(
      amfiCode,
      nav
    );
  }

  return navMap;
}