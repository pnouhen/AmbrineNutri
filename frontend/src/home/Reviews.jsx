import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReviewsCard from "./ReviewsCard";
import { reviews } from "../../public/data/reviews";

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(1);

//   ChatGpt
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="section relative flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
      <div className="px-5">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="embla__slide lg:w-[32%] w-full ml-4 flex-shrink-0"
              >
                <ReviewsCard
                  name={review.name}
                  rating={review.rating}
                  comment={review.comment}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 px-4 translate-y-1/2 w-full flex justify-between">
        <i
          className="fa-solid fa-chevron-left cursor-pointer"
          onClick={scrollPrev}
        ></i>
        <i
          className="fa-solid fa-chevron-right cursor-pointer"
          onClick={scrollNext}
        ></i>
      </div>

      <div className="w-ful flex justify-center">
        <div className="w-1/2 h-2 border-2 rounded-xl border-brown">
          <div
            style={{ width: `${((selectedIndex + 1) / reviews.length) * 100}%` }}
            className="h-full bg-brown"
          ></div>
        </div>
      </div>
    </section>
  );
}
