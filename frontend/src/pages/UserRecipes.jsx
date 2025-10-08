import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataGet } from "../services/fetchDataGet";

import Header from "../structures/Header";
import Footer from "../structures/Footer";
import MessageNoData from "../components/MessageNoData";
import { NavLink } from "react-router-dom";
import RecipeCard from "../recipes/RecipeCard";

export default function UserRecipes() {
  const { token, userInfo } = useContext(AuthContext);

  const [recipes, setRecipes] = useState(null);
  const [isRecipes, setIsRecipes] = useState(
    "Vous n'avez pas encore acheté de recette"
  );
  const [recipesPurchases, setRecipesPurchases] = useState([]);

  // Generate all recipes for display recipes purchases
  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((error) => {
        setIsRecipes("Désolé, un problème est survenu");
        console.error("Erreur lors du chargement", error);
      });
  }, []);

  // Display recipes purchases
  useEffect(() => {
    const searchRecipeInPurchases = recipes?.filter((recipe) =>
      userInfo?.purchases.includes(recipe._id)
    );
    setRecipesPurchases(searchRecipeInPurchases);
  }, [recipes, userInfo]);

  //   Creation of categories from purchased recipes
  let categories = [];
  if (recipesPurchases) {
    for (const recipe of recipesPurchases) {
      if (!categories.includes(recipe.categorie.text))
        categories.push(recipe.categorie.text);
    }
  }

  // Generate recipes by categories
  const generateRecipesCategories = () => {
    const classifiedRecipes = categories.map((categorie) => {
      let recipesCategorie = [];

      for (const recipe of recipesPurchases) {
        if (recipe.categorie.text.includes(categorie))
          recipesCategorie.push(recipe);
      }
      return {
        title: categorie,
        recipes: recipesCategorie,
      };
    });

    return (
      <>
        {classifiedRecipes.map((categorie, index) => (
          <div
            key={categorie.title}
            className={`border-panier flex flex-col gap-5 ${
              index < classifiedRecipes.length - 1 && "pb-8"
            }`}
          >
            <h3 className="h3">{categorie.title}</h3>

            {/* Affiche les recettes de la catégorie */}
            <ul className="md:grid md:grid-cols-3 flex flex-wrap gap-5">
              {categorie.recipes?.map((recipe) => (
                <li key={recipe._id} className="m-auto">
                  <NavLink
                    className="flex flex-shrink-0"
                    id={recipe._id}
                    to={`/recettes/${recipe._id}`}
                  >
                    <RecipeCard
                      duration={recipe.duration}
                      vegetarian={recipe.vegetarian}
                      title={recipe.title}
                      src={recipe.imageUrl}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  };

  // Display page
  if (token && !userInfo) return null;
  if (!recipes) return null;

  return (
    <>
      <Header />

      <main className="bgUserAccount h-full flex flex-1 items-center">
        <div className="section w-full lg:min-h-[27.625rem] md:min-h-80  p-5">
          <h2 className="h2 mb-5">Mes recettes</h2>

          {recipesPurchases?.length > 0 ? (
            generateRecipesCategories()
          ) : (
            <MessageNoData text={isRecipes} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
