import React, { useState } from "react";
import { ModalCoord } from "./ModalCoord";

export function ExistingAddress({
  userInfo,
  setUserInfo,
  isOpen,
  setIsOpen,
  setUpdateCoord,
  coordDefault,
  setCoordDefault
}) {
  if (userInfo.length === 0) return null;
  const changeCoordDefault = (coord) => {
  coord.dateSelect = Date.now();

  const newCoordDefault = [...userInfo].sort(
    (a, b) => b.dateSelect - a.dateSelect
  );

  setCoordDefault(newCoordDefault[0]);
};

  const updateAdress = (coord, event) => {
  event.stopPropagation();
  setIsOpen(!isOpen);
  setUpdateCoord({
    id: coord.id,
    lastName: coord.lastName,
    firstName: coord.firstName,
    adress: coord.adress,
    postalCode: coord.postalCode,
    city: coord.city,
    country: coord.country,
  });
};

  const deleteAdress = (id) => {
    setUserInfo(userInfo.filter((coord) => coord.id !== id));
  };

  return (
    <>
      {userInfo.map((coord) => (
        <div
          key={coord.id}
          className={`p-5 flex flex-col gap-4 rounded-lg cursor-pointer ${
            coord.id === coordDefault?.id
              ? "shadow-recipeButtonActive"
              : "shadow-recipeButton"
          }`}
          onClick={() => changeCoordDefault(coord)}
        >
          <div>
            <p className="h3">
              {coord.firstName} {coord.lastName}
            </p>

            <p className="text">
              {coord.adress}, {coord.postalCode}, {coord.city}, {coord.country}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="font-semibold cursor-pointer"
              onClick={(e) => updateAdress(coord, e)}
            >
              Modifier
            </button>

            <button
              className="font-semibold cursor-pointer"
              onClick={() => deleteAdress(coord.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
