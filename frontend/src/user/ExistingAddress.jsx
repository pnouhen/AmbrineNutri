import React, { useState } from "react";

import { fetchDataUserPut } from "../services/fetchDataUserPut";
import { fetchDataUserDelete } from "../services/fetchDataUserDelete";

export function ExistingAddress({
  addresses,
  setAddresses,
  isOpen,
  setIsOpen,
  setUpdateCoord,
}) {
  if (addresses.length === 0) return null;

  const updateAddress = (coord, event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
    setUpdateCoord({
      id: coord.id,
      lastName: coord.lastName,
      firstName: coord.firstName,
      address: coord.address,
      postalCode: coord.postalCode,
      city: coord.city,
      country: coord.country,
    });
  };

  const deleteAddress = (id) => {
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/addresses/${id}`
    )
      .then(() => setAddresses(addresses.filter((coord) => coord.id !== id)))
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  return (
    <>
      {addresses.map((coord) => (
        <div
          key={coord.id}
          className={`p-5 flex flex-col gap-4 rounded-lg bg-yellow-50 cursor-pointer ${
            coord.isDefault ? "shadow-recipeButtonActive" : "shadow-recipeButton"
          }`}
          // onClick={() => changeCoordDefault(coord)}
        >
          <div>
            <p className="h3">
              {coord.firstName} {coord.lastName}
            </p>

            <p className="text">
              {coord.address}, {coord.postalCode}, {coord.city}, {coord.country}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="font-semibold cursor-pointer"
              onClick={(e) => updateAddress(coord, e)}
            >
              Modifier
            </button>

            <button
              className="font-semibold cursor-pointer"
              onClick={() => deleteAddress(coord.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
