import { getCategories } from "@/lib/categories";
import { AddCategoryForm } from "@/components/categories/add-category-form";

export default async function CategoriesPage() {
  const categories =
    await getCategories();

  const expenseCategories =
    categories
      .filter(
        (c) =>
          c.category_type ===
          "expense"
      )
      .sort((a, b) =>
        a.name.localeCompare(
          b.name
        )
      );

  const incomeCategories =
    categories
      .filter(
        (c) =>
          c.category_type ===
          "income"
      )
      .sort((a, b) =>
        a.name.localeCompare(
          b.name
        )
      );

  const investmentCategories =
    categories
      .filter(
        (c) =>
          c.category_type ===
          "investment"
      )
      .sort((a, b) =>
        a.name.localeCompare(
          b.name
        )
      );

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
            TRANSACTION ORGANIZATION
          </p>

          <h1 className="text-7xl font-bold tracking-tight mt-4">
            Categories
          </h1>
        </div>

        <AddCategoryForm />
      </div>

      <CategorySection
        title="Expenses"
        count={
          expenseCategories.length
        }
        categories={
          expenseCategories
        }
        color="red"
      />

      <CategorySection
        title="Income"
        count={
          incomeCategories.length
        }
        categories={
          incomeCategories
        }
        color="green"
      />

      <CategorySection
        title="Investments"
        count={
          investmentCategories.length
        }
        categories={
          investmentCategories
        }
        color="amber"
      />

    </div>
  );
}

function CategorySection({
  title,
  count,
  categories,
  color,
}: {
  title: string;
  count: number;
  categories: {
    id: string;
    name: string;
  }[];
  color:
    | "red"
    | "green"
    | "amber";
}) {
  const colorClasses = {
    red: "bg-red-500/10 text-red-500",
    green:
      "bg-green-500/10 text-green-500",
    amber:
      "bg-amber-500/10 text-amber-500",
  };

  return (
    <div
      className="
      bg-[#0F1117]
      border
      border-white/5
      rounded-[32px]
      p-8
      "
    >
      <div className="flex items-center justify-between mb-8">

        <h2 className="text-3xl font-semibold">
          {title}
        </h2>

        <span
          className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-medium
          ${colorClasses[color]}
        `}
        >
          {count}
        </span>

      </div>

      <div className="flex flex-wrap gap-3">

        {categories.map(
          (category) => (
            <div
              key={category.id}
              className="
              px-4
              py-3
              rounded-2xl
              bg-white/5
              border
              border-white/5
              "
            >
              {category.name}
            </div>
          )
        )}

      </div>

    </div>
  );
}