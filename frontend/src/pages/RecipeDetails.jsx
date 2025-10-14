import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataUserGet } from "../services/fetchDataUserGet";
import { fetchDataGet } from "../services/fetchDataGet";
import { fetchDataUserPost } from "../services/fetchDataUserPost";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import RecipeCard from "../recipes/RecipeCard";
import { InputSelect } from "../recipeDetails/InputSelect";
import { Ingredients } from "../recipeDetails/Ingredients";
import { Steps } from "../recipeDetails/Steps";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";
import GenerateRecipePdf from "../recipeDetails/GenerateRecipePdf";
import Button from "../components/Button";
import { pdf } from "@react-pdf/renderer";

export default function RecipeDetails() {
  const { id } = useParams();
  const { token, userInfo } = useContext(AuthContext);

  const [inPanier, setInPanier] = useState(false);
  const [purchase, setPurchase] = useState(false);

  const [recipeDetails, setRecipeDetails] = useState(() => {
    if (!userInfo?.purchases.includes(id)) {
      if (userInfo?.panier.includes(id)) setInPanier(true);

      return JSON.parse(sessionStorage.getItem(id));
    } else {
      return null
    }
  });

  const [checkSubmit, setCheckSubmit] = useState("");
  const [indexPeople, setIndexPeople] = useState(1);

  // Recipe recovery
  useEffect(() => {
    if (!token && !recipeDetails) {
      // Recipe doesn't purchase
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes/${id}`, id)
        .then((recipe) => {
          setPurchase(false);
          setRecipeDetails(recipe);
        })
        .catch((error) => {
          setRecipeDetails([]);
          console.error("Erreur:", error);
        });
    }

    // Optimize display if recipe is purchased
    if (
      token &&
      userInfo?.purchases !== undefined &&
      !userInfo?.purchases.includes(id) &&
      userInfo?.role === "user" &&
      !recipeDetails
    ) {
      // Recipe doesn't purchase
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes/${id}`, id)
        .then((recipe) => {
          setPurchase(false);
          setRecipeDetails(recipe);
        })
        .catch((error) => {
          setRecipeDetails([]);
          console.error("Erreur:", error);
        });
    }

    // Recipe purchases
    const isValidUser =
      token &&
      userInfo?.purchases !== undefined &&
      userInfo?.purchases.includes(id);
    if (isValidUser || (userInfo?.role === "admin" && !recipeDetails)) {
      fetchDataUserGet(
        `${
          import.meta.env.VITE_BASE_API
        }/api/users/me/showRecipeSelectPurchase/${id}`
      )
        .then((recipe) => {
          setRecipeDetails(recipe);
          setPurchase(true);
        })
        .catch((error) => {
          setRecipeDetails([]);
          console.error("Erreur:", error);
        });
    }
  }, [userInfo?.purchases, token]);

  // Checks if the recipe is in the basket as soon as the token or recipe changes
  useEffect(() => {
    if (!userInfo || !recipeDetails) return; // attendre les 2
    setInPanier(userInfo.panier.includes(recipeDetails?._id));
  }, [token, userInfo, recipeDetails]);

  // Add recipe to cart
  const handleAddPanier = () => {
    if (token && recipeDetails) {
      const body = { recipeId: recipeDetails?._id };
      fetchDataUserPost(
        `${import.meta.env.VITE_BASE_API}/api/users/me/panier`,
        body
      )
        .then(() => {
          // Include in sessionStorage
          const storedArray = JSON.parse(sessionStorage.getItem("userInfo"));
          storedArray.panier.push(body.recipeId);
          sessionStorage.setItem("userInfo", JSON.stringify(storedArray));

          setInPanier(true);
          userInfo.panier.push(id);
        })
        .catch(console.error);
    }
  };

  // ModalMessage if the recipe is not purchase
  const notifyButtonInactive = () => {
    if (!token) {
      setCheckSubmit("noConnexionNumberPeople");
    } else if (!inPanier && !purchase) {
      setCheckSubmit("noAddPanierNumberPeople");
    }
    if (token && inPanier && !purchase) {
      setCheckSubmit("noPurchaseNumberPeople");
    }
  };

  const downloadRecipe = async () => {
    // Return a object which allows to generate a PDF, toBlob() converts the PDF to a binary file
    const blob = await pdf(
      <GenerateRecipePdf
        recipeDetails={recipeDetails}
        indexPeople={indexPeople}
      />
    ).toBlob();

    // Creates a temporary URL for this Blob file
    const url = URL.createObjectURL(blob);

    // Dynamically creates an <a> element to trigger the download
    const link = document.createElement("a");
    // Link of PDF
    link.href = url;
    // Name PDF
    link.download = `${recipeDetails.title.split(" ").join("_")}.pdf`;
    // Simulates a click to download it
    link.click();

    // Frees the temporary URL to avoid memory leaks
    URL.revokeObjectURL(url);
  };

  // Display page
  if (!recipeDetails) return null;

  return (
    <>
      <Header />

      <main className="relative py-5 flex flex-col gap-5 items-center">
        <BackgroundImg url="/assets/img/background/background-recipes.webp" />

        <section className="section m-auto lg:w-[1024px] w-full flex flex-col gap-5">
          <h2 className="h2 w-full">{recipeDetails?.title}</h2>

          <div className="flex max-md:flex-col gap-5">
            <article className="flex flex-col items-center gap-0.5">
              <RecipeCard
                duration={recipeDetails?.duration}
                vegetarian={recipeDetails?.vegetarian}
                src={recipeDetails?.imageUrl}
              />

              <div className="p-5 w-full flex flex-col gap-5 bg-green-200">
                <InputSelect
                  indexPeople={indexPeople}
                  setIndexPeople={setIndexPeople}
                  notifyButtonInactive={notifyButtonInactive}
                  purchase={purchase}
                />

                <div className="md:flex md:flex-col grid grid-cols-2 gap-2.5">
                  <div className="max-md:mx-auto flex flex-col justify-start gap-2.5">
                    <h3 className="h3 text-white-200">Les ustensils :</h3>

                    <ul className="flex flex-col gap-1">
                      {recipeDetails?.ustensils.map((ustensil, index) => (
                        <li key={index} className="text text-white-200">
                          {ustensil}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Ingredients
                    recipeDetails={recipeDetails}
                    indexPeople={indexPeople}
                    purchase={purchase}
                  />
                </div>
              </div>
            </article>

            <article className="pb-5 max-md:px-5 lg:w-[calc(100%_-_20rem)] md:w-[calc(100%_-_13rem)] w-full flex flex-col gap-8">
              <h3 className="h3">Les étapes :</h3>

              <div
                className={`text h-full flex flex-col ${
                  purchase ? "items-start" : "items-center"
                } gap-2.5`}
              >
                <Steps
                  token={token}
                  inPanier={inPanier}
                  purchase={purchase}
                  handleAddPanier={handleAddPanier}
                  recipeDetails={recipeDetails}
                  userInfo={userInfo}
                />
              </div>
            </article>
          </div>
        </section>
        {purchase && (
          <Button
            text="Télécharger la recette"
            className="buttonSubmit w-60"
            onClick={downloadRecipe}
          />
        )}
      </main>
      <Footer />

      <ModalMessage
        action={checkSubmit}
        onClickClose={() => setCheckSubmit("")}
      />
    </>
  );
}
