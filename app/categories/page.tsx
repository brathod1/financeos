import { getCategories } from "@/lib/categories";
import { AddCategoryForm } from "@/components/categories/add-category-form";
export default async function CategoriesPage() {
  const categories = await getCategories();
  const expenseCategories = categories
  .filter((c) => c.category_type === "expense")
  .sort((a, b) => a.name.localeCompare(b.name));

const incomeCategories = categories
  .filter((c) => c.category_type === "income")
  .sort((a, b) => a.name.localeCompare(b.name));

const investmentCategories = categories
  .filter((c) => c.category_type === "investment")
  .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="space-y-8">
      <div>
        <p className="text-zinc-400 uppercase tracking-widest text-sm">
          Transaction Organization
        </p>

        <h1 className="text-5xl font-bold mt-2">
          Categories
        </h1>
      </div>
        <AddCategoryForm />
      <div className="space-y-6">

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4">
      Expense Categories ({expenseCategories.length})
    </h2>

    <div className="space-y-2">
      {expenseCategories.map((category) => (
        <div
          key={category.id}
          className="flex justify-between border-b border-zinc-800 pb-2"
        >
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4">
      Income Categories ({incomeCategories.length})
    </h2>

    <div className="space-y-2">
      {incomeCategories.map((category) => (
        <div
          key={category.id}
          className="flex justify-between border-b border-zinc-800 pb-2"
        >
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4">
      Investment Categories ({investmentCategories.length})
    </h2>

    <div className="space-y-2">
      {investmentCategories.map((category) => (
        <div
          key={category.id}
          className="flex justify-between border-b border-zinc-800 pb-2"
        >
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  </div>

</div>
    </div>
  );
}