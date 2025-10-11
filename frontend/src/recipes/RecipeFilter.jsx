import React, { useEffect, useState } from "react";

import MessageNoData from "../components/MessageNoData";

export function RecipeFilter({ data, filter, setFilter }) {
  return (
    <section className="section pb-5 px-5">
      <h2 className="h2 mb-5">Catégories</h2>

      {/* Display list if categoriesRecipes generate */}
      {data?.length > 1 ? (
        <ul className="m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8">
          {data.map((categorie, index) => (
            <li key={index} className="lg:mx-auto">
              <button
                className={`text recipeButton w-52 max-md:w-24 max-md:h-20 ${
                  filter === categorie ? "recipeButtonActive" : ""
                }`}
                onClick={() => setFilter(categorie)}
              >
                {categorie}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <MessageNoData className="" text="Désolé, un problème est survenu." />
      )}
    </section>
  );
}
