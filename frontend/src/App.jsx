import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTracker from "./components/PageTracker"; // Ajoutez ceci
import Home from "./pages/Home";
import About from "./pages/About";
import ConsultationTarifs from "./pages/ConsultationTarifs";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AuthPage from "./pages/AuthPage";
import { CheckoutPage } from "./pages/CheckoutPage";

import "./styles/layout.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageTracker><Home /></PageTracker>,
  },
  {
    path: "/qui-suis-je",
    element: <PageTracker><About /></PageTracker>,
  },
  {
    path: "/consultations-et-tarifs",
    element: <PageTracker><ConsultationTarifs /></PageTracker>,
  },
  {
    path: "/recettes",
    element: <PageTracker><Recipes /></PageTracker>,
  },
  {
    path: "/recettes/:id",
    element: <PageTracker><RecipeDetails /></PageTracker>,
  },
  {
    path: "/se-connecter",
    element: <PageTracker><AuthPage /></PageTracker>,
  },
  {
    path: "/panier",
    element: <PageTracker><CheckoutPage /></PageTracker>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;