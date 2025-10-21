import React, { useEffect, useRef, useState } from "react";

import Button from "../components/Button";
import ModalRecipeGeneral from "./ModalRecipeGeneral";
import ModalClose from "../Modals/ModalClose";
import ModalRecipeIngredients from "./ModalRecipeIngredients";
import ModalRecipeAddDetails from "./ModalRecipeAddDetails";
import { fetchDataUserGet } from "../services/fetchDataUserGet";
import { handleRecipeImage } from "../services/handleRecipeImage";

export default function ModalRecipe({
  updateRecipeId,
  setUpdateRecipeId,
  token,
  userInfo,
  infoAddRecipes,
  setRecipes,
  setModalRecipeActive,
  actionRecipes,
  setImgUpdated,
  setModalMessage,
}) {
  const [displayPart, setDisplayPart] = useState("general");

  // The general part
  const [nameRecipe, setNameRecipe] = useState("");
  const [categorieSelect, setCategorieSelect] = useState(
    "Sélectioner une catégorie"
  );
  const [durationSelect, setDurationSelect] = useState("Sélectioner une durée");
  const [vegetarianSelect, setVegetarianSelect] = useState("Végétarien ?");
  const [nameLabelImg, setNameLabelImg] = useState("+ Ajouter un image");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Other parts
  const [ingredients, setIngredients] = useState([]);

  const [ustensils, setUstensils] = useState([]);

  const [steps, setSteps] = useState([]);

  // Check Valide part
  const [isGeneralIncomplete, setIsGeneralIncomplete] = useState(false);
  const [isIngredientsIncomplete, setIsIngredientsIncomplete] = useState(false);
  const [isUstensilsIncomplete, setIsUstensilsIncomplete] = useState(false);
  const [isStepsIncomplete, setIsStepsIncomplete] = useState(false);
  const isCompleteGeneralPart =
    nameRecipe !== "" &&
    durationSelect !== "Sélectioner une durée" &&
    vegetarianSelect !== "Sélectioner une durée" &&
    file &&
    preview;
  const isCompleteAllParts =
    isCompleteGeneralPart &&
    ingredients.length > 0 &&
    ustensils.length > 0 &&
    steps.length > 0;

  // Data for recipe
  const categories =
    infoAddRecipes.find((el) => el.type === "categories")?.values || [];
  const duration =
    infoAddRecipes.find((el) => el.type === "duration")?.values || [];
  const vegetarian =
    infoAddRecipes.find((el) => el.type === "vegetarian")?.values || [];
  const dosage =
    infoAddRecipes.find((el) => el.type === "dosage")?.values || [];

  // Data button
  const dataButton = [
    {
      text: "Général",
      action: "general",
      incomplete: isGeneralIncomplete,
    },
    {
      text: "Ingrédients",
      action: "ingredients",
      incomplete: isIngredientsIncomplete,
    },
    {
      text: "Ustensils",
      action: "ustensils",
      incomplete: isUstensilsIncomplete,
    },
    {
      text: "Etapes",
      action: "steps",
      incomplete: isStepsIncomplete,
    },
  ];

  // Get recipe update
  const [idRecipe, setIdRecipe] = useState("");

  // Generate informations of the recipe to update
  useEffect(() => {
    if ((token || userInfo?.role === "admin") && actionRecipes === "update") {
      const displayInfoUpdatedRecipe = (updateRecipe) => {
        setIdRecipe(updateRecipe._id);
        setNameRecipe(updateRecipe.title);
        setCategorieSelect(updateRecipe.categorie.text);
        setDurationSelect(updateRecipe.duration);
        setVegetarianSelect(updateRecipe.vegetarian);
        setNameLabelImg("Image chargé");
        setIngredients(updateRecipe.ingredients);
        setUstensils(updateRecipe.ustensils);
        setSteps(updateRecipe.steps);

        // Display image
        const storedBase64 = sessionStorage.getItem(updateRecipe.imageUrl);
        handleRecipeImage({
          input: storedBase64 ? storedBase64 : updateRecipe.imageUrl,
          setFile,
          setPreview,
          setNameLabel: setNameLabelImg,
        });
      };

      const alreadyUpdateRecipe = JSON.parse(
        sessionStorage.getItem(updateRecipeId)
      );

      if (alreadyUpdateRecipe) {
        displayInfoUpdatedRecipe(alreadyUpdateRecipe);
      } else {
        // Use /showRecipeSelectPurchase/ for get informations recipe
        fetchDataUserGet(
          `${
            import.meta.env.VITE_BASE_API
          }/api/users/me/showRecipeSelectPurchase/${updateRecipeId}`
        )
          .then((recipe) => {
            displayInfoUpdatedRecipe(recipe);
          })
          .catch((error) => console.error("Erreur:", error));
      }
    }
  }, [token]);

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

  // Close th modal
  const closeModal = () => {
    setModalRecipeActive(false);
    setUpdateRecipeId("");
  };

  // Submit the recipe
  const submitRecipe = () => {
    // Check incomplete
    if (!isCompleteGeneralPart) {
      setIsGeneralIncomplete(true);
    } else {
      setIsGeneralIncomplete(false);
    }
    if (!ingredients.length) {
      setIsIngredientsIncomplete(true);
    } else {
      setIsIngredientsIncomplete(false);
    }
    if (!ustensils.length) {
      setIsUstensilsIncomplete(true);
    } else {
      setIsUstensilsIncomplete(false);
    }
    if (!steps.length) {
      setIsStepsIncomplete(true);
    } else {
      setIsStepsIncomplete(false);
    }

    // Submit recipe
    if (isCompleteAllParts) {
      const recipes = JSON.parse(sessionStorage.getItem("recipes"));
      const isInRecipes = recipes.find((rcp) => rcp._id === idRecipe);
      const idAdd = Date.now();
      const id = isInRecipes ? idRecipe : idAdd;

      const recipe = {
        _id: id,
        title: nameRecipe,
        imageUrl: file.name,
        vegetarian: vegetarian,
        categorie: { text: categorieSelect },
        duration: durationSelect,
        ingredients: ingredients,
        ustensils: ustensils,
        steps: steps,
      };

      // Update or add recipe
      if (isInRecipes) {
        // Delete recipe modified
        const newRecipes = recipes.filter((rcp) => rcp._id !== idRecipe);
        // Show recipe in first
        newRecipes.unshift(recipe);

        // Actualise Recipes
        setRecipes(newRecipes);
        sessionStorage.setItem("recipes", JSON.stringify(newRecipes));
      } else {
        // Actualise Recipes
        setRecipes((prev) => [recipe, ...prev]);
        recipes.push(recipe);
        sessionStorage.setItem("recipes", JSON.stringify(recipes));
      }

      // Create recipe in sessionStorage for RecipeDetails
      sessionStorage.setItem(id, JSON.stringify(recipe));
    }

    // Stockage image in base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      sessionStorage.setItem(file.name, base64Data);
      setImgUpdated(true);
    };
    reader.readAsDataURL(file);

    closeModal();
    setModalMessage("UpdateTrue");
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modalContainer lg:w-[59rem] md:w-[42rem] w-full lg:h-[42rem] md:h-[40.5rem] h-[calc(100%_-_40px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalClose onClick={closeModal} />

        <ul className="py-5 w-full flex flex-wrap justify-between gap-5 border-b-2 border-gray-400">
          {dataButton.map((button, index) => (
            <li key={index} className="mx-auto">
              <Button
                className={`recipeButton lg:w-52 w-32 ${
                  displayPart === button.action && "recipeButtonActive"
                } ${button.incomplete && "text-red-600"}`}
                text={button.text}
                onClick={() => setDisplayPart(button.action)}
              />
            </li>
          ))}
        </ul>

        {displayPart === "general" && (
          <ModalRecipeGeneral
            getFormHeight={getFormHeight}
            nameRecipe={nameRecipe}
            setNameRecipe={setNameRecipe}
            categories={categories}
            categorieSelect={categorieSelect}
            setCategorieSelect={setCategorieSelect}
            duration={duration}
            durationSelect={durationSelect}
            setDurationSelect={setDurationSelect}
            vegetarian={vegetarian}
            vegetarianSelect={vegetarianSelect}
            setVegetarianSelect={setVegetarianSelect}
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

        {displayPart === "ustensils" && (
          <ModalRecipeAddDetails
            classNameContainer="md:grid md:grid-cols-2"
            classNameDivLabel="md:border-r-2  max-md:border-b-2"
            label="Nom de l'ustensil :"
            getFormHeight={getFormHeight}
            htmlFor="nameUstensil"
            id="nameUstensil"
            details={ustensils}
            setDetails={setUstensils}
            title="Les ustensils :"
          />
        )}

        {displayPart === "steps" && (
          <ModalRecipeAddDetails
            classNameDivLabel="border-b-2"
            label="Ajouter l'étape :"
            getFormHeight={getFormHeight}
            htmlFor="nameStep"
            id="nameStep"
            details={steps}
            setDetails={setSteps}
            title="Les étapes :"
            steps={true}
          />
        )}
        <div className="pt-5 w-full flex justify-center border-t-2 border-gray-400">
          <Button
            text="Enregister"
            className={`px-5 w-48 ${isCompleteAllParts && "buttonSubmit"}`}
            onClick={() => submitRecipe()}
          />
        </div>
      </div>
    </div>
  );
}
