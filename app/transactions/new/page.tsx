import { getAccounts } from "@/lib/accounts";
import { getCategories } from "@/lib/categories";
import { TransactionForm } from "@/components/transactions/transaction-form";

export default async function NewTransactionPage() {
  const accounts = await getAccounts();
  const categories = await getCategories();

  return (
    <TransactionForm
      accounts={accounts}
      categories={categories}
    />
  );
}