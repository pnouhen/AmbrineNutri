import React from "react";
import { NavLink } from "react-router-dom";

export default function RecipeCard({
  id,
  duration,
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
    <NavLink className="relative m-auto flex flex-shrink-0" id={id} to={`/recettes/${id}`}>
      <p className="text useBadgeInfo duration">{duration}</p>
      <p className={classNameRegime}>{textRegime}</p>
      <img className="imgRecipe opacity-40" src={src} alt={`Image de ${title}`} loading="eager" />
      <h3 className="h3 absolute left-1/2 top-1/2 -translate-1/2 w-full text-center">{title}</h3>
    </NavLink>
  );
}