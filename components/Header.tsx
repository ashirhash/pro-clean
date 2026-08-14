import Image from "next/image";
import Link from "next/link";

// const navLinks = [
//   { label: "Services", href: "#" },
//   { label: "Gallery", href: "#" },
//   { label: "Contact", href: "#" },
// ];

export default function Header() {
  return (
    <header className="pt-5 absolute z-1 w-full bg-white">
      <div className="container border-b border-b-purple-mist pb-5">
        <nav className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand.png"
              alt="Pro Clean Bristol logo"
              width={175}
              height={175}
              className="max-sm:w-[115px]"
            />
          </Link>

          {/* Nav links */}
          {/* <div className="hidden md:flex gap-9 font-semibold text-[15px] tracking-[0.02em]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-ink no-underline opacity-75 transition-[opacity,color] duration-200 ease-in-out hover:opacity-100 hover:text-purple-brand"
              >
                {link.label}
              </a>
            ))}
          </div> */}

          {/* Call CTA */}
          <a
            href="tel:07346814368"
            className="flex items-center gap-2 max-sm:text-sm font-bold text-[15px] text-ink bg-white border border-ink/10 max-sm:px-3 px-4 py-[9px] rounded-full"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-ink">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
            </svg>
            07346 814368
          </a>
        </nav>
      </div>
    </header>
  );
}
