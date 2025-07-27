import React from "react";

export function NumberDivInvisible({ numberDivInvisible, className }) {
  return [...Array(numberDivInvisible)].map((_, index) => (
    <div key={index} className={`flex-shrink-0 ${className}`}></div>
  ));
}
