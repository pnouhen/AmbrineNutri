import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Button from "../components/Button";
import { ModalCoord } from "./ModalCoord";
import { ExistingAddress } from "./ExistingAddress";

export function BillingAddress({
  addresses,
  setUserInfo,
  coordDefault,
  setCoordDefault,
  setMessageModal,
}) {
  const { token } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateCoord, setUpdateCoord] = useState({});

  return (
    <div className="pb-6 border-panier relative flex flex-col gap-5">
      <h3 className="h3">Adresse de facturation</h3>
      <ExistingAddress
        addresses={addresses}
        setUserInfo={setUserInfo}
        setIsOpenModal={setIsOpenModal}
        setUpdateCoord={setUpdateCoord}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
        setMessageModal={setMessageModal}
      />

      <Button
        text="+ Ajouter une adresse"
        className="mt-2.5 bg-green-100"
        onClick={() => setIsOpenModal(!isOpenModal)}
      />

      <ModalCoord
        token={token}
        addresses={addresses}
        setUserInfo={setUserInfo}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        updateCoord={updateCoord}
        coordDefault={coordDefault}
        setCoordDefault={setCoordDefault}
        setMessageModal={setMessageModal}
      />
    </div>
  );
}
