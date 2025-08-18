import React from "react";
import { formatNumber } from "../components/formatNumber";

export function Ingredients({ recipeDetails, indexPeople, buy }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="h3 text-white-200">Les ingrédients :</h3>

      <div className="flex flex-col gap-1">
        {recipeDetails?.ingredients.map((ingredient, index) => (
          <p key={index} className="text text-white-200">
            {buy
              ? (formatNumber(Number(ingredient.quantity) * (indexPeople + 1)))
              : "***"}
            {ingredient.dosage.length <= 2 ? "" : " "}
            {buy ? ingredient.dosage : ""} {ingredient.name}
          </p>
        ))}
      </div>
    </div>
  );
}
