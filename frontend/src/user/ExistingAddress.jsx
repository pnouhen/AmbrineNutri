import React, { useState } from "react";

import { fetchDataUserDelete } from "../services/fetchDataUserDelete";
import { fetchDataUserPut } from "../services/fetchDataUserPut";
import MessageNoData from "../components/MessageNoData";

export function ExistingAddress({
  addresses,
  setAddresses,
  setIsOpen,
  setUpdateCoord,
  messageNoData,
  setCoordDefault,
}) {
  const updateAddress = (coord, e) => {
    e.stopPropagation();
    setIsOpen(true);

    setUpdateCoord({
      id: coord._id,
      lastName: coord.lastName,
      firstName: coord.firstName,
      address: coord.address,
      postalCode: coord.postalCode,
      city: coord.city,
      country: coord.country,
    });
  };

  const updateCoordDefault = (coord) => {
    coord.isDefault === true;
    const body = {
      id: coord._id,
      newAddress: coord,
    };

    fetchDataUserPut(
      `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
      body
    )
      .then(() => {
        setCoordDefault(coord);
        setAddresses((prev) =>
          prev.map((adr) =>
            String(adr._id) === String(coord._id)
              ? { ...coord, isDefault: true }
              : { ...adr, isDefault: false }
          )
        );
      })
      .catch(console.error);
  };

  const deleteAddress = (deleteCoord, e) => {
    e.stopPropagation();
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/addresses/${
        deleteCoord._id
      }`
    )
      .then(() => {
        if (deleteCoord.isDefault === true) setCoordDefault({});
        setAddresses((prev) =>
          prev.filter((addr) => addr._id !== deleteCoord._id)
        );
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };
  return (
    <>
      {!addresses || addresses.length > 0 ? (
        addresses?.map((coord, index) => (
          <div
            key={index}
            className={`pr-5 pt-5 flex flex-col rounded-lg bg-yellow-50 cursor-pointer ${
              coord.isDefault
                ? "shadow-recipeButtonActive"
                : "shadow-recipeButton"
            }`}
            onClick={() => updateCoordDefault(coord)}
          >
            <div className="pl-5">
              <p className="h3">
                {coord.firstName} {coord.lastName}
              </p>

              <p className="text">
                {coord.address}, {coord.postalCode}, {coord.city},{" "}
                {coord.country}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="p-5 font-semibold cursor-pointer"
                onClick={(e) => updateAddress(coord, e)}
              >
                Modifier
              </button>

              <button
                className="p-5 font-semibold cursor-pointer"
                onClick={(e) => deleteAddress(coord, e)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <MessageNoData text={messageNoData} />
      )}
    </>
  );
}
