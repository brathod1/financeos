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

      <div className="text-center">

        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
          PERSONAL FINANCE OS
        </p>

        <h1 className="text-7xl font-bold mt-4">
          FinanceOS
        </h1>

        <p className="text-zinc-500 mt-4">
          Manage your money.
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
            "
          >
            Continue with Google
          </button>
        </form>

      </div>

    </div>
  );
}