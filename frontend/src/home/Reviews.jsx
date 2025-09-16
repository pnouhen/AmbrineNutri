import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";

import ReviewsSlideShow from "./ReviewsSlideShow";
import ReviewsDots from "./ReviewsDots";

import MessageNoData from "../components/MessageNoData";

export default function Reviews({ reviews }) {
    const [showReviews, setShowReviews] = useState(false);
  const options = { slidesToScroll: "auto", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (reviews.length > 1) {
      const timeout = setTimeout(() => setShowReviews(true), 200);
      console.log(timeout)
      return () => clearTimeout(timeout);
    }
  }, [reviews.length]);

  let reviewsLength = reviews.length;
  let numberDivInvisible = 0;

  if (window.innerWidth >= 1024) {
    reviewsLength = Math.ceil(reviews.length / 3);
    numberDivInvisible = reviewsLength * 3 - reviews.length;
  }

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
      {reviews.length > 1 ? (
        <div className={`transition-opacity duration-300 ${showReviews ? "opacity-100 h-full" : "opacity-0 h-0"}`}>
          <div className="flex items-center gap-5">
            <ScrollPrev emblaApi={emblaApi} className="md:text-3xl text-base cursor-pointer" />
            <ReviewsSlideShow
              emblaRef={emblaRef}
              reviews={reviews}
              numberDivInvisible={numberDivInvisible}
            />
            <ScrollNext emblaApi={emblaApi} className="md:text-3xl text-base cursor-pointer"/>
          </div>
          <ReviewsDots emblaApi={emblaApi} reviewsLength={reviewsLength} />
        </div>
      ) : (
        <MessageNoData text="Désolé, un problème est survenu."/>
      )}
    </section>
  );
}
