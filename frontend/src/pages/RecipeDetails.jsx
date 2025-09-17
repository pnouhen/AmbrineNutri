import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataGet } from "../services/fetchDataGet";
import { fetchDataUserPost } from "../services/fetchDataUserPost";

import Header from "../structures/Header";
import Footer from "../structures/Footer";
import BackgroundImg from "../components/BackgroundImg";
import { Steps } from "../recipeDetails/Steps";
import MessageNoData from "../components/MessageNoData";
import RecipeCard from "../recipes/RecipeCard";
import { InputSelect } from "../recipeDetails/InputSelect";
import { Ingredients } from "../recipeDetails/Ingredients";
import ModalMessage from "../Modals/MessageModal";
import Error404 from "./Error404";

export default function RecipeDetails() {
  const { id } = useParams();
  const { token, userInfo } = useContext(AuthContext);

  const [recipeDetails, setRecipeDetails] = useState();
  const [error404, setError404] = useState(false);
  const [inPanier, setInPanier] = useState(false);
  const [buy, setBuy] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState("");
  const [indexPeople, setIndexPeople] = useState(1);

  // Récupération de la recette
  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes/${id}`)
      .then((recipe) => {
        setRecipeDetails(recipe);
      })
      .catch((error) => {
        setError404(true);
        console.error("Erreur lors du chargement", error);
      });
  }, [id]);

  // Vérifie si la recette est dans le panier dès que token ou recette change
  useEffect(() => {
    if(userInfo)
    setInPanier(userInfo?.panier.includes(recipeDetails?._id));
  }, [token, userInfo, recipeDetails]);

  // Ajouter la recette au panier
  const handleAddPanier = () => {
    if (token && recipeDetails) {
      const body = { recipeId: recipeDetails._id };
      fetchDataUserPost(
        `${import.meta.env.VITE_BASE_API}/api/users/me/panier`,
        body
      )
        .then(() => setInPanier(true))
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
  
  if (!recipeDetails) {
  return null;
}

    return (
      <>
        <Header />

        <main className="relative py-5">
          <BackgroundImg url="/assets/img/background/background-recipes.webp" />

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
                      />

                      <div className="flex md:flex-col max-md:flex-wrap gap-2.5">
                        <div className="flex md:flex-col justify-start gap-2.5">
                          <h3 className="h3 text-white-200">Les ustensils :</h3>

                          <div className="flex md:flex-col gap-1">
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

