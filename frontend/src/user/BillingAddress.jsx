import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Button from "../components/Button";
import { ModalCoord } from "./ModalCoord";
import { ExistingAddress } from "./ExistingAddress";

export function BillingAddress({
  addresses,
  setAddresses,
  coordDefault,
  setCoordDefault,
  setMessageModal,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateCoord, setUpdateCoord] = useState({});

  return (
    <div className="pb-6 borderTopGray relative flex flex-col gap-5">
      <h3 className="h3">Adresse de facturation</h3>
      <ExistingAddress
        addresses={addresses}
        setAddresses={setAddresses}
        setIsOpenModal={setIsOpenModal}
        setUpdateCoord={setUpdateCoord}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
        setMessageModal={setMessageModal}
      />

      <Button
        text="+ Ajouter une adresse"
        className="mt-2.5 bg-green-100"
        onClick={() => setIsOpenModal(true)}
      />

      <ModalCoord
        addresses={addresses}
        setAddresses={setAddresses}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        updateCoord={updateCoord}
        setUpdateCoord={setUpdateCoord}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
        setMessageModal={setMessageModal}
      />
    </div>
  );
}
