import React, { useRef, useState } from "react";

import Button from "../components/Button";
import ModalRecipeGeneral from "./ModalRecipeGeneral";
import ModalClose from "../Modals/ModalClose";
import ModalRecipeIngredients from "./ModalRecipeIngredients";

export default function ModalRecipe({ infoAddRecipes }) {
  const [displayPart, setDisplayPart] = useState("ingredients");

  const nameRecipeRef = useRef();

  const [categorieSelect, setCategorieSelect] = useState(
    "Sélectioner une catégorie"
  );
  const [durationSelect, setDurationSelect] = useState("Sélectioner une durée");
  const [vegetarienSelect, setVegetarienSelect] = useState("Végétarien ?");

  // Data for recipe
  const categories =
    infoAddRecipes.find((el) => el.type === "categories")?.values || [];

  const duration =
    infoAddRecipes.find((el) => el.type === "duration")?.values || [];

  const vegetarien =
    infoAddRecipes.find((el) => el.type === "vegetarian")?.values || [];

  const [nameLabelImg, setNameLabelImg] = useState("+ Ajouter un image");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const dosage =
    infoAddRecipes.find((el) => el.type === "dosage")?.values || [];

  const [ingredients, setIngredients] = useState([]);

  // Data button
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

  // Manage the overflow of the modal parts
  const getFormHeight = () => {
    if (window.innerWidth > 767) {
      return window.innerHeight < 710
        ? `${(window.innerHeight - 280) / 16}rem`
        : "28.5rem";
    } else {
      return window.innerHeight < 710
        ? `${(window.innerHeight - 311) / 16}rem`
        : "";
    }
  };

  return (
    <div className="modal">
      <div
        className={`modalContainer lg:w-[59rem] md:w-[42rem] w-full lg:h-[42rem] md:h-[40.5rem] h-[calc(100%_-_40px)]`}
      >
        <ModalClose />

        <ul className="py-5 w-full flex flex-wrap justify-between gap-5 border-b-2 border-gray-400">
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
          <ModalRecipeGeneral
            getFormHeight={getFormHeight}
            nameRecipeRef={nameRecipeRef}
            categories={categories}
            categorieSelect={categorieSelect}
            setCategorieSelect={setCategorieSelect}
            duration={duration}
            durationSelect={durationSelect}
            setDurationSelect={setDurationSelect}
            vegetarien={vegetarien}
            vegetarienSelect={vegetarienSelect}
            setVegetarienSelect={setVegetarienSelect}
            nameLabel={nameLabelImg}
            setNameLabel={setNameLabelImg}
            file={file}
            setFile={setFile}
            preview={preview}
            setPreview={setPreview}
          />
        )}

        {displayPart === "ingredients" && (
          <ModalRecipeIngredients
            dosage={dosage}
            ingredients={ingredients}
            setIngredients={setIngredients}
            getFormHeight={getFormHeight}
          />
        )}

        <div className="pt-5 w-full flex justify-center border-t-2 border-gray-400">
          <Button text="Enregister" className={`px-5`} />
        </div>
      </div>
    </div>
  );
}
