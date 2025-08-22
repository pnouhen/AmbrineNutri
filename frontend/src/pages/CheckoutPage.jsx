import React, { useEffect, useState } from "react";

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
  const [recipes, setRecipes] = useState([]);
  const [recipesPanier, setRecipesPanier] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [coordDefault, setCoordDefault] = useState();
  const [recipesPanierSaved, setRecipesPanierSaved] = useState([]);

  const [checkSubmit, setCheckSubmit] = useState("");

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    recipes.forEach((recipe) => (recipe.panier = true));
    setRecipesPanier(recipes.slice(0, 2));
  }, [recipes]);

  useEffect(() => {
    if (checkSubmit === "PaymentSuccessful") {
      setRecipesPanierSaved(recipesPanier);
      setRecipesPanier([]);
    }
  }, [checkSubmit]);

  const coordTest = {
    id: 1,
    lastName: "Nouhen",
    firstName: "Gaby",
    adress: "7 rue Benjamin Delessert",
    postalCode: "87100",
    city: "Limoges",
    country: "France",
    dateSelect: 1755699396215,
  };

  const coordTest2 = {
    id: 2,
    lastName: "Pedro",
    firstName: "Jimmy",
    adress: "7 rue Benjamin Delessert",
    postalCode: "87100",
    city: "Limoges",
    country: "France",
    dateSelect: Date.now(),
  };

  useEffect(() => {
    const initialUserInfo = [coordTest, coordTest2].sort(
      (a, b) => b.dateSelect - a.dateSelect
    );
    setUserInfo(initialUserInfo);
    setCoordDefault(initialUserInfo[0]);
  }, []);
  return (
    <>
      <Header />
      <main className="py-5 bg-gradient-to-r from-[#dbe4c6] to-[#fff6cc]">
        <div className="mx-auto px-5 section md:w-1/2 rounded-2xl">
          <CartSummary
            recipesPanier={recipesPanier}
            setRecipesPanier={setRecipesPanier}
            recipes={recipes}
          />

          <BillingAddress
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            coordDefault={coordDefault}
            setCoordDefault={setCoordDefault}
          />

          <PaymentForm
            userInfo={userInfo}
            recipesPanier={recipesPanier}
            setCheckSubmit={setCheckSubmit}
            setRecipesPanier={setRecipesPanier}
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
