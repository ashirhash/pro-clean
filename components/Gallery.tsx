"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const images = [
  { src: "/gallery_1.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_2.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_3.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_4.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_5.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_6.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
  { src: "/gallery_7.jpg", alt: "Bristol home cleaned by Pro Clean Bristol" },
];

const ArrowIcon = ({ direction }: { direction: "back" | "forward" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-4 h-4 fill-ink ${direction === "back" ? "rotate-180" : ""}`}
  >
    <path d="M13.2 5.6l1.4-1.4 7.8 7.8-7.8 7.8-1.4-1.4 5.4-5.4H2v-2h16.6l-5.4-5.4z" />
  </svg>
);

export default function Gallery() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section className=" text-ink mt-16 md:mt-24 lg:mt-28 relative lg:min-h-[480px]">
      <div className="container  flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex flex-col gap-4 lg:flex-1 lg:justify-center">
          <h2 className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-[clamp(28px,4.5vw,60px)]">
            The work
          </h2>
          <p className="font-tagline text-ink/70 text-lg leading-[1.5]">
            Real results from real homes in Bristol
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-1 min-w-0 lg:absolute lg:top-0 lg:right-0 lg:w-[50%] lg:h-full ">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            slidesPerView="auto"
            spaceBetween={24}
            loop={true}
            className="w-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={image.src}
                className="!w-[240px] !h-[240px] sm:!w-[320px] sm:!h-[320px] lg:!w-[400px] lg:!h-[400px] shrink-0"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 240px"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-ink/15"
              >
                <ArrowIcon direction="back" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-ink/15"
              >
                <ArrowIcon direction="forward" />
              </button>
            </div>

            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Go to image ${index + 1}`}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === active ? "bg-ink" : "bg-ink/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
