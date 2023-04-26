import { Navigation, Pagination } from "swiper";
import style from "./MultiSlider.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper";
interface SwiperProps<T> {
  elements: Array<T>;
  renderElement: (element: T) => JSX.Element;
  id: (element: T) => number;
  options?: SwiperOptions;
  className?: string;
}
export function MultiSlider<T>({
  renderElement,
  elements,
  className,
  options,
  id,
}: SwiperProps<T>) {
  const slides = elements.map((element) => {
    return (
      <SwiperSlide className={style["swiper-slider"]} key={id(element)}>
        {renderElement(element)}
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      className={className}
      modules={[Navigation, Pagination]}
      spaceBetween={25}
      breakpoints={
        options
          ? options.breakpoints
          : {
              480: {
                slidesPerView: 2,
              },
              720: {
                slidesPerView: 3,
              },
              1080: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
              1480: {
                slidesPerView: 6,
              },
              1680: {
                slidesPerView: 7,
              },
            }
      }
    >
      {slides}
    </Swiper>
  );
}
