import React from "react";

export default function ReviewsCard({ name, rating, comment }) {
  return (
    <>
    <div className="w-full flex justify-between">
        <p className="p-16 font-semibold">{name}</p>
      <ul className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <i
              className={`fa-solid fa-star text-xl ${
                index < rating ? "text-green" : "text-gray"
              }`}
            ></i>
          </li>
        ))}
      </ul>
    </div>
      
      <p className="p-16 mt-8">{comment}</p>
    </>
  );
}
