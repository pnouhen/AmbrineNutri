import React, { useState } from "react";
import Cleave from "cleave.js/react";

export function InputSelect({
  indexPeople,
  setIndexPeople,
  notifyButtonInactive,
  purchase,
}) {
  const lessPeople = () => {
    if (indexPeople > 1 && purchase) setIndexPeople(indexPeople - 1);
  };

  const morePeople = () => {
    if (purchase) setIndexPeople(indexPeople + 1);
  };

  return (
    <div
      className="inputButton insideInput mx-auto lg:w-52 md:w-full w-40 py-2.5 px-3 flex justify-between"
      onClick={notifyButtonInactive}
    >
      <button title="Diminuer" className="cursor-pointer" onClick={lessPeople}>
        <i className="fa-solid fa-minus"></i>
      </button>
      <p>
        {indexPeople} {indexPeople === 1 ? "personne" : "personnes"}
      </p>
      <button title="Augmenter" className="cursor-pointer" onClick={morePeople}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
