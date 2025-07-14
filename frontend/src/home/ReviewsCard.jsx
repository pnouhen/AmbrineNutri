import React from "react";
import StarRating from "./StarRating";

export default function ReviewsCard({ name, rating, comment }) {
  return (
    <>
      <div className="w-full flex justify-between">
        <p className="p16 font-semibold">{name}</p>
        
        <StarRating rating={Number(rating)} showLabel={false} />
      </div>

      <p className="p16 mt-8">{comment}</p>
    </>
  );
}
