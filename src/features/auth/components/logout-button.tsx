"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions/logout-action";

export function LogoutButton() {
  const logout = async () => {
    await logoutAction();
  };

  return <Button onClick={logout}>Logout</Button>;
}
