import React, { useState } from "react";

export function InputSelect({
  indexPeople,
  setIndexPeople,
  numberPeople,
  isOpen,
  setIsOpen,
}) {
  const handlePeople = (index) => {
    setIndexPeople(index);
  };

  const handleChangeInput = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === "ArrowDown" && indexPeople < numberPeople - 1) {
      setIndexPeople((prev) => prev + 1);
    }

    if (e.key === "ArrowUp" && indexPeople > 0) {
      setIndexPeople((prev) => prev - 1);
    }

    if (e.key === "Enter") {
      setIsOpen(false);
    }

    if (e.key === "Escape" || e.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div
      tabIndex={0}
      className="insideInput inputButton relative py-2.5 p-5 w-full mx-auto text flex justify-between items-center gap-5 cursor-pointer"
      onClick={handleChangeInput}
      onKeyDown={handleKeyDown}
    >
      <p>
        {indexPeople + 1} {indexPeople === 0 ? "personne" : "personnes"}
      </p>
      <i className="fa-solid fa-chevron-down"></i>
      <ul
        className={
          isOpen
            ? "absolute left-0 top-12 w-full border-b-2 border-l-2 border-r-2 bg-white-200"
            : "hidden"
        }
      >
        {[...Array(numberPeople)].map((_, index) => (
          <li
            key={index}
            className={`py-1 p-2.5 cursor-pointer ${
              index === indexPeople ? "text-white-200 bg-blue-500" : ""
            }`}
            onClick={() => handlePeople(index)}
            onMouseEnter={() => setIndexPeople(index)}
          >
            {index + 1} {index === 0 ? "personne" : "personnes"}
          </li>
        ))}
      </ul>
    </div>
  );
}
