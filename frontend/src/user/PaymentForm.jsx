import React, { useRef, useState } from "react";
import Cleave from "cleave.js/react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export function PaymentForm({
  recipesPanier,
  setCheckSubmit,
  setRecipesPanier,
}) {
  const user = []
  const carteNameRef = useRef();
  const cardNumberRef = useRef();
  const expiryDateRef = useRef();
  const cryptogramRef = useRef();

  const submitPayement = (e) => {
    e.preventDefault();

    // Récupération des valeurs
    const carteName = carteNameRef.current?.value.trim();
    const cardNumber = cardNumberRef.current?.state.value.trim();
    const cryptogram = cryptogramRef.current?.value.trim();

    // Gestion de la date d'expiration
    const expiryInput = expiryDateRef.current?.state.value.trim(); // "MM/YY"
    let expiryDate = "";
    const [monthStr, yearStr] = expiryInput.split("/");
    expiryDate = yearStr + monthStr;

    // Date actuelle en YYMM
    const now = new Date();
    const monthNow = String(now.getMonth() + 1).padStart(2, "0");
    const yearNow = String(now.getFullYear()).slice(-2);
    const dateNow = yearNow + monthNow;

    // Validation
    const isValid =
      carteName !== "" &&
      cardNumber.length === 19 &&
      expiryDate >= dateNow &&
      cryptogram.length === 3;

    if (isValid && user.length > 0 && recipesPanier.length > 0) {
      setCheckSubmit("PaymentSuccessful");
      setRecipesPanier([]);

      carteNameRef.current.value = "";
      cardNumberRef.current.state.value = "";
      cryptogramRef.current.value = "";
      expiryDateRef.current.state.value = "";
    }

    if (!isValid) setCheckSubmit("ErrorSubmit");
    if (user.length === 0) setCheckSubmit("EmptyCoord");
    if (recipesPanier.length === 0) setCheckSubmit("EmptyPanier");
  };

  return (
    <div className="border-panier pb-5 flex flex-col gap-5">
      <h3 className="h3">Payer en ligne</h3>

      <form
        className="mx-auto md:w-full w-2/3 flex flex-wrap gap-5 justify-between"
        onSubmit={submitPayement}
      >
        <LabelInput
          classNameLabelInput="w-full"
          htmlFor="carteName"
          label="Nom de la carte"
          type="text"
          id="carteName"
          classNameInput="w-full"
          ref={carteNameRef}
        />

        <div className="labelInput w-full">
          <label htmlFor="cardNumber" className="label font18-600">
            Numéro de carte
          </label>

          <Cleave
            className="py-2.5 px-5 inputButton insideInput"
            id="cardNumber"
            options={{ creditCard: true }}
            value="4242424242424242"
           ref={cardNumberRef}
          />
        </div>

        <div className="labelInput">
          <label htmlFor="expiryDate" className="label font18-600">
            Date d'expiration{" "}
          </label>

          <Cleave
            className="py-2.5 px-5 lg:w-[11.875rem] md:w-[10.625rem] w-[9.375rem] inputButton insideInput"
            id="expiryDate"
            placeholder="MM/AA"
            options={{
              blocks: [2, 2],
              numericOnly: true,
              delimiter: "/",
            }}
            value="0232"
           ref={expiryDateRef}
          />
        </div>

        <LabelInput
          htmlFor="cryptogram"
          label="Cryptogramme"
          type="password"
          id="cryptogram"
          classNameInput="lg:w-[10.625rem] md:w-[9.5625rem] w-[8.5rem]"
          ref={cryptogramRef}
          value="250"
          maxLength={3}
        />

        <div className="mt-5 w-full flex justify-center">
          <Button text="Payer" className="w-full buttonSubmit" type="submit" />
        </div>
      </form>
    </div>
  );
}
