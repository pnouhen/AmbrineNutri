import React, { useRef, useState } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import ModalClose from "../Modals/ModalClose";
import { fetchDataUserPost } from "../services/fetchDataUserPost";
import { fetchDataUserPut } from "../services/fetchDataUserPut";

export function ModalCoord({
  token,
  addresses,
  setAddresses,
  isOpen,
  setIsOpen,
  updateCoord,
  setUpdateCoord,
  setCoordDefault,
}) {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const [emptyInput, setEmptyInput] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setEmptyInput(false);
    setUpdateCoord({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastName = lastNameRef.current?.value.trim();
    const firstName = firstNameRef.current?.value.trim();
    const address = addressRef.current?.value.trim();
    const postalCode = postalCodeRef.current?.value.trim();
    const city = cityRef.current?.value.trim();
    const country = countryRef.current?.value.trim();

    const isValid =
      lastName !== "" &&
      firstName !== "" &&
      address !== "" &&
      postalCode !== "" &&
      city !== "" &&
      country !== "";

    if (isValid && token) {
      setEmptyInput(false);

      const newCoord = {
        lastName: lastName,
        firstName: firstName,
        address: address,
        postalCode: postalCode,
        city: city,
        country: country,
        isDefault: true,
      };

      if (!updateCoord.id) {
        const body = {
          address: newCoord,
        };

        fetchDataUserPost(
          `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
          body
        )
          .then((res) => {
            // On décoche les adresses précédentes par défaut
            if (addresses.length > 0)
              addresses.forEach((el) => (el.isDefault = false));

            // On ajoute la nouvelle adresse en début de tableau
            setAddresses((prev) => [{ ...newCoord, isDefault: true }, ...prev]);
          })
          .catch(console.error);
      } else {
        const id = updateCoord.id;

        const body = {
          id: id,
          newAddress: newCoord,
        };

        fetchDataUserPut(
          `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
          body
        )
          .then(() => {
            newCoord._id = id;
            setAddresses((prev) =>
              prev.map((adr) =>
                String(adr._id) === String(id)
                  ? { ...newCoord, isDefault: true}
                  : { ...adr, isDefault: false }
              )
            );
          })
          .catch(console.error);
      }

      setUpdateCoord({});
      setIsOpen(!isOpen);
      setCoordDefault(newCoord);
    } else {
      setEmptyInput(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={() => closeModal()} className="modal max-md:px-5">
      <div
        className="modalContainer md:w-1/2 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalClose onClick={() => closeModal()} />
        <form
          onSubmit={handleSubmit}
          className="p-2.5 lg:grid lg:grid-cols-6 flex flex-wrap justify-center gap-y-3 gap-x-5"
        >
          <div className="lg:col-start-1 lg:col-end-4">
            <LabelInput
              htmlFor={"lastName"}
              label="Nom"
              type={"text"}
              id={"lastName"}
              value={updateCoord.lastName}
              ref={lastNameRef}
            />
          </div>

          <div className="lg:col-start-4 lg:col-end-7">
            <LabelInput
              htmlFor={"firstName"}
              label="Prénom"
              type={"text"}
              id={"firstName"}
              value={updateCoord.firstName}
              ref={firstNameRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-7">
            <LabelInput
              htmlFor={"address"}
              label="Adresse"
              type={"text"}
              id={"address"}
              value={updateCoord.address}
              ref={addressRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-3">
            <LabelInput
              htmlFor={"postalCode"}
              label="Code postal"
              type={"number"}
              id={"postalCode"}
              value={updateCoord.postalCode}
              ref={postalCodeRef}
            />
          </div>

          <div className="lg:col-start-3 lg:col-end-7">
            <LabelInput
              htmlFor={"city"}
              label="Ville"
              type={"text"}
              id={"city"}
              value={updateCoord.city}
              ref={cityRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-4">
            <LabelInput
              htmlFor={"country"}
              label="Pays"
              type={"text"}
              id={"country"}
              value={updateCoord.country}
              ref={countryRef}
            />
          </div>

          <p
            className={
              emptyInput
                ? "lg:col-start-1 lg:col-end-7 text text-center text-red-400 font-semibold"
                : "hidden"
            }
          >
            Tous les champs doivent être remplis
          </p>

          <div className="lg:col-start-3 lg:col-end-5 mt-5 w-full flex justify-center">
            <Button className="buttonSubmit" type="submit" text="Enregistez" />
          </div>
        </form>
      </div>
    </div>
  );
}
