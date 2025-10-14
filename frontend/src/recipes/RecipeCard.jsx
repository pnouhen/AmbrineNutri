import React from "react";

export default function RecipeCard({
  duration,
  vegetarian,
  src,
  title,
  actionRecipes,
  setRecipeDelete,
  setModalMessage,
  id,
  classNameImg
}) {
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
        src={src}
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
      <div>

      </div>
      <h3 className="absolute left-1/2 top-1/2 -translate-1/2 w-11/12 lg:text-lg md:text-base text-sm font-bold text-center">
        {title}
      </h3>
    </div>
  );
}
