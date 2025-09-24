import React from "react";

export function Ingredients({ recipeDetails, indexPeople, purchase }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="max-md:mx-auto flex flex-col gap-2.5">
      <h3 className="h3 text-white-200">Les ingrédients :</h3>

      <div className="flex flex-col gap-1">
        {recipeDetails?.ingredients.map((ingredient, index) => (
          <p key={index} className="text text-white-200">
            {purchase
              ? formatNumber(Number(ingredient.quantity) * indexPeople)
              : "***"}
            {/* Dosage arrangement according to it's type */}
            {ingredient.dosage?.length <= 2 ? "" : " "}
            {purchase ? ingredient.dosage : ""} {ingredient.name}
          </p>
        ))}
      </div>
    </div>
  );
}
