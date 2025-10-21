import React, { useState, useEffect } from "react";

export default function RecipeCard({
  imgUpdated,
  duration,
  vegetarian,
  src,
  title,
  actionRecipes,
  setRecipeDelete,
  setModalMessage,
  id,
  classNameImg,
  setModalRecipeActive,
  setUpdateRecipeId,
  setImgUpdated,
}) {
  const [imgSrc, setImgSrc] = useState(src);

  // Update image when recipePages changes or on component mount to display newly added recipe images
  useEffect(() => {
    const storedBase64 = sessionStorage.getItem(src);
    if (storedBase64 && storedBase64.startsWith("data:image/")) {
      setImgSrc(storedBase64);
    } else {
      setImgSrc(src);
    }
  }, [imgUpdated]);

  // For admin
  const updateRecipeId = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setModalRecipeActive(true);
    setUpdateRecipeId(id);
    setImgUpdated(false);
  };
  const deleteRecipes = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setRecipeDelete(id);
    setModalMessage("ConfirmDeletion");
  };

  return (
    <div className="relative">
      <p className="text useBadgeInfo duration">{duration}</p>
      {vegetarian === "Oui" ? (
        <p className="text useBadgeInfo regimeActive">Végétarien</p>
      ) : (
        ""
      )}
      <img
        className={`imgRecipe ${classNameImg}`}
        src={imgSrc}
        alt={`Image de ${title}`}
        loading="eager"
      />
      {actionRecipes === "delete" && (
        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={(e) => deleteRecipes(e, id)}
        >
          <i className="fa-solid fa-trash h2"></i>
        </button>
      )}
      {actionRecipes === "update" && (
        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={(e) => updateRecipeId(e, id)}
        >
          <i className="fa-solid fa-pencil h2"></i>
        </button>
      )}
      <div></div>
      <h3 className="absolute left-1/2 top-1/2 -translate-1/2 w-11/12 lg:text-lg md:text-base text-sm font-bold text-center">
        {title}
      </h3>
    </div>
  );
}
