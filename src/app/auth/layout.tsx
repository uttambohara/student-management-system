import readUserSession from "@/actions/read-user-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect("/");
  }

  return (
    <div className="grid h-[100svh] place-content-center p-6">{children}</div>
  );
}
