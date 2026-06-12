export default function GoalsPage() {
  return (
    <div className="space-y-8">

      <div>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
  FINANCIAL PLANNING
</p>

        <h1 className="text-5xl md:text-7xl font-bold mt-4">
          Goals
        </h1>

        <p className="text-zinc-500 mt-4">
          Track savings goals and long-term financial targets.
        </p>
      </div>

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
        "
      >
        + Create Goal
      </button>

      <div
        className="
        bg-[#0F1117]
        border
        border-white/5
        rounded-[28px]
        p-6
        text-center
        "
      >
        <div
  className="
  grid
  grid-cols-2
  gap-4
  "
>
  <div className="bg-[#0F1117] border border-white/5 rounded-2xl p-5">
    <p className="text-zinc-500 text-sm">
      Active Goals
    </p>

    <h3 className="text-3xl font-bold mt-2">
      0
    </h3>
  </div>

  <div className="bg-[#0F1117] border border-white/5 rounded-2xl p-5">
    <p className="text-zinc-500 text-sm">
      Saved
    </p>

    <h3 className="text-3xl font-bold mt-2">
      ₹0
    </h3>
  </div>
</div>
        <div className="text-5xl mb-4">
          🎯
        </div>

        <h2 className="text-xl font-semibold">
          No goals yet
        </h2>

        <p className="text-zinc-500 mt-2">
          Create your first goal and start tracking progress.
        </p>
      </div>

    </div>
  );
}