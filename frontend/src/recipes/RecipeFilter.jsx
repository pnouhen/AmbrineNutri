import React, { useEffect, useState } from "react";

import MessageNoData from "../components/MessageNoData";
import { useSetTimeout } from "../hooks/useSetTimeout";

export function RecipeFilter({ data, filter, setFilter }) {
  const [showFilter, setShowFilter] = useState(false);

  useSetTimeout(() => setShowFilter(true), 100, [data]);

  return (
    <section className="section pb-5 px-5">
      <h2 className="h2 mb-5">Catégories</h2>
      {data.length > 1 ? (
        <ul
          className={`m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8 transitionData ${
            showFilter ? "transitionDataTrue" : "opacity-0 -translate-y-1"
          }`}
        >
          {data.map((categorie, index) => (
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
          ))}
        </ul>
      ) : (
        <MessageNoData className="" text="Désolé, un problème est survenu." />
      )}
    </section>
  );
}
