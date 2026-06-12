import { createClient } from "@/supabase/server";
import { signOut } from "@/app/actions/auth";
import { deleteAccount }
from "@/app/actions/delete-accounts";

import { DeleteDataButton }
from "@/components/auth/delete-data-buttons";
export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">

      <div>
  <p className="text-zinc-400 uppercase tracking-widest text-sm">
    Preferences
  </p>

  <h1 className="text-5xl md:text-7xl font-bold mt-2">
    Settings
  </h1>

  <p className="text-zinc-500 mt-4">
    Manage your account and application preferences.
  </p>
</div>

      <div
        className="
        bg-[#0F1117]
rounded-[32px]
border
border-white/5
p-6
md:p-8
        "
      >
        <h2 className="text-xl font-semibold mb-4">
          Profile
        </h2>

        <p>{user?.user_metadata?.full_name}</p>
        <p className="text-zinc-500">
          {user?.email}
        </p>
      </div>

      <div
        className="
        bg-[#0F1117]
rounded-[32px]
border
border-white/5
p-6
md:p-8
        "
      >
        <h2 className="text-xl font-semibold mb-4">
          Account
        </h2>

        

        <form action={signOut}>
          <button
            className="
            px-4
            py-2
            rounded-xl
            bg-white
            text-black
            "
          >
            Logout
          </button>
        </form>
      </div>

      <div
  className="
  bg-zinc-900
  rounded-2xl
  border
  border-red-900/50
  p-6
  "
>
  <h2
    className="
    text-xl
    font-semibold
    text-red-500
    mb-4
    "
  >
    Danger Zone
  </h2>

  <form action={deleteAccount}>
    <DeleteDataButton />
  </form>
</div>
<div
  className="
  bg-[#0F1117]
  rounded-[32px]
  border
  border-white/5
  p-6
  md:p-8
  "
>
  <h2 className="text-2xl font-bold">
    North
  </h2>

  <p className="text-zinc-500 mt-2">
    Track. Plan. Grow.
  </p>

  <p className="text-zinc-600 text-sm mt-4">
    Version 1.0
  </p>
</div>
    </div>
  );
}