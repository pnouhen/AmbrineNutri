import React, { useCallback, useState, useEffect } from "react";

export default function ReviewsDots({
    emblaApi,
  reviewsSlidesShowLength,
}) {
    const [selectedIndex, setSelectedIndex] = useState(0);

     const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      }, []);
    
      useEffect(() => {
        if (!emblaApi) return;
    
        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect).on("select", onSelect);
      }, [emblaApi, onSelect]);
    
  return (
    <div className="w-ful flex justify-center">
      <ul className="w-full flex justify-center gap-4">
        {[...Array(Math.round(reviewsSlidesShowLength))].map((_, index) => (
          <li
            key={index}
            className={`w-5 h-2.5 border-2 border-brown rounded-xl ${
              index === selectedIndex ? "bg-brown" : ""
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
}
