import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import MessageNoData from "../components/MessageNoData";

export function CartSummary({ recipesPanier, deleteRecipe}) {
    return (
    <>
      <h2 className="h2 mb-5">Panier</h2>
      <div className="border-panier pb-5">
        <div className="flex flex-col gap-5">
          <h3 className="h3"> Les recettes</h3>
          {recipesPanier.length > 0 ? (
            recipesPanier.map((recipe) => (
              <div
                key={recipe._id}
                className="pr-5 flex items-center gap-5 bg-green-50 rounded-lg shadow-inputButton"
              >
                <NavLink
                  id={recipe._id}
                  to={`/recettes/${recipe._id}`}
                  className="lg:w-32 w-24  lg:h-32 h-24"
                >
                  <img
                    src={recipe.img}
                    alt={`Photo de ${recipe.title}`}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </NavLink>

                <div className="w-[calc(100%_-_96px)] flex flex-col gap-5">
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
            ))
          ) : (
            <MessageNoData text="Le panier est vide" />
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          <p className="h3">Total : {recipesPanier.length}€ </p>
          <p className="text">
            Dont TVA :{" "}
            {Number.parseFloat(recipesPanier.length * 0.17).toFixed(2)}€
          </p>
        </div>
      </div>
    </>
  );
}
