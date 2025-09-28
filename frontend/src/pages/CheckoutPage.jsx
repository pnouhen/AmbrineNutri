import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { fetchDataUserPost } from "../services/fetchDataUserPost";
import { isValidAddress } from "../services/isValidAddress";
import { fetchDataUserDelete } from "../services/fetchDataUserDelete";

import Header from "../structures/Header";
import { CartSummary } from "../user/CartSummary";
import { BillingAddress } from "../user/BillingAddress";
import { fetchDataGet } from "../services/fetchDataGet";
import { PaymentForm } from "../user/PaymentForm";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";

import { isValidPayment } from "../services/isValidPayment";

export function CheckoutPage() {
  const { token, userInfo, setUserInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isRecipes, setIsRecipes] = useState("Le panier est vide");
  const [recipesPanier, setRecipesPanier] = useState([]);
  const [coordDefault, setCoordDefault] = useState(() =>
    userInfo?.addresses.filter((address) => address.isDefault)
  );

  const carteNameRef = useRef();
  const cardNumberRef = useRef();
  const expiryDateRef = useRef();
  const cryptogramRef = useRef();

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

  // Display coordDefault
  useEffect(() => {
    setCoordDefault(
      userInfo?.addresses.find((address) => address.isDefault === true)
    );
  }, [userInfo]);

  // Submit Payment here if the payment form should be used
  const submitPayement = (e) => {
    e.preventDefault();

    // Use getRawValue() for element generate by Cleave
    const carteName = carteNameRef.current?.value.trim();
    const cardNumber = cardNumberRef.current.getRawValue()?.trim();
    const cryptograme = cryptogramRef.current?.value.trim();
    const expiryDate = expiryDateRef.current?.getRawValue()?.trim();

    const infopurchasesRecipes = {
      panier: userInfo.panier,
      address: coordDefault,
      carteName: carteName,
      cardNumber: cardNumber,
      cryptograme: cryptograme,
      expiryDate: expiryDate,
    };
    const body = {
      infopurchasesRecipes: infopurchasesRecipes,
    };

    // Panier is empty
    if (userInfo.panier.length === 0) setMessageModal("NoRecipePanier");

    // Recipes doesn't already purchased
    const alreadyPurchased = userInfo.panier.some((idPanier) =>
      userInfo.purchases.includes(idPanier)
    );
    if (alreadyPurchased) setMessageModal("RecipeAlreadyPurchased");

    // Check one address is défault
    const hasDefault = userInfo.addresses.some(
      (address) => address.isDefault === true
    );
    if (!infopurchasesRecipes.address?.isDefault && !hasDefault)
      setMessageModal("NoAddressIsDefault");

    // Check address is good
    if (!isValidAddress(infopurchasesRecipes.address))
      setMessageModal("InvalidAddress");

    // Check all the elements of Payment
    if (!isValidPayment(infopurchasesRecipes)) setMessageModal("FailPayment");

    fetchDataUserPost(
      `${import.meta.env.VITE_BASE_API}/api/users/me/purchasesRecipes`,
      body
    )
      .then(() => {
        setUserInfo((prev) => ({
          ...prev,
          panier: [],
        }));
        setRecipesPanier([]);
        setMessageModal("PaymentSuccessful");
      })
      .catch((error) => console.error("Erreur", error));
  };

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
            submitPayement={submitPayement}
            carteNameRef={carteNameRef}
            cardNumberRef={cardNumberRef}
            expiryDateRef={expiryDateRef}
            cryptogramRef={cryptogramRef}
          />
        </div>

        <ModalMessage
          action={messageModal}
          onClickClose={() => setMessageModal("")}
        />
      </main>

      <Footer />
    </>
  );
}
