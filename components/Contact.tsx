"use client";

import { useState, type SubmitEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      userEmail: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(
          body?.error || "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setErrorMsg(
        "We couldn't reach the server. Check your connection and try again."
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="quote"
      className="bg-purple-mist text-ink py-16 md:py-24 lg:py-28"
    >
      <div className="container  flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex flex-col gap-4 lg:flex-1 lg:justify-center">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-ink/50 before:content-[''] before:w-5.5 before:h-0.5 before:bg-ink/30 before:inline-block">
            Get In Touch
          </div>
          <h2 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-[clamp(28px,4.5vw,60px)]">
            Contact Us
          </h2>
          <p className="font-tagline text-ink/70 text-lg leading-[1.5]">
            Drop us a line!
          </p>
          <a
            href="tel:07346814368"
            className="flex items-center gap-2 font-bold text-[15px] text-ink bg-white border border-ink/10 px-4 py-[9px] rounded-full w-fit mt-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-ink">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
            </svg>
            07346 814368
          </a>
        </div>

        <div className="lg:flex-1">
          <div className="bg-white border border-ink/15 rounded-2xl p-5 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col gap-2">
                <p className="font-luckiest font-extrabold uppercase text-2xl">
                  Thanks!
                </p>
                <p className="font-tagline text-ink/70 text-base">
                  We&apos;ve got your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-tagline font-semibold text-sm"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-tagline font-semibold text-sm"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-tagline font-semibold text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40 resize-none"
                  />
                </div>

                {/* Honeypot: visually hidden off-screen, not display:none (some bots detect display:none and skip it) */}
                <div
                  className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-bold text-base px-[30px] py-2.5 max-sm:py-4 rounded-[10px] bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] w-fit disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>

                {status === "error" && (
                  <p className="font-tagline text-red-600 text-sm">
                    {errorMsg} If the problem continues, please call us on
                    07346 814368.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}