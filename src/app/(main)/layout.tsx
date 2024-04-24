import readUserSession from "@/actions/read-user-session";
import LogOut from "@/components/auth/log-out";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { LucideHome } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect("/auth");
  }
  return (
    <>
      <header
        style={{ zIndex: 10 }}
        className="fixed top-0 flex h-[5rem] min-w-full items-center border-b bg-white/40 px-8 backdrop-blur-md dark:bg-black/40"
      >
        <div className="flex items-center gap-2">
          <LucideHome />
          <p className="text-muted-foreground">A single page CRUD App.</p>
        </div>
        <ul className="ml-auto flex items-center gap-3">
          <li>
            <ModeToggle />
          </li>
          <li>
            <LogOut />
          </li>
        </ul>
      </header>
      <main className="h-full">{children}</main>
    </>
  );
}
