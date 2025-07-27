import React, { useEffect, useState } from "react";

import MessageErrorBackEnd from "../components/MessageErrorBackEnd";

export function RecipeFilter({ data, filter, setFilter }) {
  return (
    <section pb-5 className="section pb-5 px-5">
      <h2 className="h2 mb-5">Catégories</h2>
      <ul className="m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8">
        {data.map((categorie, index) => (
          <li
            key={index}
            className={`lg:mx-auto ${
              index === data.length - 1
                ? "col-start-1 col-end-4"
                : ""
            }`}
          >
            <button
              className={`text recipeButton ${
                filter === categorie ? "recipeButtonActive" : ""
              }`}
              onClick={() => setFilter(categorie)}
            >
              {categorie}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
