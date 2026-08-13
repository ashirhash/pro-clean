import Image from "next/image";

const ChevronRight = () => (
  <svg viewBox="0 0 6.69159 11.6166" className="w-1.5 h-3" fill="currentColor">
    <path d="M0.876953 0.5C0.977777 0.5 1.05475 0.530412 1.13281 0.608398L6.07715 5.55273C6.13104 5.60665 6.15622 5.64863 6.16797 5.67676V5.67773C6.18275 5.71329 6.19141 5.75306 6.19141 5.80176C6.19141 5.85046 6.18275 5.89022 6.16797 5.92578V5.92676C6.15621 5.95488 6.13103 5.99687 6.07715 6.05078L1.1084 11.0195C1.03063 11.0973 0.963491 11.1192 0.882813 11.1162C0.788784 11.1127 0.707921 11.0809 0.62207 10.9951C0.543947 10.917 0.512697 10.8402 0.512695 10.7393C0.512695 10.6384 0.543945 10.5615 0.62207 10.4834L5.30371 5.80176L0.59668 1.09473C0.519014 1.01703 0.497072 0.95072 0.5 0.870117C0.503448 0.77585 0.536015 0.694453 0.62207 0.608398C0.699995 0.530589 0.776363 0.500076 0.876953 0.5Z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="bg-white text-ink py-16 md:py-24 lg:py-28">
      <div className="container  flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex flex-col gap-4 lg:flex-1 lg:justify-center">
          <h2 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-[clamp(28px,4.5vw,60px)]">
            Client stories
          </h2>
          <p className="font-tagline text-ink/70 text-lg leading-[1.5]">
            The work speaks for itself but the words help too
          </p>
        </div>

        <div className="lg:flex-1">
          <div className="border border-ink/15 rounded-2xl p-5 sm:p-8 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <p className="font-tagline sm:text-base lg:text-xl leading-[1.5]">
                &ldquo;They turned a disaster into a showroom. The landlord was
                stunned.&rdquo;
              </p>
              <div className="flex gap-5 items-center">
                <Image
                  src="/avatar_james.png"
                  alt="James Harding"
                  width={56}
                  height={56}
                  className="rounded-full object-cover shrink-0"
                />
                <div className="font-tagline text-lg leading-[1.5]">
                  <p className="font-semibold max-sm:text-base">
                    James Harding
                  </p>
                  <p className="text-ink/70 max-sm:text-sm">
                    Landlord, Clifton
                  </p>
                </div>
              </div>
            </div>
            {/* <a
              href="#case-study"
              className="flex items-center gap-2 font-medium text-lg text-ink w-fit"
            >
              Read case study
              <ChevronRight />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
