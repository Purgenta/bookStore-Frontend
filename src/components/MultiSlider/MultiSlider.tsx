import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
interface SwiperProps<T> {
  elements: Array<T>;
  renderElement: (element: T) => JSX.Element;
  id: (element: T) => number;
  swiper?: string;
}
export function MultiSlider<T>({
  renderElement,
  elements,
  swiper,
  id,
}: SwiperProps<T>) {
  const slides = elements.map((element) => {
    return (
      <SwiperSlide key={id(element)}>{renderElement(element)}</SwiperSlide>
    );
  });
  return (
    <Swiper
      className={swiper}
      spaceBetween={50}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        1080: {
          spaceBetween: 20,
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
        1680: {
          slidesPerView: 8,
          spaceBetween: 20,
        },
        2000: {
          slidesPerView: 9,
          spaceBetween: 20,
        },
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides}
    </Swiper>
  );
}
