import React from "react";

export default function RecipeCard({
  duration,
  classNameRegime,
  textRegime,
  classNameImg,
  src,
  title,
}) {
  return (
    <div className="relative">
      <p className="text useBadgeInfo duration">{duration}</p>
      <p className={classNameRegime}>{textRegime}</p>
      <img
        className={`imgRecipe ${classNameImg}`}
        src={src}
        alt={`Image de ${title}`}
        loading="eager"
      />
      <h3 className="h3 absolute left-1/2 top-1/2 -translate-1/2 w-full text-center">
        {title}
      </h3>
    </div>
  );
}
