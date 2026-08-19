"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

type Status = "idle" | "sending" | "error";

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const data = new FormData(event.currentTarget);
    const payload = {
      username: String(data.get("username") ?? ""),
      password: String(data.get("password") ?? ""),
      rememberMe: data.get("rememberMe") === "on",
    };

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(body?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMsg(
        "We couldn't reach the server. Check your connection and try again."
      );
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-tagline font-semibold text-sm">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          placeholder="username"
          className="w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-tagline font-semibold text-sm"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40"
        />
      </div>

      <label className="flex items-center gap-2 font-tagline text-sm cursor-pointer select-none">
        <input
          type="checkbox"
          name="rememberMe"
          defaultChecked
          className="w-4 h-4 rounded border-ink/30 accent-purple-brand"
        />
        Remember me
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="font-bold text-base px-[30px] py-2.5 max-sm:py-4 rounded-[10px] bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {status === "sending" && <Spinner />}
        {status === "sending" ? "Logging in..." : "Log In"}
      </button>

      {status === "error" && (
        <p className="font-tagline text-red-600 text-sm">{errorMsg}</p>
      )}
    </form>
  );
}