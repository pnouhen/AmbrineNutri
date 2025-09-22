import React from "react";

export function NumberDivInvisible({ numberDivInvisible, className }) {
  // Create object depending to number invisible
  return [...Array(numberDivInvisible)].map((_, index) => (
    <div key={index} className={`flex-shrink-0 ${className}`}></div>
  ));
}
