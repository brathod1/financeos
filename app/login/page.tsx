import { signInWithGoogle } from "@/app/actions/auth";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
export default async function LoginPage() {
    const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  redirect("/");
}
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="text-center px-6">

        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
  TRACK • PLAN • GROW
</p>

        <h1 className="text-7xl font-bold mt-4">
  North
</h1>

        <p className="text-zinc-500 mt-4 max-w-md mx-auto">
  Track spending, plan budgets and grow your wealth.
</p>

        <form action={signInWithGoogle}>
          <button
  className="
    mt-8
    bg-white
    text-black
    px-8
    py-4
    rounded-full
    font-medium
    hover:scale-[1.02]
    transition-all
  "
>
            Continue with Google
          </button>
        </form>

      </div>

    </div>
  );
}