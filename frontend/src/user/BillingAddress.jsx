import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { fetchDataUserGet } from "../services/fetchDataUserGet";

import Button from "../components/Button";
import { ModalCoord } from "./ModalCoord";
import { ExistingAddress } from "./ExistingAddress";

export function BillingAddress({ coordDefault, setCoordDefault }) {
  const { token } = useContext(AuthContext);

  const [addresses, setAddresses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updateCoord, setUpdateCoord] = useState({});

  // Obligatoire pour gérer les adresses
  useEffect(() => {
    if (token)
      fetchDataUserGet(`${import.meta.env.VITE_BASE_API}/api/users/me`)
        .then((usr) => {
          setAddresses(usr.addresses);
          setCoordDefault(
            usr.addresses.filter((adress) => adress.isDefault === true)
          );
        })
        .catch((error) => {
          console.error("Erreur lors du chargement", error);
          setMessageNoData("Désolé, un problème est survenu.");
        });
  }, [addresses.length]);

  return (
    <div className="pb-6 border-panier relative flex flex-col gap-5">
      <h3 className="h3">Adresse de facturation</h3>
      <ExistingAddress
        addresses={addresses}
        setAddresses={setAddresses}
        setIsOpen={setIsOpen}
        setUpdateCoord={setUpdateCoord}
        setCoordDefault={setCoordDefault}
      />

      <Button
        text="+ Ajouter une adresse"
        className="mt-2.5 bg-green-100"
        onClick={() => setIsOpen(!isOpen)}
      />

      <ModalCoord
        token={token}
        addresses={addresses}
        setAddresses={setAddresses}
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
