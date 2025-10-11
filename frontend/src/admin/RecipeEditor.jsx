import React from "react";

import Button from "../components/Button";

export default function RecipeEditor({ setActionRecipe, actionRecipe }) {
  const dataButton = [
    {
      text: "Ajouter",
      action: "add",
    },
    {
      text: "Modifier",
      action: "update",
    },
    {
      text: "Supprimer",
      action: "delete",
    },
  ];
  return (
    <div className="section pb-5 px-5 ">
      <h2 className="h2 mb-5 w-full">Modifier les recettes :</h2>

      <ul className="lg:grid lg:grid-cols-3 flex flex-wrap justify-center gap-8">
        {dataButton.map((button, index) => (
          <li key={index} className="flex justify-center">
            <Button
              key={index}
              text={button.text}
              className={`recipeButton w-52 max-md:w-24 max-md:h-20 ${
                actionRecipe === button.action ? "recipeButtonActive" : ""
              }`}
              onClick={() => setActionRecipe(button.action)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
