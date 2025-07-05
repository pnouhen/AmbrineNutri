import React from "react";

import ReviewsCard from "./ReviewsCard";

export default function ReviewsSlideShow({
  emblaRef,
  reviewsSlidesShow,
  numberDivInvisible
}) {

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {reviewsSlidesShow.map((review, index) => (
          <div key={index} className="lg:w-[32%] w-full ml-4 flex-shrink-0">
            <ReviewsCard
              name={review.name}
              rating={review.rating}
              comment={review.comment}
            />
          </div>
        ))}
        {[...Array(numberDivInvisible)].map((_, index) => (
          <div
            key={index}
            className="lg:w-[32%] w-full ml-4 flex-shrink-0"
          ></div>
        ))}
      </div>
    </div>
  );
}
