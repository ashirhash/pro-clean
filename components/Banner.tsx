export default function Banner() {
  return (
    <section className="relative bg-white text-ink">
      <div className="container">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center pt-[160px] pb-16 sm:pt-[190px] sm:pb-20">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-ink/50 mb-4.5 before:content-[''] before:w-5.5 before:h-0.5 before:bg-ink/30 before:inline-block">
            Bristol &amp; Surrounding Areas
          </div>

          <h1 className="font-luckiest font-extrabold leading-[0.98] tracking-[-0.01em] text-[clamp(44px,6.4vw,84px)] m-0 mb-1.5 text-ink">
            Clean Spaces,
            <span className="block w-fit relative mx-auto text-purple-brand">
              Happy Faces
              <span className="block mt-3">
                <svg
                  viewBox="0 0 420 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[min(420px,60vw)] h-auto block mx-auto"
                >
                  <path
                    d="M4 20C60 8 140 4 210 10C280 16 350 26 414 14"
                    className="stroke-purple-brand"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="font-tagline text-ink/60 font-bold text-[clamp(20px,2.2vw,26px)] tracking-[0.005em] max-sm:my-4 max-sm:text-lg max-sm mt-5 mb-7 leading-[1.3] max-w-xl">
            High Standards. No Excuses.
          </p>

          <div className="flex gap-4 flex-wrap justify-center mb-[34px]">
            <a
              href="#quote"
              className="font-bold max-sm:text-sm text-base px-[30px] max-sm:py-3 py-4 rounded-[10px] no-underline inline-flex items-center gap-2.5 transition-transform duration-150 ease-in-out hover:-translate-y-0.5 bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:07346814368"
              className="font-bold max-sm:text-sm text-base px-[30px] max-sm:py-2.5 py-4 rounded-[10px] no-underline inline-flex items-center gap-2.5 transition-[transform,border-color] duration-150 ease-in-out hover:-translate-y-0.5 bg-transparent text-ink border-2 border-ink/20 hover:border-ink/40"
            >
              Call Now
            </a>
          </div>

          <div className="flex max-sm:gap-5 gap-7 flex-wrap justify-center pt-[26px] border-t border-ink/10">
            <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink/70">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ink/60 shrink-0">
                <path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" />
              </svg>
              Fully Insured
            </div>
            <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink/70">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ink/60 shrink-0">
                <path d="M12 17.3l-6.2 3.7 1.6-7L2 9.3l7.1-.6L12 2l2.9 6.7 7.1.6-5.4 4.7 1.6 7z" />
              </svg>
              Satisfaction Guaranteed
            </div>
            <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink/70">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ink/60 shrink-0">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.6l4 2.4-.8 1.3-4.7-2.8V6h1.5v6.6z" />
              </svg>
              Fast &amp; Reliable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
