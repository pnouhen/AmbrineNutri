import React, { useState } from "react";

import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";

export default function ModalRecipeGeneral({
  infoAddRecipes,
  nameRecipeRef,
  categorieRecipeRef,
}) {
  // TODO déplacer vers le parent
  const [categorieSelect, setCategorieSelect] = useState(
    "Sélectioner une catégorie"
  );
  const [durationSelect, setDurationSelect] = useState("Sélectioner une durée");
  const [vegetarienSelect, setVegetarienSelect] = useState("Végétarien ?");

  const categories =
    infoAddRecipes.find((el) => el.type === "categories")?.values || [];

  const duration =
    infoAddRecipes.find((el) => el.type === "duration")?.values || [];

    const vegetarien =
    infoAddRecipes.find((el) => el.type === "vegetarian")?.values || [];

  return (
    <div className="w-">
      <LabelInput
        classNameLabelInput="mx-auto"
        htmlFor="nameRecipe"
        label="Nom de la recette :"
        type="text"
        id="nameRecipe"
        ref={nameRecipeRef}
      />

      <LabelSelect
        classNameLabelSelect="lg:w-72 md:w-64 max-md:max-w-60"
        data={categories}
        title="Catégorie :"
        newOption={categorieSelect}
        setOption={setCategorieSelect}
      />

      <LabelSelect
        classNameLabelSelect="lg:w-72 md:w-64 max-md:max-w-60"
        data={duration}
        title="Durée :"
        newOption={durationSelect}
        setOption={setDurationSelect}
      />

      <LabelSelect
        classNameLabelSelect="lg:w-72 md:w-64 max-md:max-w-60"
        data={vegetarien}
        title="Végétarien :"
        newOption={vegetarienSelect}
        setOption={setVegetarienSelect}
      />
    </div>
  );
}
