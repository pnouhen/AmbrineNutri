import React, { useEffect, useState } from "react";

import MessageErrorBackEnd from "../components/MessageErrorBackEnd";

export function RecipeFilter({ data }) {
  const [categoriesRecipe, setCategoriesRecipe] = useState([]);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    const fetchedCategories = data[0]?.values || [];
    setCategoriesRecipe(["Tous", ...fetchedCategories]);
  }, [data]);

  return (
    <section className="section">
      <h2 className="h2 mb-5">Catégories</h2>
      <ul className="m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8">
        {categoriesRecipe.map((categorie, index) => (
          <li
            key={index}
            className={`lg:mx-auto ${
              index === categoriesRecipe.length - 1
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
