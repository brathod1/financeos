import { getCurrentPrice } from "@/lib/market-prices";

export default async function TestPage() {
  const price =
    await getCurrentPrice(
      "NIFTYBEES"
    );

  return (
    <div className="p-10">
      <h1>NIFTYBEES</h1>

      <p>{price}</p>
    </div>
  );
}