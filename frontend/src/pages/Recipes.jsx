import React, { useEffect, useState } from "react";

import { fetchDataGet } from "../services/fetchDataGet";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import Footer from "../structures/Footer";
import { RecipeFilter } from "../recipes/RecipeFilter";
import { RecipeSlideShow } from "../recipes/RecipeSlideShow";

export default function Recipes() {
  const [infoAddRecipe, setInfoAddRecipe] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`)
      .then((data) => {
        setInfoAddRecipe(data);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  // Groupe recipe by page
  let numberRecipes = 6;
  if (window.innerWidth < 768) {
    numberRecipes = 2;
  }

  let recipePages = [];
  for (let i = 0; i < recipes.length; i += numberRecipes) {
    recipePages.push(recipes.slice(i, i + numberRecipes));
  }

  return (
    <>
      <Header />
      <main className="relative py-5 flex flex-col gap-5">
        <BackgroundImg
          className="right-0 object-cover object-top"
          url="/assets/img/background/background-recipes.webp"
        />

        <RecipeFilter data={infoAddRecipe} />

        <RecipeSlideShow recipePages={recipePages} numberRecipes={numberRecipes} />
      </main>
      <Footer />
    </>
  );
}
