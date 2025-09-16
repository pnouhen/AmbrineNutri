import React from "react";

import ReviewsCard from "./ReviewsCard";
import { NumberDivInvisible } from "../components/NumberDivInvisible";

export default function ReviewsSlideShow({
  emblaRef,
  reviews,
  numberDivInvisible,
}) {
  return (
    <div className="overflow-hidden"ref={emblaRef}>
      <div className="embla__container flex">
        {reviews.map((review, index) => (
          <div key={index} className="lg:w-[32%] w-full ml-4 flex-shrink-0">
            <ReviewsCard
              review={review}
            />
          </div>
        ))}

        <NumberDivInvisible
          numberDivInvisible={numberDivInvisible}
          className="lg:w-[32%] w-full ml-4"
        />
      </div>
    </div>
  );
}
