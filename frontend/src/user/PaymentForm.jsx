import React from "react";
import Cleave from "cleave.js/react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export function PaymentForm({
  submitPayement,
  carteNameRef,
  cardNumberRef,
  expiryDateRef,
  cryptogramRef,
}) {
  return (
    <div className="borderTopGray pb-5 flex flex-col gap-5">
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
