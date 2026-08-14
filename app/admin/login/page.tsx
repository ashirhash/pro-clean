import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Admin Login | Pro Clean Bristol",
};

export default function AdminLoginPage() {
  return (
    <>
      <Header />
      <section className="bg-purple-mist text-ink min-h-screen flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-sm bg-white border border-ink/15 rounded-2xl p-6 sm:p-8">
          <h1 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-2xl mb-6">
            Admin Login
          </h1>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
