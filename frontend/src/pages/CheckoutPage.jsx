import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Header from "../structures/Header";
import { CartSummary } from "../user/CartSummary";
import { BillingAddress } from "../user/BillingAddress";
import { fetchDataGet } from "../services/fetchDataGet";
import { PaymentForm } from "../user/PaymentForm";
import GenerateFacture from "../user/GenerateFacture";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import { fetchDataUserGet } from "../services/fetchDataUserGet";
import { fetchDataUserDelete } from "../services/fetchDataUserDelete";

export function CheckoutPage() {
  const { token, userInfo, setUserInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [recipesPanier, setRecipesPanier] = useState([]);
  const [user, setUser] = useState([]);
  const [coordDefault, setCoordDefault] = useState();
  const [recipesPanierSaved, setRecipesPanierSaved] = useState([]);

  const [checkSubmit, setCheckSubmit] = useState("");

  useEffect(() => {
    if (!token) navigate("/se-connecter");
  }, [token]);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  useEffect(() => {
    fetchDataUserGet(`${import.meta.env.VITE_BASE_API}/api/users/me`)
      .then((userId) => {
        const searchRecipeInPanier = recipes.filter((recipe) =>
          userId.panier.includes(recipe._id)
        );
        setRecipesPanier(searchRecipeInPanier);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, [recipes]);

  const deleteRecipe = (id) => {
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/panier/${id}`
    )
      .then((data) => {
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
    const initialUser = [coordTest, coordTest2].sort(
      (a, b) => b.dateSelect - a.dateSelect
    );
    setUser(initialUser);
    setCoordDefault(initialUser[0]);
  }, []);

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
            user={user}
            setUser={setUser}
            coordDefault={coordDefault}
            setCoordDefault={setCoordDefault}
          />

          <PaymentForm
            user={user}
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
