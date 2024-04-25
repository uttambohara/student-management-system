import { AuthTabs } from "@/components/auth/auth-tabs";
import React from "react";

export default function AuthPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="mb-2 text-4xl">Authenticate yourself</h1>
        <p className="text-muted-foreground">
          Authentication details by default has already been provided. <br /> So
          please click the login button.
        </p>
      </div>

      <AuthTabs />
    </div>
  );
}
