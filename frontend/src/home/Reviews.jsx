import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import { reviews } from "../../public/data/reviews";
import ReviewsSlideShow from "./ReviewsSlideShow";

import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";
import ReviewsDots from "./ReviewsDots";

export default function Reviews() {
  const reviewsSlidesShow = reviews.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const options = { slidesToScroll: "auto", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  let reviewsSlidesShowLength = reviewsSlidesShow.length;
  let numberDivInvisible = 0;
  if (window.innerWidth >= 1024) {
    reviewsSlidesShowLength = Math.ceil(reviewsSlidesShow.length / 3);
    numberDivInvisible = reviewsSlidesShowLength * 3 - reviewsSlidesShow.length;
  }

  return (
    <section className="section flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
      <div className="flex items-center gap-5">
        <ScrollPrev emblaApi={emblaApi} />
        <ReviewsSlideShow
          emblaRef={emblaRef}
          reviewsSlidesShow={reviewsSlidesShow}
          numberDivInvisible={numberDivInvisible}
        />
        <ScrollNext emblaApi={emblaApi} />
      </div>
      <ReviewsDots
        emblaApi={emblaApi}
        reviewsSlidesShowLength={reviewsSlidesShowLength}
      />
    </section>
  );
}
