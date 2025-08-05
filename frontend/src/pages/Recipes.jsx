import React, { useEffect, useState } from "react";

import { fetchDataGet } from "../services/fetchDataGet";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import Footer from "../structures/Footer";
import { RecipeFilter } from "../recipes/RecipeFilter";
import { RecipeSlideShow } from "../recipes/RecipeSlideShow";

export default function Recipes() {
  const [infoAddRecipe, setInfoAddRecipe] = useState([]);
  const [categoriesRecipe, setCategoriesRecipe] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`)
      .then((infoaddrecipes) => {
        setInfoAddRecipe(infoaddrecipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    const fetchedCategories = infoAddRecipe[0]?.values || [];
    setCategoriesRecipe(["Tous", ...fetchedCategories]);
  }, [infoAddRecipe]);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  // Filter categorie
  let recipesFilter = recipes
  if(filter != "Tous") {
    recipesFilter = recipes.filter((recipe) => recipe.duration === filter)
  } else {
    recipesFilter = recipes
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

  return (
    <>
      <Header />
      <main className="relative py-5 flex flex-col gap-5">
        <BackgroundImg
          className="right-0 object-cover object-top"
          url="/assets/img/background/background-recipes.webp"
        />

        <RecipeFilter data={categoriesRecipe} filter={filter} setFilter={setFilter} />

        <RecipeSlideShow recipePages={recipePages} numberRecipes={numberRecipes} />
      </main>
      <Footer />
    </>
  );
}
