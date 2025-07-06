import React, { useState } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import StarRating from "./StarRating";

export default function SubmitReview() {
  const [rating, setRating] = useState(0);

  return (
    <section className="section flex flex-col items-center gap-5 lg:w-[43.75rem] w-full mx-auto">
      <h2 className="h2">Laisser un avis :</h2>
      <form action="" className="w-full flex flex-col items-center gap-5">
        <div className="w-full flex lg:flex-row flex-col justify-between gap-5">
          <LabelInput
            htmlFor="lastName"
            label="Nom"
            type="text"
            id="lastName"
            classNameInput="w-[14.5625rem] h-10"
            // ref={lastNameRef}
          />

          <LabelInput
            htmlFor="firstName"
            label="Prénom"
            type="text"
            id="firstName"
            classNameInput="w-[14.5625rem] h-10"
            // ref={firstNameRef}
          />
        </div>

        <StarRating classNameUl="mt-[7px] ml-16" rating={rating} setRating={setRating} />

        <div className="relative w-full flex flex-col justify-between gap-2.5 font18-600">
          <label htmlFor="review" className="font18-600">Votre avis</label>
          <span className="absolute right-5 top-12 text-xs italic bg-transparent">
            Caractères restant : XXX
          </span>
          <textarea
            id="review"
            className="h-80 overflow-y-auto py-8 px-5 inputButton insideInput resize-none"
            // ref={reviewRef}
          />
        </div>
        <Button className="w-52 buttonSubmit" type="submit" text="Partagez" />
      </form>
    </section>
  );
}
