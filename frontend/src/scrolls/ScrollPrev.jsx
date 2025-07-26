import React from "react";

export default function ScrollPrev({ emblaApi, className, text }) {
  const scrollPrev = () => {
    emblaApi.scrollPrev();
  };

  return (
    <div
      className={`mx-auto flex items-center gap-1 ${className}`}
      onClick={scrollPrev}
    >
      <i className="fa-solid fa-chevron-left "></i>

      <p>{text}</p>
    </div>
  );
}
