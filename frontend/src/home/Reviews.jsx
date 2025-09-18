import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";

import ReviewsSlideShow from "./ReviewsSlideShow";
import ReviewsDots from "./ReviewsDots";

import MessageNoData from "../components/MessageNoData";

export default function Reviews({ reviews }) {
  const [showReviews, setShowReviews] = useState(true);
  const options = { slidesToScroll: "auto", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  let reviewsLength = reviews.length;
  let numberDivInvisible = 0;

  if (window.innerWidth >= 1024) {
    reviewsLength = Math.ceil(reviews.length / 3);
    numberDivInvisible = reviewsLength * 3 - reviews.length;
  }

  const renderReviews = () => {
    if(reviews.length > 0) {
      return (
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
      )
    }

    return(
      <p className="text text-center">Désolé, un problème est survenu.</p>
    )
  }

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
     {renderReviews()}
    </section>
  );
}
