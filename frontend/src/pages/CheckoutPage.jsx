import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { fetchDataUserDelete } from "../services/fetchDataUserDelete";

import Header from "../structures/Header";
import { CartSummary } from "../user/CartSummary";
import { BillingAddress } from "../user/BillingAddress";
import { fetchDataGet } from "../services/fetchDataGet";
import { PaymentForm } from "../user/PaymentForm";
import GenerateFacture from "../user/GenerateFacture";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";

import { PDFDownloadLink } from "@react-pdf/renderer";

export function CheckoutPage() {
  const { token, userInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [recipesPanier, setRecipesPanier] = useState([]);
  const [coordDefault, setCoordDefault] = useState();
  const [recipesPanierSaved, setRecipesPanierSaved] = useState([]);

  const [checkSubmit, setCheckSubmit] = useState("");

  useEffect(() => {
    if (!token) navigate("/se-connecter");
  }, [token]);

  useEffect(() => {
    if (token)
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
        .then((recipes) => {
          setRecipes(recipes);
        })
        .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    const searchRecipeInPanier = recipes.filter((recipe) =>
      userInfo.panier.includes(recipe._id)
    );
    setRecipesPanier(searchRecipeInPanier);
  }, [recipes]);

  const deleteRecipe = (id) => {
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/panier/${id}`
    )
      .then(() => {
        setRecipesPanier(recipesPanier.filter((r) => r._id !== id));
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  useEffect(() => {
    if (checkSubmit === "PaymentSuccessful") {
      setRecipesPanierSaved(recipesPanier);
      setRecipesPanier([]);
    }
  }, [checkSubmit]);

  return (
    <>
      <Header />
      <main className="py-5 bg-gradient-to-r from-[#dbe4c6] to-[#fff6cc]">
        <div className="mx-auto px-5 section md:w-1/2 rounded-2xl">
          <CartSummary
            recipesPanier={recipesPanier}
            deleteRecipe={deleteRecipe}
          />

          <BillingAddress
            coordDefault={coordDefault}
            setCoordDefault={setCoordDefault}
          />

          <PaymentForm
            recipesPanier={recipesPanier}
            setCheckSubmit={setCheckSubmit}
            setRecipesPanier={setRecipesPanier}
            coordDefault={coordDefault}
          />
        </div>

        <ModalMessage
          action={checkSubmit}
          onClickClose={() => setCheckSubmit("")}
        />
      </main>

      <Footer />

      {checkSubmit === "PaymentSuccessful" && (
        <PDFDownloadLink
          document={
            <GenerateFacture
              coordDefault={coordDefault}
              recipesPanier={recipesPanierSaved}
            />
          }
          fileName="facture.pdf"
        >
          {({ loading }) =>
            loading ? "Génération..." : "Télécharger la facture"
          }
        </PDFDownloadLink>
      )}
    </>
  );
}
