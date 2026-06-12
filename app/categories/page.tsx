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

      <div
  className="
  flex
  flex-col
  md:flex-row
  gap-4
  md:items-center
  md:justify-between
  "
>

        <div>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
            TRANSACTION ORGANIZATION
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-4">
            Categories
          </h1>
          <p className="text-zinc-500 mt-4">
  Organize income, expenses and investments.
</p>
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
  rounded-[28px]
  p-5
  md:p-8
  "
>
      <div
  className="
  flex
  items-center
  justify-between
  mb-5
  md:mb-8
  "
>

        <h2 className="text-xl md:text-3xl font-semibold">
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

  {categories.length === 0 && (
    <div className="text-zinc-500 text-sm">
  No categories yet. Create your first category above.
</div>
  )}

  {categories.map(
    (category) => (
      <div
        key={category.id}
        className="
px-3
py-2
rounded-xl
bg-white/5
border
border-white/5
text-sm
font-medium
hover:bg-white/10
transition
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