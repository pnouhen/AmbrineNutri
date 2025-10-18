import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataGet } from "../services/fetchDataGet";
import { redirectionNoToken } from "../services/RedirectionNoToken";
import Error404 from "../pages/Error404";

import Header from "../structures/Header";
import Footer from "../structures/Footer";
import MessageNoData from "../components/MessageNoData";
import { NavLink } from "react-router-dom";
import RecipeCard from "../recipes/RecipeCard";
import Loader from "../components/Loader";

export default function UserRecipes() {
  const { token, userInfo } = useContext(AuthContext);

  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(sessionStorage.getItem("recipes"));
  });

  const [categories, setCategories] = useState(() => {
    const infoAddRecipes = JSON.parse(sessionStorage.getItem("infoAddRecipes")) ||[];
    const categories =
      infoAddRecipes.filter((infos) => infos.type === "categories") || [];
    if (categories.length > 0) return categories[0].values;
  });

  const [isRecipes, setIsRecipes] = useState(
    "Vous n'avez pas encore acheté de recette"
  );
  const [recipesPurchases, setRecipesPurchases] = useState(() => {
    const searchRecipeInPurchases = recipes?.filter((recipe) =>
      userInfo?.purchases.includes(recipe._id)
    );
    return searchRecipeInPurchases;
  });

  redirectionNoToken(token);

  // Generate all recipes for display recipes purchases
  useEffect(() => {
    if (!recipes)
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`, "recipes")
        .then((recipes) => {
          setRecipes(recipes);
        })
        .catch((error) => {
          setIsRecipes("Désolé, un problème est survenu");
          console.error("Erreur lors du chargement", error);
        });
  }, []);

  // Get infosAddRecipe
  useEffect(() => {
    if (!categories)
      fetchDataGet(
        `${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`,
        "infoAddRecipes"
      )
        .then((infosAddRecipe) => setCategories(infosAddRecipe[0].values))
        .catch((error) => {
          console.error("Erreur lors du chargement", error);
        });
  }, []);

  // Display recipes purchases
  useEffect(() => {
    const userInfoPurchases = JSON.parse(
      sessionStorage.getItem("userInfo")
    )?.purchases;
    if (userInfo && recipes) {
      const searchRecipeInPurchases = recipes.filter((recipe) =>
        userInfoPurchases.includes(recipe._id)
      );
      setRecipesPurchases(searchRecipeInPurchases);
    }
  }, [recipes, userInfo]);

  // Generate recipes by categories
  const generateRecipesCategories = () => {
    let classifiedRecipes = categories.map((cat) => ({
      categorie: cat,
      recipes: [],
    }));

    for (const recipe of recipesPurchases) {
      const catObj = classifiedRecipes.find(
        (c) => c.categorie === recipe.categorie.text
      );
      if (catObj) catObj.recipes.push(recipe);
    }

    classifiedRecipes = classifiedRecipes.filter(
      (cat) => cat.recipes.length > 0
    );

    return (
      <>
        {classifiedRecipes.map((categorie, index) => (
          <div
            key={categorie.categorie}
            className={`borderTopGray flex flex-col gap-5 ${
              index < classifiedRecipes.length - 1 && "pb-8"
            }`}
          >
            <h3 className="h3">{categorie.categorie}</h3>

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
                      classNameImg="opacity-40"
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

  // Shows page if user
  if (userInfo?.role !== "user") return <Error404 />;
  return (
    <>
      <Header />

      <Loader condition={token && userInfo && recipesPurchases} />

      {token && userInfo && recipesPurchases && (
        <>
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
      )}
    </>
  );
}
