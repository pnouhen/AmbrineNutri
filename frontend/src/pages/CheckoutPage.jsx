import React, { useEffect, useState } from "react";

import Header from "../structures/Header";
import { CartSummary } from "../user/CartSummary";
import { BillingAddress } from "../user/BillingAddress";
import Footer from "../structures/Footer";

import { fetchDataGet } from "../services/fetchDataGet";

export function CheckoutPage() {
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [coordDefault, setCoordDefault] = useState();

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
      .then((recipes) => {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(recipes);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

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
      <main className="section p-5">
        <div className="mx-auto md:w-1/2">
          <CartSummary recipes={recipes} />

          <BillingAddress
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            coordDefault={coordDefault}
            setCoordDefault={setCoordDefault}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
