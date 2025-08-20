import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { fetchDataGet } from "../services/fetchDataGet";

import Header from "../structures/Header";
import Footer from "../structures/Footer";
import BackgroundImg from "../components/BackgroundImg";
import MessageNoData from "../components/MessageNoData";
import RecipeCard from "../recipes/RecipeCard";
import { InputSelect } from "../recipeDetails/InputSelect";
import { Ingredients } from "../recipeDetails/Ingredients";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [buy, setBuy] = useState(false);

  const [indexPeople, setIndexPeople] = useState(0);
  const numberPeople = 7;

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        const recipe = recipes.find((recipe) => recipe._id === id);
        setRecipeDetails(recipe);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  return (
    <>
      <Header />

      <main className="relative py-5" onClick={() => setIsOpen(false)}>
        <BackgroundImg url={"/assets/img/background/background-recipes.webp"} />

        <section className="section m-auto lg:w-[1024px] w-full flex flex-col gap-5">
          {recipeDetails !== undefined ? (
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

                      <Ingredients recipeDetails={recipeDetails} indexPeople={indexPeople} buy={buy} />
                    </div>
                  </div>
                </article>

                <article className="pb-5 max-md:px-5 lg:w-[calc(100%_-_20rem)] md:w-[calc(100%_-_13rem)] w-full flex flex-col gap-8">
                  <h3 className="h3">Les étapes :</h3>
                  <div className="text h-full flex flex-col items-center gap-2.5">
                    <p>
                      Étant donné le temps investi dans la création des
                      recettes, je demande une contribution de 1€ par recette.{" "}
                      <br />
                      Si cela vous intéresse, vous pouvez vous inscrire ou vous
                      connecter en cliquant ici :
                    </p>
                    <NavLink
                      to={`/se-connecter`}
                      className="font-semibold underline"
                    >
                      Connexion / Inscription
                    </NavLink>
                  </div>
                </article>
              </div>
            </>
          ) : (
            <MessageNoData text="Désolé, un problème est survenu."/>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
