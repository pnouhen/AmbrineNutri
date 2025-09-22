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
  const { token, userInfo, setUserInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isRecipes, setIsRecipes] = useState("Le panier est vide");
  const [recipesPanier, setRecipesPanier] = useState([]);
  const [recipesPanierSaved, setRecipesPanierSaved] = useState(null);
  const [coordDefault, setCoordDefault] = useState();

  const [messageModal, setMessageModal] = useState("");

  // Manage page if token
  useEffect(() => {
    if (!token) navigate("/se-connecter");
  }, [token]);

  // Generate all recipes for display recipes in panier
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

  // Display recipes in panier
  useEffect(() => {
    const searchRecipeInPanier = recipes.filter((recipe) =>
      userInfo?.panier.includes(recipe._id)
    );
    setRecipesPanier(searchRecipeInPanier);
  }, [recipes, userInfo]);

  // DeleteRecipe in front and back
  const deleteRecipe = (id) => {
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/panier/${id}`
    )
      .then(() => {
        setRecipesPanier(recipesPanier.filter((r) => r._id !== id));
        userInfo.panier = userInfo.panier.filter((panierId) => panierId !== id);
      })
      .catch((error) => {
        setMessageModal("NoDelete");
        console.error("Erreur :", error);
      });
  };

  // Clean recipesPanier
  useEffect(() => {
    if (messageModal === "PaymentSuccessful") {
      setRecipesPanierSaved(recipesPanier);
      setRecipesPanier([]);
    }
  }, [messageModal]);

  // Display coordDefault
  useEffect(() => {
    setCoordDefault(
      userInfo?.addresses.find((address) => address.isDefault === true)
    );
  }, [userInfo]);

  // Shows page after generate all elements
  if (!userInfo) {
    return null;
  }
  if (userInfo?.panier.length > 1 && recipesPanier.length === 0) return null;

  return (
    <>
      <Header />

      <main className="py-5 bg-gradient-to-r from-[#dbe4c6] to-[#fff6cc]">
        <div className="mx-auto px-5 section md:w-1/2 rounded-2xl">
          <CartSummary
            recipesPanier={recipesPanier}
            isRecipes={isRecipes}
            deleteRecipe={deleteRecipe}
          />

          <BillingAddress
            addresses={userInfo?.addresses}
            setUserInfo={setUserInfo}
            coordDefault={coordDefault}
            setCoordDefault={setCoordDefault}
            setMessageModal={setMessageModal}
          />

          <PaymentForm
            recipesPanier={recipesPanier}
            setCheckSubmit={setMessageModal}
            setRecipesPanier={setRecipesPanier}
            coordDefault={coordDefault}
          />
        </div>

        <ModalMessage
          action={messageModal}
          onClickClose={() => setMessageModal("")}
        />
      </main>

      <Footer />

      {/* TODO Voir pour le generer en back-end */}
      {messageModal === "PaymentSuccessful" && (
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
