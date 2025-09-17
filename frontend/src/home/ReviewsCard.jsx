import React from "react";
import StarRating from "./StarRating";

export default function ReviewsCard({ review }) {
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex gap-1">
          <p className="text font-semibold truncate max-w-24">{review.firstName}</p>
          <p className="text font-semibold">{review.lastName}</p>
        </div>
        
        
        <StarRating rating={Number(review.rating)} showLabel={false} />
      </div>

      <p className="text mt-8 break-words">{review.comment}</p>
    </>
  );
}
