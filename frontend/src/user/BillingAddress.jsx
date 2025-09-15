import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Button from "../components/Button";
import { ModalCoord } from "./ModalCoord";
import { ExistingAddress } from "./ExistingAddress";

export function BillingAddress({ coordDefault, setCoordDefault }) {
  const { token, userInfo } = useContext(AuthContext);

  const [addresses, setAddresses] = useState([]);
  const [messageNoData, setMessageNoData] = useState(
    "Aucune adresse n'est disponible"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [updateCoord, setUpdateCoord] = useState({});

  useEffect(() => {
    setAddresses(userInfo?.addresses);
    setCoordDefault(
      userInfo?.addresses.filter((adress) => adress.isDefault === true)
    );
  }, [addresses?.length, userInfo]);

  return (
    <div className="pb-6 border-panier relative flex flex-col gap-5">
      <h3 className="h3">Adresse de facturation</h3>
      <ExistingAddress
        addresses={addresses}
        setAddresses={setAddresses}
        setIsOpen={setIsOpen}
        setUpdateCoord={setUpdateCoord}
        messageNoData={messageNoData}
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
