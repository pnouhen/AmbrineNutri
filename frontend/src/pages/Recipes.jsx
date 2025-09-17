import React, { useEffect, useState } from "react";

import { fetchDataGet } from "../services/fetchDataGet";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import Footer from "../structures/Footer";
import { RecipeFilter } from "../recipes/RecipeFilter";
import { RecipeSlideShow } from "../recipes/RecipeSlideShow";
import { BackgroundImgCSS } from "../components/BackgroundImgCSS";

export default function Recipes() {
  const [categoriesRecipe, setCategoriesRecipe] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`)
      .then((infoAddRecipes) => {
        const categories = infoAddRecipes.filter(
          (info) => info.type === "categories"
        );
        setCategoriesRecipe(["Tous", ...categories[0].values]);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => {
        setMessageNoData("Désolé, un problème est survenu.");
        console.error("Erreur lors du chargement", error);
      });
  }, []);

  // Filter categorie
  let recipesFilter = recipes;
  if (filter != "Tous") {
    recipesFilter = recipes.filter(
      (recipe) => recipe.categorie.text === filter
    );
  } else {
    recipesFilter = recipes;
  }

  // Groupe recipe by page
  let numberRecipes = 6;
  if (window.innerWidth < 768) {
    numberRecipes = 2;
  }

  let recipePages = [];
  for (let i = 0; i < recipesFilter.length; i += numberRecipes) {
    recipePages.push(recipesFilter.slice(i, i + numberRecipes));
  }

  // TODO Enlever les animations et mettre un loader 
  return (
    <>
      <Header />
      <main className="h-[69.1875rem] relative py-5 flex flex-col gap-5">
        <BackgroundImgCSS url="url(/assets/img/background/background-recipes.webp)" />

        <RecipeFilter
          data={categoriesRecipe}
          filter={filter}
          setFilter={setFilter}
        />

        <RecipeSlideShow
          recipes={recipes}
          recipePages={recipePages}
          numberRecipes={numberRecipes}
        />
      </main>
      <Footer />
    </>
  );
}
