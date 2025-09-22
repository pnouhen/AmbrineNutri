import React, { useState } from "react";

// Function for display starRating and give a rating
export default function StarRating({
  classNameUl,
  rating = 0,
  setRating = null,
  showLabel = true,
}) {
  const [hoverGiveRating, setHoverGiveRating] = useState(0);

  // Detect if the component is editable
  const editable = typeof setRating === "function";

  const giveRatingText = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];

  // if editable = Hover, else rating
  const currentRating = hoverGiveRating || rating;

  const changeRating = (e) => {
    if (e.key === "ArrowLeft" && rating > 1) setRating((prev) => prev - 1);
    if (e.key === "ArrowRight" && rating < 5) setRating((prev) => prev + 1);
  };

  return (
    <ul
      tabIndex={0}
      onKeyDown={(e) => changeRating(e)}
      className={`flex ${classNameUl}`}
    >
      {[...Array(5)].map((_, i) => (
        <li key={i}>
          <i
            className={`fa-solid fa-star text pr-2 ${
              i < currentRating ? "text-green-100" : "text-gray"
            }`}
            onClick={editable ? () => setRating(i + 1) : undefined}
            onMouseEnter={
              editable ? () => setHoverGiveRating(i + 1) : undefined
            }
            onMouseLeave={editable ? () => setHoverGiveRating(0) : undefined}
            style={{ cursor: editable ? "pointer" : "default" }}
          ></i>
        </li>
      ))}
      {showLabel && (
        <li className="pg-2 font-bold w-24">{giveRatingText[currentRating]}</li>
      )}
    </ul>
  );
}
