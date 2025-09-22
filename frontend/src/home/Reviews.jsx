import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";

import ReviewsSlideShow from "./ReviewsSlideShow";
import ReviewsDots from "./ReviewsDots";

export default function Reviews({ reviews }) {
  // For slide show width Embla Carousel React
  const options = { slidesToScroll: "auto", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // Display function responsive and number reviews
  let reviewsLength = reviews?.length;
  let numberDivInvisible = 0;
  if (window.innerWidth >= 1024) {
    reviewsLength = Math.ceil(reviews?.length / 3);
    // If the number of reviews is not a multiple of three, create two invisible divs to maintain a consistent display
    numberDivInvisible = reviewsLength * 3 - reviews?.length;
  }

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
      {/* Display according to reviews*/}
      {reviews?.length > 0 ? (
        <>
          <div className="flex items-center gap-5">
            <ScrollPrev
              emblaApi={emblaApi}
              className="md:text-3xl text-base cursor-pointer"
            />
            <ReviewsSlideShow
              emblaRef={emblaRef}
              reviews={reviews}
              numberDivInvisible={numberDivInvisible}
            />
            <ScrollNext
              emblaApi={emblaApi}
              className="md:text-3xl text-base cursor-pointer"
            />
          </div>
          <ReviewsDots emblaApi={emblaApi} reviewsLength={reviewsLength} />
        </>
      ) : (
        <p className="text text-center">Désolé, un problème est survenu.</p>
      )}
    </section>
  );
}
