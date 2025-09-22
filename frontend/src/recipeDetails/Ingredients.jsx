import React from "react";

export function Ingredients({ recipeDetails, indexPeople, buy }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="max-md:mx-auto flex flex-col gap-2.5">
      <h3 className="h3 text-white-200">Les ingrédients :</h3>

      <div className="flex flex-col gap-1">
        {recipeDetails?.ingredients.map((ingredient, index) => (
          <p key={index} className="text text-white-200">
            {buy
              ? formatNumber(Number(ingredient.quantity) * indexPeople)
              : "***"}
            {ingredient.quantity?.length <= 2 ? "" : " "}
            {buy ? ingredient.quantity : ""} {ingredient.name}
          </p>
        ))}
      </div>
    </div>
  );
}
