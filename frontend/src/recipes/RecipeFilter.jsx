import React from "react";

import MessageNoData from "../components/MessageNoData";

export function RecipeFilter({ data, filter, setFilter }) {
  return (
    <section className="section pb-5 px-5">
      <h2 className="h2 mb-5">Catégories</h2>
      <ul className="m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8">
        {data.length > 1 ? (
          data.map((categorie, index) => (
            <li key={index} className="lg:mx-auto">
              <button
                className={`text recipeButton ${
                  filter === categorie ? "recipeButtonActive" : ""
                }`}
                onClick={() => setFilter(categorie)}
              >
                {categorie}
              </button>
            </li>
          ))
        ) : (
          <MessageNoData
            className="lg: col-start-1 lg:col-end-4"
            text="Désolé, un problème est survenu."
          />
        )}
      </ul>
    </section>
  );
}
