import React, { useRef, useState } from "react";

import Button from "../components/Button";
import ModalRecipeGeneral from "./ModalRecipeGeneral";

export default function ModalRecipe({ infoAddRecipes }) {
  const [displayPart, setDisplayPart] = useState("general");

  const nameRecipeRef = useRef()
  const categorieRecipeRef = useRef()

  const dataButton = [
    {
      text: "Général",
      action: "general",
    },
    {
      text: "Ingrédients",
      action: "ingredients",
    },
    {
      text: "Ustensils",
      action: "ustensils",
    },
    {
      text: "Etapes",
      action: "steps",
    },
  ];

  return (
    // Voir avec modal in layout
    <div className="modal">
      <div className="modalContainer w-11/12 h-96">
        <ul className="flex flex-wrap justify-between gap-5">
          {dataButton.map((button, index) => (
            <li key={index} className="mx-auto">
              <Button
                className={`recipeButton lg:w-52 w-32 ${
                  displayPart === button.action && "recipeButtonActive"
                }`}
                text={button.text}
                onClick={() => setDisplayPart(button.action)}
              />
            </li>
          ))}
        </ul>
        {displayPart === "general" && (
          <ModalRecipeGeneral infoAddRecipes={infoAddRecipes} nameRecipeRef={nameRecipeRef} categorieRecipeRef={categorieRecipeRef} />
        )}
      </div>
    </div>
  );
}
