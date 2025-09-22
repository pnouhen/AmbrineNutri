import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataUserPost } from "../services/fetchDataUserPost";

import Error404 from "./Error404";
import { BackgroundImgCSS } from "../components/BackgroundImgCSS";
import Header from "../structures/Header";
import Footer from "../structures/Footer";
import { Steps } from "../recipeDetails/Steps";
import MessageNoData from "../components/MessageNoData";
import RecipeCard from "../recipes/RecipeCard";
import { InputSelect } from "../recipeDetails/InputSelect";
import { Ingredients } from "../recipeDetails/Ingredients";
import ModalMessage from "../Modals/MessageModal";
import { fetchDataGet } from "../services/fetchDataGet";

export default function RecipeDetails() {
  const { id } = useParams();
  const { token, userInfo } = useContext(AuthContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error404, setError404] = useState(false);
  const [inPanier, setInPanier] = useState(null);
  const [buy, setBuy] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState("");
  const [indexPeople, setIndexPeople] = useState(1);

  // Récupération de la recette
  useEffect(() => {
    try {
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes/${id}`).then(
        (recipe) => setRecipeDetails(recipe)
      );
    } catch {
      (error) => {
        setRecipeDetails([]);
        console.error("Erreur:", error);
      };
    }
  }, []);

  // Vérifie si la recette est dans le panier dès que token ou recette change
  useEffect(() => {
    if (!userInfo || !recipeDetails) return; // attendre les 2
    setInPanier(userInfo.panier.includes(recipeDetails._id));
  }, [token, userInfo, recipeDetails]);

  // Ajouter la recette au panier
  const handleAddPanier = () => {
    if (token && recipeDetails) {
      const body = { recipeId: recipeDetails._id };
      fetchDataUserPost(
        `${import.meta.env.VITE_BASE_API}/api/users/me/panier`,
        body
      )
        .then(() => {
          setInPanier(true);
          userInfo.panier.push(id);
        })
        .catch(console.error);
    }
  };

  // ModalMessage if the recipe is not buy
  const notifyButtonInactive = () => {
    if (!token) {
      setCheckSubmit("noConnexionNumberPeople");
    } else if (!inPanier && !buy) {
      setCheckSubmit("noAddPanierNumberPeople");
    }
    if (token && inPanier && !buy) {
      setCheckSubmit("noBuyNumberPeople");
    }
  };

  if (error404) {
    return <Error404 />;
  }

  // Display page
  if (token && !userInfo) return null;
  if (!recipeDetails) return null;

  return (
    <>
      <BackgroundImgCSS url="url(/assets/img/background/background-recipes.webp)" />

      <Header />

      <main className="relative py-5">
        <section className="section m-auto lg:w-[1024px] w-full flex flex-col gap-5">
          {recipeDetails ? (
            <>
              <h2 className="h2 w-full">{recipeDetails.title}</h2>

              <div className="flex max-md:flex-col gap-5">
                <article className="flex flex-col items-center gap-0.5">
                  <RecipeCard
                    duration={recipeDetails.duration}
                    vegetarian={recipeDetails.vegetarian}
                    src={recipeDetails.img}
                  />

                  <div className="p-5 lg:w-80 md:w-52 w-full flex flex-col gap-5 bg-green-200">
                    <InputSelect
                      indexPeople={indexPeople}
                      setIndexPeople={setIndexPeople}
                      notifyButtonInactive={notifyButtonInactive}
                      buy={buy}
                    />

                    <div className="md:flex md:flex-col grid grid-cols-2 gap-2.5">
                      <div className="max-md:mx-auto flex flex-col justify-start gap-2.5">
                        <h3 className="h3 text-white-200">Les ustensils :</h3>

                        <div className="flex flex-col gap-1">
                          {recipeDetails.ustensils.map((ustensil, index) => (
                            <p key={index} className="text text-white-200">
                              {ustensil}
                            </p>
                          ))}
                        </div>
                      </div>

                      <Ingredients
                        recipeDetails={recipeDetails}
                        indexPeople={indexPeople}
                        buy={buy}
                      />
                    </div>
                  </div>
                </article>

                <article className="pb-5 max-md:px-5 lg:w-[calc(100%_-_20rem)] md:w-[calc(100%_-_13rem)] w-full flex flex-col gap-8">
                  <h3 className="h3">Les étapes :</h3>
                  <div className="text h-full flex flex-col items-center gap-2.5">
                    <Steps
                      token={token}
                      inPanier={inPanier}
                      buy={buy}
                      handleAddPanier={handleAddPanier}
                      recipeDetails={recipeDetails}
                      userInfo={userInfo}
                    />
                  </div>
                </article>
              </div>
            </>
          ) : (
            <MessageNoData text="Désolé, un problème est survenu." />
          )}
        </section>
      </main>

      <Footer />

      <ModalMessage
        action={checkSubmit}
        onClickClose={() => setCheckSubmit("")}
      />
    </>
  );
}
