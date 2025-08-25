import React, { useState } from "react";

import { fetchDataUserPut } from "../services/fetchDataUserPut";
import { fetchDataUserDelete } from "../services/fetchDataUserDelete";

export function ExistingAddress({
  address,
  setAddress,
  isOpen,
  setIsOpen,
  setUpdateCoord,
}) {
  if (address.length === 0) return null;

  //  async function changeCoordDefault(coord) {
  //   if (!coord.default)
  //     setAddress((prev) => {
  //       const newAddress = prev.map((element) => {
  //         if (element.id !== coord.id) {
  //           return { ...element, default: false };
  //         }
  //         return { ...element, default: true };
  //       });
  //       return newAddress;
  //     });
  //     try {
  //     const body = {
  //       id: coord.id,
  //       newAddress: { ...coord, default: true } // envoi le coord mis à jour
  //     };
  //     await fetchDataUserPut(`${import.meta.env.VITE_BASE_API}/api/users/me/address`, body);
  //   } catch (err) {
  //     console.error("Erreur lors de la mise à jour dans la BDD :", err);
  //   }
  // };

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
      `${import.meta.env.VITE_BASE_API}/api/users/me/address/${id}`
    )
      .then(() => setAddress(address.filter((coord) => coord.id !== id)))
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  return (
    <>
      {address.map((coord) => (
        <div
          key={coord.id}
          className={`p-5 flex flex-col gap-4 rounded-lg bg-yellow-50 cursor-pointer ${
            coord.default ? "shadow-recipeButtonActive" : "shadow-recipeButton"
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
