import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { ModalCoord } from "./ModalCoord";
import { ExistingAddress } from "./ExistingAddress";

export function BillingAddress({
  user,
  setUser,
  setCoordSelect,
  coordDefault,
  setCoordDefault
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateCoord, setUpdateCoord] = useState({
    id: "",
    lastName: "",
    firstName: "",
    adress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  return (
    <div className="pb-6 border-panier relative flex flex-col gap-5">
      <h3 className="h3">Adresse de facturation</h3>
      <ExistingAddress
        user={user}
        setUser={setUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setUpdateCoord={setUpdateCoord}
        setCoordSelect={setCoordSelect}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
      />

      <Button
        text="+ Ajouter une adresse"
        className="mt-2.5 bg-green-100"
        onClick={() => setIsOpen(!isOpen)}
      />

      <ModalCoord
        user={user}
        setUser={setUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateCoord={updateCoord}
        setUpdateCoord={setUpdateCoord}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
      />
    </div>
  );
}
