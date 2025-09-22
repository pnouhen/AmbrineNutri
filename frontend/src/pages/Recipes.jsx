import React, { useContext, useEffect, useState } from "react";

import { fetchDataGet } from "../services/fetchDataGet";

import { AuthContext } from "../contexts/AuthContext";
import  BackgroundImg  from "../components/BackgroundImg";
import Header from "../structures/Header";
import Footer from "../structures/Footer";
import { RecipeFilter } from "../recipes/RecipeFilter";
import { RecipeSlideShow } from "../recipes/RecipeSlideShow";

export default function Recipes() {
  const [categoriesRecipe, setCategoriesRecipe] = useState(null);
  const [filter, setFilter] = useState("Tous");
  const [recipes, setRecipes] = useState(null);
  const [noRecipes, setNoRecipes] = useState(
    "Aucune recette n'est disponible."
  );

  // To display the header at once if the user is logged in
  const { token, userInfo } = useContext(AuthContext);

  // Get categoriesRecipes here for link the recipes
  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`)
      .then((infoAddRecipes) => {
        const categories = infoAddRecipes.filter(
          (info) => info.type === "categories"
        );
        setCategoriesRecipe(["Tous", ...categories[0].values]);
      })
      .catch((error) => {
        setCategoriesRecipe(["Tous"]);
        console.error("Erreur lors du chargement", error);
      });
  }, []);

  // Get recipes here for link the categoriesRecipes
  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => {
        setNoRecipes("Désolé, un problème est survenu.");
        setRecipes([]);
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
  for (let i = 0; i < recipesFilter?.length; i += numberRecipes) {
    recipePages.push(recipesFilter.slice(i, i + numberRecipes));
  }

  // Display page
  if (token && !userInfo) return null;
  if (!categoriesRecipe || !recipes) return null;

  return (
    <>
      <Header />

      <main className="h-[69.1875rem] relative py-5 flex flex-col gap-5">
        <BackgroundImg url="/assets/img/background/background-recipes.webp" />

        <RecipeFilter
          data={categoriesRecipe}
          filter={filter}
          setFilter={setFilter}
        />

        <RecipeSlideShow
          recipePages={recipePages}
          numberRecipes={numberRecipes}
          noRecipes={noRecipes}
        />
      </main>

      <Footer />
    </>
  );
}
