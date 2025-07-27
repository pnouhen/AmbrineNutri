import React from "react";

export default function ScrollNext({ emblaApi, className, text }) {
  const scrollNext = () => {
    emblaApi.scrollNext();
  };

  return (
    <div
      className={`mx-auto flex items-center gap-1 ${className}`}
      onClick={scrollNext}
    >
      <p>{text}</p>

      <i className="fa-solid fa-chevron-right "></i>
    </div>
  );
}
