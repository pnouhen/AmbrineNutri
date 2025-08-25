import React, { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataGet } from "../services/fetchDataGet";
import { fetchDataUserGet } from "../services/fetchDataUserGet";

import Header from "../structures/Header";
import Footer from "../structures/Footer";
import BackgroundImg from "../components/BackgroundImg";
import MessageNoData from "../components/MessageNoData";
import RecipeCard from "../recipes/RecipeCard";
import { InputSelect } from "../recipeDetails/InputSelect";
import { Ingredients } from "../recipeDetails/Ingredients";
import { fetchDataUserPost } from "../services/fetchDataUserPost";

export default function RecipeDetails() {
  const { id } = useParams();
  const { token, userInfo, setUserInfo } = useContext(AuthContext);

  const [recipeDetails, setRecipeDetails] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [inPanier, setInPanier] = useState(false);
  const [buy, setBuy] = useState(false);
  const [indexPeople, setIndexPeople] = useState(0);
  const numberPeople = 7;

  // Récupération de la recette
  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        const recipe = recipes.find((r) => r._id === id);
        setRecipeDetails(recipe);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, [id]);

  // Vérifie si la recette est dans le panier dès que token ou recette change
   useEffect(() => {
    if (token && recipeDetails) {
      fetchDataUserGet(`${import.meta.env.VITE_BASE_API}/api/users/me`)
        .then(user => {
          setInPanier(user.panier.includes(recipeDetails._id));
        })
        .catch(console.error);
    } else {
      setInPanier(false);
    }
  }, [token, recipeDetails, setUserInfo]);


  // Ajouter la recette au panier
  const handleAddPanier = () => {
  if (token && recipeDetails) {
    const body = { recipeId: recipeDetails._id };
    fetchDataUserPost(`${import.meta.env.VITE_BASE_API}/api/users/me/panier`, body)
      .then(() => setInPanier(true))
      .catch(console.error);
  }
};

  return (
    <>
      <Header />

      <main className="relative py-5" onClick={() => setIsOpen(false)}>
        <BackgroundImg url="/assets/img/background/background-recipes.webp" />

        <section className="section m-auto lg:w-[1024px] w-full flex flex-col gap-5">
          {recipeDetails ? (
            <>
              <h2 className="h2 w-full">{recipeDetails.title}</h2>

              <div className="flex max-md:flex-col gap-5">
                <article className="flex flex-col items-center gap-0.5">
                  <RecipeCard
                    duration={recipeDetails.duration}
                    classNameRegime={
                      recipeDetails.vegetarian === "Oui"
                        ? "text useBadgeInfo regimeActive"
                        : "hidden"
                    }
                    textRegime={
                      recipeDetails.vegetarian === "Oui" ? "Végétarien" : ""
                    }
                    src={recipeDetails.img}
                  />

                  <div className="p-5 lg:w-80 md:w-52 w-full flex flex-col gap-5 bg-green-200">
                    <div className="max-md:w-52 flex flex-col gap-2.5">
                      <h3 className="h3 text-white-200">
                        Nombre de personnes :
                      </h3>

                      <InputSelect
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        indexPeople={indexPeople}
                        setIndexPeople={setIndexPeople}
                        numberPeople={numberPeople}
                      />
                    </div>

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
                    {!token ? (
                      <>
                        <p className="text">
                          Étant donné le temps investi dans la création des recettes, je demande une contribution de 1€ par recette.
                          <br />
                          Si cela vous intéresse, vous pouvez vous inscrire ou vous connecter en cliquant ici :
                        </p>
                        <NavLink to="/se-connecter" className="font-semibold underline">
                          Connexion / Inscription
                        </NavLink>
                      </>
                    ) : !inPanier ? (
                      <>
                        <p className="text">
                          Étant donné le temps investi dans la création des recettes, je demande une contribution de 1€ par recette.
                          <br />
                          Si cela vous intéresse, vous pouvez l'ajouter au panier en cliquant ici :
                        </p>
                        <button
                          className="font-semibold underline cursor-pointer"
                          onClick={handleAddPanier}
                        >
                          Ajoutez au panier
                        </button>
                      </>
                    ) : !buy ? (
                      <>
                        <p className="text">
                          Recette ajoutée à votre panier ! Cliquez ici pour la consulter :
                        </p>
                        <NavLink to="/panier" className="font-semibold underline">
                          Accéder au panier
                        </NavLink>
                      </>
                    ) : (
                      <ul className="ml-5 flex flex-col gap-4 list-decimal">
                        {recipeDetails.steps.map((step, index) => (
                          <li key={index} className="text">{step}</li>
                        ))}
                      </ul>
                    )}
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
    </>
  );
}
