import React from "react";
import { NavLink } from "react-router-dom";

export function Steps({ token, inPanier, buy, handleAddPanier, recipeDetails }) {
  if (!token) {
    return (
      <>
        <p className="text">
          Étant donné le temps investi dans la création des recettes, je demande
          une contribution de 1€ par recette.
          <br />
          Si cela vous intéresse, vous pouvez vous inscrire ou vous connecter en
          cliquant ici :
        </p>
        <NavLink to="/se-connecter" className="font-semibold underline">
          Connexion / Inscription
        </NavLink>
      </>
    );
  } else if (!inPanier && !buy) {
    return (
      <>
        <p className="text">
          Étant donné le temps investi dans la création des recettes, je demande
          une contribution de 1€ par recette.
          <br />
          Si cela vous intéresse, vous pouvez l'ajouter au panier en cliquant
          ici :
        </p>
        <button
          className="font-semibold underline cursor-pointer"
          onClick={handleAddPanier}
        >
          Ajoutez au panier
        </button>
      </>
    );
  }

  if (token && inPanier && !buy) {
    return (
      <>
        <p className="text">
          Recette ajoutée à votre panier ! Cliquez ici pour le consulter :
        </p>
        <NavLink to="/panier" className="font-semibold underline">
          Accéder au panier
        </NavLink>
      </>
    );
  }

  if (token && buy) {
    <ul className="ml-5 flex flex-col gap-4 list-decimal">
      {recipeDetails.steps.map((step, index) => (
        <li key={index} className="text">
          {step}
        </li>
      ))}
    </ul>;
  }
}
