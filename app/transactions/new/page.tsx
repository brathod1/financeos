import { getAccounts } from "@/lib/accounts";
import { getCategories } from "@/lib/categories";
import { createTransaction } from "@/app/actions/transactions";

export default async function NewTransactionPage() {
  const accounts = await getAccounts();
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-zinc-400 uppercase tracking-widest text-sm">
          Create
        </p>

        <h1 className="text-5xl font-bold mt-2">
          New Transaction
        </h1>
      </div>

      <form action={createTransaction}
        className="space-y-6">
            <div>
            <label className="block mb-2">
                Title
            </label>

            <input
                name="title"
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                placeholder="Lunch"
            />
            </div>

        <div>
          <label className="block mb-2">
            Amount
          </label>

          <input
            name="amount"
            type="number"
            min="1"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            placeholder="250"
          />
        </div>

        <div>
          <label className="block mb-2">
            Account
          </label>

          <select name="accountId"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Category
          </label>

          <select name="categoryId"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Transaction Type
          </label>

          <select  name="transactionType"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

            <option value="transfer">
              Transfer
            </option>

            <option value="investment">
              Investment
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded-full font-medium"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}