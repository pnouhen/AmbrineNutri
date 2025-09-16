import React, { useState } from "react";

export default function StarRating({
  classNameUl,
  rating = 0,
  setRating = null,
  showLabel = true,
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const editable = typeof setRating === "function";

  const ratingText = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];
  const current = hoverRating || rating;

  return (
    <ul className={`flex ${classNameUl}`}>
      {[...Array(5)].map((_, i) => (
        <li key={i}>
          <i
          className={`fa-solid fa-star text pr-2 ${
            i < current ? "text-green-100" : "text-gray"
          }`}
          onClick={editable ? () => setRating(i + 1) : undefined}
          onMouseEnter={editable ? () => setHoverRating(i + 1) : undefined}
          onMouseLeave={editable ? () => setHoverRating(0) : undefined}
          style={{ cursor: editable ? "pointer" : "default" }}
        ></i>
        </li>
        
      ))}
      {showLabel && (
        <li className="pg-2 font-bold w-24">{ratingText[current]}</li>
      )}
    </ul>
  );
}
