import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ConsultationTarifs from "./pages/ConsultationTarifs";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AuthPage from "./pages/AuthPage";

import "./styles/layout.css"

const router = createBrowserRouter(
 [
   {
     path: "/",
     element: <Home />,
   },
   {
     path: "/qui-suis-je",
     element: <About/>,
   },
   {
    path: "/consultations-et-tarifs",
    element: (
        <ConsultationTarifs />
    ),
  },{
    path: "/recettes",
    element: (
        <Recipes />
    ),
  },
  {
    path: "/recettes/:id",
    element: (
        <RecipeDetails />
    ),
  },
  {
    path: "/se-connecter",
    element: (
        <AuthPage />
    ),
  } 
 ]
)

function App() {
  return <RouterProvider router={router} />;
}

export default App;
