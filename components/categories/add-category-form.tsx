"use client";

import { createCategory } from "@/app/actions/categories";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddCategoryForm() {
  return (
    <Dialog>

      <DialogTrigger asChild>
        <button
          className="
w-full
md:w-auto
bg-white
text-black
px-6
py-3
rounded-2xl
font-medium
hover:scale-[1.02]
transition
"
        >
          + Add Category
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#0F1117] border-white/10 text-white">

        <DialogHeader>
          <DialogTitle>
            Add Category
          </DialogTitle>
        </DialogHeader>

        <form
          action={createCategory}
          className="space-y-5 mt-4"
        >

          <input
            name="name"
            required
            placeholder="Category Name"
            className="
            w-full
            bg-black/20
            border
            border-white/5
            rounded-2xl
            p-4
            "
          />

          <select
            name="categoryType"
            className="
            w-full
            bg-black/20
            border
            border-white/5
            rounded-2xl
            p-4
            "
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

            <option value="investment">
              Investment
            </option>
          </select>

          <button
  type="submit"
  className="
  w-full
  bg-white
  text-black
  px-6
  py-3
  rounded-2xl
  font-medium
  "
>
            Create Category
          </button>

        </form>

      </DialogContent>

    </Dialog>
  );
}