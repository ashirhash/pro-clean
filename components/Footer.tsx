"use client";

import Image from "next/image";

const serviceLinks = [
  { label: "End of Tenancy", href: "#services" },
  { label: "Carpet & Upholstery", href: "#services" },
  { label: "Monthly Contracts", href: "#services" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-ink">
        <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8v-1.6c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9v2.2H7.8v2.8h2.4V21h3.3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-ink">
        <path d="M12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8zm0 5.6a2.2 2.2 0 110-4.4 2.2 2.2 0 010 4.4zM16.4 6a1 1 0 100 2 1 1 0 000-2z" />
        <path d="M16.4 3.5H7.6a4.1 4.1 0 00-4.1 4.1v8.8a4.1 4.1 0 004.1 4.1h8.8a4.1 4.1 0 004.1-4.1V7.6a4.1 4.1 0 00-4.1-4.1zm2.7 12.9a2.7 2.7 0 01-2.7 2.7H7.6a2.7 2.7 0 01-2.7-2.7V7.6a2.7 2.7 0 012.7-2.7h8.8a2.7 2.7 0 012.7 2.7v8.8z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-ink">
        <path d="M18.9 4h2.4l-5.2 6 6 8.9h-4.7l-3.7-5.1-4.2 5.1H5l5.6-6.4L4.8 4h4.8l3.3 4.7L18.9 4zm-1.6 13.5h1.3L8.8 5.4H7.4l9.9 12.1z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-ink">
        <path d="M6.9 8.9H3.9V20h3zM5.4 7.6a1.7 1.7 0 100-3.5 1.7 1.7 0 000 3.5zM20.1 20v-6.1c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.7 1-3.2 1.8V8.9h-3v11.1h3v-6.2c0-.5.1-1 .4-1.4.3-.5.9-1 1.7-1 1.2 0 1.9.8 1.9 2.4V20h3.3z" />
      </svg>
    ),
  },
  {
    label: "Youtube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-ink">
        <path d="M21.6 7.9a2.7 2.7 0 00-1.9-1.9C18 5.5 12 5.5 12 5.5s-6 0-7.7.5A2.7 2.7 0 002.4 8C2 9.6 2 12 2 12s0 2.4.4 4.1a2.7 2.7 0 001.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 001.9-1.9c.4-1.7.4-4.1.4-4.1s0-2.4-.4-4.1zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Footer() {
  return (
    <footer className="bg-white text-ink py-16 md:py-20">
      <div className="container  flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20">
          <div className="flex flex-col gap-6 lg:flex-1 lg:max-w-[500px]">
            <Image
              src="/brand.png"
              alt="Pro Clean Bristol logo"
              width={110}
              height={36}
              className="w-[110px] h-auto"
            />
            <p className="font-tagline text-ink/70 text-base">
              Get cleaning done right the first time with Pro Clean Bristol. We
              provide a range of cleaning services for homes and businesses
              across Bristol and the surrounding areas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 flex-1">
            <div className="flex flex-col gap-5 flex-1">
              <p className="font-tagline font-semibold text-base">
                Our services
              </p>
              <ul className="flex flex-col gap-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-tagline text-ink/70 text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <p className="font-tagline font-semibold text-base">Follow us</p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="flex items-center gap-3 font-tagline text-ink/70 text-base"
                    >
                      {social.icon}
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-ink/10">
          <p className="font-tagline text-ink/60 text-sm">
            © 2025 Pro Clean Bristol Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-tagline text-ink/60 text-sm">
              Privacy policy
            </a>
            <a href="#" className="font-tagline text-ink/60 text-sm">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
