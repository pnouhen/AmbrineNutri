import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { fetchData } from "../services/fetchData";
import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";

import ReviewsSlideShow from "./ReviewsSlideShow";
import ReviewsDots from "./ReviewsDots";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData("http://localhost:3000/api/reviews")
      .then((data) => setReviews(data))
      .catch((error) => console.error("Erreur de chargement", error));
  }, []);

  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  const options = { slidesToScroll: "auto", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  let reviewsLength = reviews.length;
  let numberDivInvisible = 0;

  if (window.innerWidth >= 1024) {
    reviewsLength = Math.ceil(reviews.length / 3);
    numberDivInvisible = reviewsLength * 3 - reviews.length;
  }

  return (
    <section className="section flex flex-col gap-5 overflow-hidden">
      <h2 className="h2">Les avis :</h2>
      <div className="flex items-center gap-5">
        <ScrollPrev emblaApi={emblaApi} />
        <ReviewsSlideShow
          emblaRef={emblaRef}
          reviews={reviews}
          numberDivInvisible={numberDivInvisible}
        />
        <ScrollNext emblaApi={emblaApi} />
      </div>
      <ReviewsDots emblaApi={emblaApi} reviewsLength={reviewsLength} />
    </section>
  );
}
