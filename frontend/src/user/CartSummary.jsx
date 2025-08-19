import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function CartSummary({ recipes }) {
  const [recipesPanier, setRecipesPanier] = useState([]);

  useEffect(() => {
    recipes.forEach((recipe) => (recipe.panier = true));
    setRecipesPanier(recipes.slice(0, 2));
  }, [recipes]);

  const deleteRecipe = (id) => {
    setRecipesPanier(recipesPanier.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2 className="h2 mb-10">Panier</h2>
      <div className="pt-5 grid md:grid-cols-2 gap-5 border-t-2 border-gray-400">
        {recipesPanier.map((recipe) => (
          <div
            key={recipe._id}
            className="pr-5 flex items-center gap-5 border-2 border-black"
          >
            <NavLink
              id={recipe._id}
              to={`/recettes/${recipe._id}`}
              className="lg:w-32 w-24  lg:h-32 h-24"
            >
              <img
                src={recipe.img}
                alt={`Photo de ${recipe.title}`}
                className="w-full h-full object-cover"
              />
            </NavLink>

            <div className="flex flex-col gap-5">
              <NavLink id={recipe._id} to={`/recettes/${recipe._id}`}>
                <h3 className="h3">{recipe.title}</h3>
              </NavLink>

              <button
                className="text text-left font-semibold cursor-pointer"
                onClick={() => deleteRecipe(recipe._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="py-5 flex flex-col gap-2.5 border-b-2 border-gray-400">
        <p className="h3">Total : {recipesPanier.length}€ </p>
        <p className="text">
          Dont TVA : {Number.parseFloat(recipesPanier.length * 0.2).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}
