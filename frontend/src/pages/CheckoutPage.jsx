import React, { useEffect, useState } from "react";

import Header from "../structures/Header";
import { CartSummary } from "../user/CartSummary";
import { BillingAddress } from "../user/BillingAddress";
import Footer from "../structures/Footer";

import { fetchDataGet } from "../services/fetchDataGet";

export function CheckoutPage() {
  const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/recipes`)
        .then((recipes) => {
          recipes.sort((a, b) => a.title.localeCompare(b.title));
          setRecipes(recipes);
        })
        .catch((error) => console.error("Erreur lors du chargement", error));
    }, []);
    return (
        <>
        <Header/>
        <main className="section p-5">
            <CartSummary recipes={recipes}/>

            <BillingAddress/>
        </main>

        <Footer/>
        </>
        
    )
}