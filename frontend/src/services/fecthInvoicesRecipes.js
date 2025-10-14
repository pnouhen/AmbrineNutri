import React from "react";
import { fetchDataUserGet } from "./fetchDataUserGet";

export function fecthInvoicesRecipes() {
  return fetchDataUserGet(
    `${import.meta.env.VITE_BASE_API}/api/users/me/invoicesRecipes`, "invoicesRecipes"
  )
    .then((invoicesRecipes) => {
      return invoicesRecipes;
    })
    .catch((error) => {
      console.error("Erreur lors du chargement", error);
      return [];
    });
}
