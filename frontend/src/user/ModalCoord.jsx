import React, { useEffect, useRef, useState } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import ModalClose from "../Modals/ModalClose";
import { fetchDataUserPost } from "../services/fetchDataUserPost";
import { fetchDataUserPut } from "../services/fetchDataUserPut";
import { isValidAddress } from "../../src/services/isValidAddress";

export function ModalCoord({
  addresses,
  setAddresses,
  isOpenModal,
  setIsOpenModal,
  updateCoord,
  setUpdateCoord,
  coordDefault,
  setCoordDefault,
  setMessageModal,
}) {
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const [emptyInput, setEmptyInput] = useState(false);

  const closeModal = () => {
    setUpdateCoord([]);
    setIsOpenModal(false);
    setEmptyInput(false);
  };

  // For the controle with keydown
  useEffect(() => {
    if (isOpenModal) {
      // Save the element that had focus
      lastFocusedRef.current = document.activeElement;
      // Focus in the modal
      modalRef.current?.focus();
    } else {
      // Restore focus to the previous element
      lastFocusedRef.current?.focus();
    }
  }, [isOpenModal]);
  const onEscapeClose = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmptyInput(false);

    const lastName = lastNameRef.current?.value.trim();
    const firstName = firstNameRef.current?.value.trim();
    const address = addressRef.current?.value.trim();
    const postalCode = postalCodeRef.current?.value.trim();
    const city = cityRef.current?.value.trim();
    const country = countryRef.current?.value.trim();

    const newCoord = {
      lastName: lastName,
      firstName: firstName,
      address: address,
      postalCode: postalCode,
      city: city,
      country: country,
      isDefault: true,
    };

    if (isValidAddress(newCoord)) {
      if (!updateCoord.id) {
        const body = {
          newAddress: newCoord,
        };

        fetchDataUserPost(
          `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
          body,
          "s"
        )
          .then(() => {
            // Uncheck previous default addresses
            if (addresses.length > 0)
              addresses.forEach((el) => (el.isDefault = false));

            // Add the new address at the beginning of the table
            setAddresses((prev) => [newCoord, ...prev]);

            // Update sessionStorage
            const storedArray = JSON.parse(sessionStorage.getItem("userInfo"));
            storedArray.addresses.unshift(newCoord);
            sessionStorage.setItem("userInfo", JSON.stringify(storedArray));
          })
          .catch((error) => {
            setMessageModal("InvalidAddress");
            console.error("Erreur :", error);
          });
      } else {
        const id = updateCoord.id;

        const body = {
          id: id,
          updateAddress: newCoord,
        };

        fetchDataUserPut(
          `${import.meta.env.VITE_BASE_API}/api/users/me/addresses`,
          body
        )
          .then(() => {
            newCoord._id = id;
            setUpdateCoord([]);
            // Change isDefult for each address
            const newAddresses = addresses.map((address) => {
              if (address._id !== newCoord._id) {
                return { ...address, isDefault: false };
              } else {
                return newCoord;
              }
            });

            setAddresses(newAddresses);

            // Update SessionStorage
            const storedArray = JSON.parse(sessionStorage.getItem("userInfo"));
            storedArray.addresses = newAddresses;
            sessionStorage.setItem("userInfo", JSON.stringify(storedArray));
          })
          .catch((error) => {
            setMessageModal("InvalidAddress");
            console.error("Erreur :", error);
          });
      }

      setIsOpenModal(!isOpenModal);
      if (coordDefault) setCoordDefault(newCoord);
    } else {
      setEmptyInput(true);
    }
  };

  // Display Modal
  if (!isOpenModal) return null;

  return (
    <div onClick={() => closeModal()} className="modal max-md:px-5">
      <div
        tabIndex={-1} // Give priority to the modal
        ref={modalRef}
        onKeyDown={(e) => onEscapeClose(e)}
        className={`modalContainer w-full ${
          window.innerWidth > 1440 ? "md:w-[45rem]" : "md:w-1/2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalClose onClick={() => closeModal()} />
        <form
          onSubmit={handleSubmit}
          className="p-2.5 lg:grid lg:grid-cols-6 flex flex-wrap justify-center gap-y-3 gap-x-5"
        >
          <LabelInput
            classNameLabelInput="lg:col-start-1 lg:col-end-4"
            htmlFor={"lastName"}
            label="Nom"
            type={"text"}
            id={"lastName"}
            value={updateCoord.lastName}
            ref={lastNameRef}
          />

          <LabelInput
            classNameLabelInput="lg:col-start-4 lg:col-end-7"
            htmlFor={"firstName"}
            label="Prénom"
            type={"text"}
            id={"firstName"}
            value={updateCoord.firstName}
            ref={firstNameRef}
          />

          <LabelInput
            classNameLabelInput="lg:col-start-1 lg:col-end-7"
            htmlFor={"address"}
            label="Adresse"
            type={"text"}
            id={"address"}
            value={updateCoord.address}
            ref={addressRef}
          />

          <LabelInput
            classNameLabelInput="lg:col-start-1 lg:col-end-3"
            htmlFor={"postalCode"}
            label="Code postal"
            type={"number"}
            id={"postalCode"}
            value={updateCoord.postalCode}
            ref={postalCodeRef}
          />

          <LabelInput
            classNameLabelInput="lg:col-start-3 lg:col-end-7"
            htmlFor={"city"}
            label="Ville"
            type={"text"}
            id={"city"}
            value={updateCoord.city}
            ref={cityRef}
          />

          <LabelInput
            classNameLabelInput="lg:col-start-1 lg:col-end-4"
            htmlFor={"country"}
            label="Pays"
            type={"text"}
            id={"country"}
            value={updateCoord.country}
            ref={countryRef}
          />

          <p
            className={
              emptyInput || !isOpenModal
                ? "lg:col-start-1 lg:col-end-7 text text-center text-red-400 font-semibold"
                : "hidden"
            }
          >
            Certains champs sont pas remplis correctement
          </p>

          <div className="lg:col-start-3 lg:col-end-5 mt-5 w-full flex justify-center">
            <Button className="buttonSubmit" type="submit" text="Enregistez" />
          </div>
        </form>
      </div>
    </div>
  );
}
