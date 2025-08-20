import React, { useRef, useState } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import ModalClose from "../Modals/ModalClose";

export function ModalCoord({
  userInfo,
  setUserInfo,
  isOpen,
  setIsOpen,
  updateCoord,
  setUpdateCoord,
  setCoordDefault
}) {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const [emptyInput, setEmptyInput] = useState(false);

  const cleanUpdateCoord = () => {
    setUpdateCoord({
        id: "",
        lastName: "",
        firstName: "",
        adress: "",
        postalCode: "",
        city: "",
        country: "",
      });
  }

  const closeModal = () => {
    setIsOpen(!isOpen);
    setEmptyInput(false);
    cleanUpdateCoord()
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

    if (isValid) {
      setEmptyInput(false);

      let checkId = 0;

      if (updateCoord.id) {
        checkId = updateCoord.id;
      } else {
        checkId = Date.now();
      }

      const newCoord = {
        id: checkId,
        lastName: lastName,
        firstName: firstName,
        adress: address,
        postalCode: postalCode,
        city: city,
        country: country,
        dateSelect: Date.now()
      };

      const checkNewCoord = userInfo.filter(
        (coord) => coord.id === newCoord.id
      );

      if (checkNewCoord.length === 0) {
        setUserInfo((prev) => [...prev, newCoord]);
      } else {
        setUserInfo((prev) =>
          prev.map((coord) => (coord.id === newCoord.id ? newCoord : coord))
        );
      }
      
      cleanUpdateCoord()
      setIsOpen(!isOpen);  
      setCoordDefault(newCoord)  
    } else {
      setEmptyInput(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={() => closeModal()} className="modal md:px-10 px-5">
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
              InputRef={lastNameRef}
            />
          </div>

          <div className="lg:col-start-4 lg:col-end-7">
            <LabelInput
              htmlFor={"firstName"}
              label="Prénom"
              type={"text"}
              id={"firstName"}
              value={updateCoord.firstName}
              InputRef={firstNameRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-7">
            <LabelInput
              htmlFor={"address"}
              label="Adresse"
              type={"text"}
              id={"address"}
              value={updateCoord.adress}
              InputRef={addressRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-3">
            <LabelInput
              htmlFor={"postalCode"}
              label="Code postal"
              type={"number"}
              id={"postalCode"}
              value={updateCoord.postalCode}
              InputRef={postalCodeRef}
            />
          </div>

          <div className="lg:col-start-3 lg:col-end-7">
            <LabelInput
              htmlFor={"city"}
              label="Ville"
              type={"text"}
              id={"city"}
              value={updateCoord.city}
              InputRef={cityRef}
            />
          </div>

          <div className="lg:col-start-1 lg:col-end-4">
            <LabelInput
              htmlFor={"country"}
              label="Pays"
              type={"text"}
              id={"country"}
              value={updateCoord.country}
              InputRef={countryRef}
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
