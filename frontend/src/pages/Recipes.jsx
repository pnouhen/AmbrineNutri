import React, { useEffect, useState } from "react";
import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import Footer from "../structures/Footer";
import { fetchDataGet } from "../services/fetchDataGet";

export default function Recipes() {
  const [infoAddRecipe, setInfoAddRecipe] = useState([]);
  const [categoriesRecipe, setCategoriesRecipe] = useState([]);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/infoaddrecipes`)
      .then((data) => {
        setInfoAddRecipe(data);
        console.log(data)
        const fetchedCategories = data[0]?.values || [];
        setCategoriesRecipe(["Tous", ...fetchedCategories]);
      })
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  return (
    <>
      <Header />
      <main className="relative py-5">
        <BackgroundImg
          className="right-0 object-cover object-top"
          url="/assets/img/background/background-recipes.webp"
        />
        <section className="section">
          <h2 className="h2 mb-5">Catégories</h2>
          <ul className="m-auto lg:grid lg:grid-cols-3 flex flex-wrap justify-center lg:gap-2.5 gap-8">
            {categoriesRecipe.map((categorie, index) => (
              <li key={index} className={`lg:mx-auto ${index === categoriesRecipe.length - 1 ? "col-start-1 col-end-4" : ""}`}>
                <button
                  className={`text recipeButton ${
                    filter === categorie ? "recipeButtonActive" : ""
                  }`}
                  onClick={() => setFilter(categorie)}
                >
                  {categorie}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
