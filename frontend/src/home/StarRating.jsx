import React, { useState } from "react";

import { ratingText } from "../../public/data/ratingText";

export default function StarRating({
  classNameUl,
  rating = 0,
  setRating = null,
  showLabel = true,
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const editable = typeof setRating === "function";

  const current = hoverRating || rating;

  return (
    <ul className={`flex ${classNameUl}`}>
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fa-solid fa-star text-xl pr-2 ${
            i < current ? "text-green" : "text-gray"
          }`}
          onClick={editable ? () => setRating(i + 1) : undefined}
          onMouseEnter={editable ? () => setHoverRating(i + 1) : undefined}
          onMouseLeave={editable ? () => setHoverRating(0) : undefined}
          style={{ cursor: editable ? "pointer" : "default" }}
        ></i>
      ))}
      {showLabel && <p className="pg-2 font-bold w-24">{ratingText[current]}</p>}
    </ul>
  );
}
