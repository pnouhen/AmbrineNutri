import React, { useCallback, useEffect, useState } from "react";

import ScrollPrev from "../scrolls/ScrollPrev";
import ScrollNext from "../scrolls/ScrollNext";

export function RecipePagination({ emblaApi }) {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi) => {
    setSnapCount(emblaApi.scrollSnapList().length);
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on("select", updateScrollSnapState);
    emblaApi.on("reInit", updateScrollSnapState);
  }, [emblaApi, updateScrollSnapState]);

  return (
    <div className="grid grid-cols-3">
      <ScrollPrev
        emblaApi={emblaApi}
        className={`text ${
          selectedSnap === 0 ? "opacity-40" : "cursor-pointer"
        }`}
        text="Page Pré."
      />
      <p className="text m-auto">
        {" "}
        {selectedSnap + 1} / {snapCount}
      </p>
      <ScrollNext
        emblaApi={emblaApi}
        className={`text ${
          selectedSnap + 1 === snapCount ? "opacity-40" : "cursor-pointer"
        }`}
        text="Page Suiv."
      />
    </div>
  );
}
