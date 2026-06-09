export async function getCurrentPrice(
  symbol: string
) {
  try {
    const response =
      await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`,
        {
          next: {
            revalidate: 300,
          },
        }
      );

    const data =
      await response.json();

    return (
      data?.chart?.result?.[0]
        ?.meta
        ?.regularMarketPrice ?? 0
    );
  } catch {
    return 0;
  }
}