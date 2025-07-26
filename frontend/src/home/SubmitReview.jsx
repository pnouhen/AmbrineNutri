import React, { useState, useRef, useEffect } from "react";

import { fetchDataPost } from "../services/fetchDataPost";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import StarRating from "./StarRating";

export default function SubmitReview({ setCheckSubmit, setReviews }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const enterCount = comment.split("\n").length * 49 + 1;
  const maxCommentLength = 500 - enterCount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();
    const commentTrimmed = comment.trim();

    const isValid =
      firstName !== "" &&
      lastName !== "" &&
      commentTrimmed !== "" &&
      rating !== 0;
    
      let isValidString = ""

      if(isValid) {
        isValidString = "reviewsTrue"
      } else {
         isValidString = "reviewsFalse"
      }
    setCheckSubmit(isValidString);

    const newReview = {
      date: new Date().toISOString(),
      name:
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1).toLowerCase() +
        " " +
        lastName.charAt(0).toUpperCase(),
      comment: commentTrimmed,
      rating,
    };

    if (isValid) {
      setReviews((prevReviews) => [...prevReviews, newReview]);

      try {
        const data = await fetchDataPost(
          `${import.meta.env.VITE_BASE_API}/api/reviews`,
          newReview
        );
      } catch (error) {
        console.error("Erreur:", error);
      }

      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      setComment("");
      setRating(0);
    }
  };

  return (
    <section className="section flex flex-col items-center gap-5 md:w-[43.75rem] w-full mx-auto">
      <h2 className="h2">Laisser un avis :</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-5"
      >
        <div className="w-full flex flex-row md:flex-nowrap flex-wrap justify-between gap-5">
          <LabelInput
            htmlFor="lastName"
            label="Nom"
            type="text"
            id="lastName"
            classNameInput="w-[14.5625rem] h-10"
            ref={lastNameRef}
          />

          <LabelInput
            htmlFor="firstName"
            label="Prénom"
            type="text"
            id="firstName"
            classNameInput="w-[14.5625rem] h-10"
            ref={firstNameRef}
          />
        </div>

        <StarRating
          classNameUl="mt-[7px] ml-16"
          rating={rating}
          setRating={setRating}
        />

        <div className="h-80 w-full py-5 px-5 inputButton insideInput flex flex-col gap-2">
          <span className="text-xs italic text-end">
            Nombre de caractères restants : {maxCommentLength - comment.length}
          </span>
          <label htmlFor="comment" className="h-0 w-0"></label>
          <textarea
            id="comment"
            className="h-full resize-none overflow-auto focus:outline-none text-black text-bold"
            placeholder="Écrivez votre commentaire ici..."
            onChange={(e) => setComment(e.target.value)}
            maxLength={maxCommentLength}
            value={comment}
          />
        </div>

        <Button className="w-52 buttonSubmit" type="submit" text="Partagez" />
      </form>
    </section>
  );
}
