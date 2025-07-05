import React from "react";

export default function ScrollNext({ emblaApi }) {
  const scrollNext = () => {
    emblaApi.scrollNext();
  };

  return (
    <i
      className="fa-solid fa-chevron-right md:text-3xl text-[0rem] cursor-pointer"
      onClick={scrollNext}
    ></i>
  );
}
