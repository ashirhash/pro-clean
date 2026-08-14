import type { Metadata } from "next";
import JobForm from "@/components/admin/JobForm";
import LogoutButton from "@/components/admin/LogoutButton";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Post a Job | Pro Clean Bristol Admin",
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <section className="sm:pt-44 pt-35 bg-purple-mist flex items-center justify-center text-ink min-h-screen py-12 sm:px-4">
        <div className="container max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:items-center max-sm:gap-2">
            <h1 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-2xl">
              Post a Completed Job
            </h1>
            <LogoutButton />
          </div>
          <div className="bg-white border border-ink/15 rounded-2xl p-5 sm:p-8">
            <JobForm />
          </div>
        </div>
      </section>
    </>
  );
}
