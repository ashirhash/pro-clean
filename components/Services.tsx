const ChevronRight = () => (
  <svg viewBox="0 0 6.69159 11.6166" className="w-1.5 h-3" fill="currentColor">
    <path d="M0.876953 0.5C0.977777 0.5 1.05475 0.530412 1.13281 0.608398L6.07715 5.55273C6.13104 5.60665 6.15622 5.64863 6.16797 5.67676V5.67773C6.18275 5.71329 6.19141 5.75306 6.19141 5.80176C6.19141 5.85046 6.18275 5.89022 6.16797 5.92578V5.92676C6.15621 5.95488 6.13103 5.99687 6.07715 6.05078L1.1084 11.0195C1.03063 11.0973 0.963491 11.1192 0.882813 11.1162C0.788784 11.1127 0.707921 11.0809 0.62207 10.9951C0.543947 10.917 0.512697 10.8402 0.512695 10.7393C0.512695 10.6384 0.543945 10.5615 0.62207 10.4834L5.30371 5.80176L0.59668 1.09473C0.519014 1.01703 0.497072 0.95072 0.5 0.870117C0.503448 0.77585 0.536015 0.694453 0.62207 0.608398C0.699995 0.530589 0.776363 0.500076 0.876953 0.5Z" />
  </svg>
);

const iconProps = {
  viewBox: "0 0 24 24",
  className: "w-6 h-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CheckIcon = () => (
  <svg viewBox="0 0 15.6516 8.06322" className="w-3.5 h-auto" fill="currentColor">
    <path d="M7.02539 8.06322C6.87128 8.06322 6.74212 8.01128 6.63789 7.90739C6.53367 7.8035 6.48156 7.67383 6.48156 7.51839C6.48156 7.36283 6.53367 7.23345 6.63789 7.13022C6.74212 7.027 6.87128 6.97539 7.02539 6.97539H9.65373C9.80895 6.97539 9.93906 7.028 10.0441 7.13322C10.1491 7.23845 10.2016 7.36878 10.2016 7.52422C10.2016 7.67967 10.1491 7.80833 10.0441 7.91022C9.93906 8.01222 9.80895 8.06322 9.65373 8.06322H7.02539ZM3.62823 6.34356L9.8099 0.162056C9.92412 0.0487229 10.0579 -0.00516615 10.2112 0.000389407C10.3646 0.00594496 10.4982 0.0645559 10.6122 0.176223C10.7263 0.288 10.7834 0.420611 10.7834 0.574056C10.7834 0.727611 10.7267 0.861056 10.6134 0.97439L4.03006 7.55772C3.91317 7.67106 3.77839 7.72772 3.62573 7.72772C3.47306 7.72772 3.34001 7.67106 3.22656 7.55772L0.163728 4.49106C0.0505055 4.37961 -0.00399453 4.24745 0.000227688 4.09456C0.00444991 3.94178 0.0622277 3.80872 0.173561 3.69539C0.285005 3.58206 0.418061 3.52539 0.572728 3.52539C0.727283 3.52539 0.861728 3.58206 0.976061 3.69539L3.62823 6.34356Z" />
  </svg>
);

const services = [
  {
    id: "tenancy",
    tag: "Most popular",
    title: "End of Tenancy Cleaning",
    text: "Sparkle or deep cleans for studios to 4+ bed homes, plus landlord refresh packages.",
    features: [
      "Studios to 4+ bed homes",
      "Full kitchen & bathroom deep clean",
      "Landlord refresh packages",
    ],
    price: "From £125",
    icon: (
      <svg {...iconProps}>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    id: "carpet",
    tag: "Homes",
    title: "Carpet & Upholstery Cleaning",
    text: "Steam cleaning for carpets, rugs, stairs and upholstery, with before & after results you can see.",
    features: [
      "Carpets, rugs & stairs",
      "Sofas & upholstered furniture",
      "Before & after results",
    ],
    price: "From £19.99",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="6" width="18" height="12" rx="1.5" />
        <path d="M3 10h18M3 14h18M8 6v12M13 6v12" />
      </svg>
    ),
  },
  {
    id: "contracts",
    tag: "Landlords & Commercial",
    title: "Monthly Contract Cleaning",
    text: "Ongoing maintenance plans tailored to your site, billed monthly.",
    features: [
      "Communal carpet cleaning",
      "Places of worship",
      "Commercial kitchens",
      "Barber shops & retail",
    ],
    price: "Custom monthly plans",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M9 21v-4h6v4" />
        <path d="M8 7h1.5M14.5 7H16M8 11h1.5M14.5 11H16M8 15h1.5M14.5 15H16" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="bg-white text-ink py-16 md:py-24 lg:py-28">
      <div className="container  flex flex-col gap-14 lg:gap-20 items-center">
        <div className="flex flex-col gap-4 items-center text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-ink/50 before:content-[''] before:w-5.5 before:h-0.5 before:bg-ink/30 before:inline-block">
            Services
          </div>
          <h2 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-[clamp(28px,4.5vw,60px)]">
            What we do best
          </h2>
          <p className="font-tagline text-ink/70 text-lg leading-[1.5]">
            Here are the services we offer across Bristol and the surrounding
            areas
          </p>
        </div>

        <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#f2f2f2] border border-ink/15 rounded-2xl max-sm:p-5 p-7 xl:p-10 flex flex-col gap-7 h-full"
            >
              <div className="w-14 h-14 rounded-full bg-white border border-ink/10 flex items-center justify-center text-purple-deep">
                {service.icon}
              </div>

              <div className="flex flex-col gap-3">
                <div className="font-tagline font-semibold text-sm text-purple-deep">
                  {service.tag}
                </div>
                <h3 className="font-luckiest font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-2xl">
                  {service.title}
                </h3>
                <p className="font-tagline text-ink/70 text-base">
                  {service.text}
                </p>
              </div>

              <div className="h-px bg-ink/10" />

              <ul className="flex flex-col gap-3 flex-1">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-ink/80"
                  >
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center text-purple-deep">
                      <CheckIcon />
                    </span>
                    <span className="font-tagline text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-ink/10">
                <span className="font-tagline font-semibold text-lg">
                  {service.price}
                </span>
                <a
                  href="#quote"
                  className="font-bold text-base px-[30px] py-3 rounded-[10px] bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2.5"
                >
                  Get a quote
                  <ChevronRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
