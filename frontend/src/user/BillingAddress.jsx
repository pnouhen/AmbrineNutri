import React, { useRef, useState } from "react";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export function BillingAddress() {
  const [openNew, setOpenNew] = useState(true);
  const [userInfo, setUserInfo] = useState();

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  return (
    <div className="relative flex flex-col gap-5">
      <h2 className="h2 pt-5">Adresse de facturation</h2>
      {userInfo?.map((adress) => (
        <div>
          <p>Test</p>
        </div>
      ))}
      <Button
        text="+ Ajouter une adresse"
        className="bg-green-100 w-52"
        onClick={() => setOpenNew(!openNew)}
      />

      <form
        className={`w-3/4 grid grid-cols-6 gap-5 transition-all forwards duration-300 overflow-hidden ${
          openNew
            ? "px-2 pb-5 max-h-[800px] opacity-100"
            : "max-h-0 opacity-0 w-3/4"
        }`}
      >
        <div className="col-start-1 col-end-4">
          <LabelInput
            htmlFor={"lastName"}
            label="Nom"
            type={"text"}
            id={"lastName"}
            InputRef={lastNameRef}
          />
        </div>

        <div className="col-start-4 col-end-7">
          <LabelInput
            htmlFor={"firstName"}
            label="Prénom"
            type={"text"}
            id={"firstName"}
            InputRef={firstNameRef}
          />
        </div>

        <div className="col-start-1 col-end-7">
          <LabelInput
            htmlFor={"address"}
            label="Adresse"
            type={"text"}
            id={"address"}
            InputRef={addressRef}
          />
        </div>

        <div className="col-start-1 col-end-3">
          <LabelInput
            htmlFor={"postalCode"}
            label="Code postal"
            type={"number"}
            id={"postalCode"}
            InputRef={postalCodeRef}
          />
        </div>

        <div className="col-start-3 col-end-5">
          <LabelInput
            htmlFor={"city"}
            label="Ville"
            type={"text"}
            id={"city"}
            InputRef={cityRef}
          />
        </div>

        <div className="col-start-5 col-end-7">
          <LabelInput
            htmlFor={"country"}
            label="Pays"
            type={"text"}
            id={"country"}
            InputRef={countryRef}
          />
        </div>

         <Button className="col-start-3 col-end-5 mt-5 buttonSubmit" type="submit" text="Enregistez" />
      </form>
    </div>
  );
}
