"use client";

export function DeleteDataButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        const confirmed = window.confirm(
          "⚠️ This will permanently delete ALL your accounts, transactions, categories, budgets, investments, and portfolio history.\n\nThis action cannot be undone.\n\nAre you sure?"
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
      className="
        w-full
        text-left
        px-3
        py-2
        rounded-xl
        text-red-500
        hover:bg-red-500/10
        transition
      "
    >
      Delete All Data
    </button>
  );
}