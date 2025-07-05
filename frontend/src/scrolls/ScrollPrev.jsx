import React from "react";

export default function ScrollPrev({ emblaApi }) {
  const scrollPrev = () => {
    emblaApi.scrollPrev();
  };

  return (
    <i
      className="fa-solid fa-chevron-left md:text-3xl text-[0rem] cursor-pointer"
      onClick={scrollPrev}
    ></i>
  );
}
