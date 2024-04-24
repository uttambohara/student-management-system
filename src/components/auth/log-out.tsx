import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LogOut() {
  const logout = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/auth");
  };

  return (
    <form action={logout}>
      <Button className="gap-2 rounded-full bg-[#141414]">
        <LogOutIcon size={18} />
        Sign out
      </Button>
    </form>
  );
}
