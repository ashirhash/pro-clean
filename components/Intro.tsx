import Image from "next/image";

export default function Intro() {
  return (
    <section className="bg-white text-ink py-16 md:py-24 lg:py-28">
      <div className="container  flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-[50px] items-start">
          <h2 className="font-luckiest font-extrabold uppercase leading-[0.98] tracking-[-0.01em] text-[clamp(34px,5.5vw,84px)] text-ink xl:w-[680px] xl:shrink-0">
            Clean Spaces, <span className="text-purple-deep">Happy Faces</span>
          </h2>

          <div className="flex flex-col gap-6 xl:gap-8 xl:flex-1 xl:pt-3">
            <p className="font-tagline text-ink text-lg leading-[1.5]">
              Professional cleaning services across Bristol and surrounding
              areas. We leave every property spotless, guaranteed.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="#quote"
                className="bg-purple-deep border border-purple-deep text-white font-medium text-lg leading-[1.5] px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                Quote
              </a>
              <a
                href="#services"
                className="border border-ink/15 text-ink font-medium text-lg leading-[1.5] px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                Services
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[1279/853]">
          <Image
            src="/cleaning_cart.png"
            alt="Pro Clean Bristol staff member with a cleaning cart"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
