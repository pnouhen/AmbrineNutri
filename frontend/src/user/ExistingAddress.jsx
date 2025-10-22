import React, { useEffect, useState } from "react";

import { fetchDataUserDelete } from "../services/fetchDataUserDelete";
import { fetchDataUserPut } from "../services/fetchDataUserPut";
import MessageNoData from "../components/MessageNoData";

export function ExistingAddress({
  addresses,
  setAddresses,
  setIsOpenModal,
  setUpdateCoord,
  coordDefault,
  setCoordDefault,
  setMessageModal,
}) {
  const updateAddress = (coord) => {
    setIsOpenModal(true);

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
    if (coord._id !== coordDefault._id) {
      const updatedCoord = { ...coord, isDefault: true };
      const body = {
        id: coord._id,
        updateAddress: updatedCoord,
      };
      fetchDataUserPut(
        `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
        body
      )
        .then((newCoord) => {
          setCoordDefault(newCoord.address);
          const newAddresses = addresses.map((address) => {
            if (address._id !== newCoord.address._id) {
              return { ...address, isDefault: false };
            } else {
              return { ...address, isDefault: true };
            }
          });

          // Update in sessionStorage
          const storedArray = JSON.parse(sessionStorage.getItem("userInfo"));
          storedArray.addresses = newAddresses;
          sessionStorage.setItem("userInfo", JSON.stringify(storedArray));
        })
        .catch((error) => {
          if (!coord.isDefault) setMessageModal("InvalidAddress");
          console.error("Erreur :", error);
        });
    }
  };

  const deleteAddress = (deleteCoord) => {
    fetchDataUserDelete(
      `${import.meta.env.VITE_BASE_API}/api/users/me/addresses/${
        deleteCoord._id
      }`
    )
      .then(() => {
        if (coordDefault && deleteCoord.isDefault === true) setCoordDefault({});
        const updateAddresses = addresses.filter(
          (address) => address._id !== deleteCoord._id
        );
        setAddresses(updateAddresses);

        // Delete in sessionStorage
        const storedArray = JSON.parse(sessionStorage.getItem("userInfo"));
        const newAddresses = storedArray.addresses.filter(
          (address) => address._id !== deleteCoord._id
        );
        storedArray.addresses = newAddresses;
        sessionStorage.setItem("userInfo", JSON.stringify(storedArray));
      })
      .catch((error) => {
        setMessageModal("NoDelete");
        console.error("Erreur :", error);
      });
  };

  const onEnterAddresses = (e, coord) => {
    if (e.key === "Enter") updateCoordDefault(coord);
  };

  return (
    <>
      {/* If addresses === null, the page doesn't display */}
      {!addresses || addresses.length > 0 ? (
        addresses.map((coord, index) => (
          <div
            tabIndex={0}
            key={index}
            className={`pr-5 pt-5 flex flex-col rounded-lg bg-yellow-50 cursor-pointer ${
              coord._id === coordDefault?._id
                ? "shadow-recipeButtonActive"
                : "shadow-recipeButton"
            }`}
            onClick={() => updateCoordDefault(coord)}
            onKeyDown={(e) => onEnterAddresses(e, coord)}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateAddress(coord);
                }}
              >
                Modifier
              </button>

              <button
                className="p-5 font-semibold cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteAddress(coord);
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <MessageNoData text="Aucune adresse n'est disponible" />
      )}
    </>
  );
}
