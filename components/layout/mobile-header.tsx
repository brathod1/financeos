export function MobileHeader() {
  return (
    <div
      className="
      md:hidden
      sticky
      top-0
      z-40
      bg-black
      border-b
      border-white/10
      px-4
      py-4
      "
    >
      <div className="flex items-center gap-3">
  <div
    className="
    w-8
    h-8
    rounded-xl
    bg-white
    text-black
    flex
    items-center
    justify-center
    font-bold
    text-sm
    "
  >
    N
  </div>

  <div>
    <h1 className="font-bold text-lg leading-none">
      North
    </h1>

    <p className="text-[10px] text-zinc-500">
      Track. Plan. Grow.
    </p>
  </div>
</div>
    </div>
  );
}