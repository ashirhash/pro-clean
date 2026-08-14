"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="font-tagline text-sm text-ink/60 underline disabled:opacity-60 inline-flex items-center gap-2"
    >
      {isLoggingOut && <Spinner />}
      {isLoggingOut ? "Logging out..." : "Log Out"}
    </button>
  );
}
