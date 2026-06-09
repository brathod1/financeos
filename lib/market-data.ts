export async function getCurrentPrice(
  symbol: string
) {
  const prices: Record<
    string,
    number
  > = {
    NIFTYBEES: 274,
    GOLDBEES: 72,
    IRBINVIT: 102,
    NHIT: 132,
    RELIANCE: 1540,
  };

  return (
    prices[
      symbol.toUpperCase()
    ] || 0
  );
}