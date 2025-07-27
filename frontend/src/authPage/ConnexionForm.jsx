import React, { useRef } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function ConnexionForm({setCheckSubmit}) {
  const emailConnexionRef = useRef();
  const passwordConnexionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailConnexion = emailConnexionRef.current?.value.trim()
    const passwordConnexion = passwordConnexionRef.current?.value.trim()

    const isValid = emailConnexion && passwordConnexion != ""

    if(isValid) {
        emailConnexionRef.current.value = ""
        passwordConnexionRef.current.value = ""
    } else {
          setCheckSubmit("noConnexion");
    }
  }

  return (
    <div className="section pb-5 px-5 authPageDiv">
      <h2 className="h2">Connexion</h2>
      <form className="authPageForm" onSubmit={handleSubmit}>
        <LabelInput
          htmlFor="e-mailConnexion"
          label="E-mail :"
          type="email"
          id="e-mailConnexion"
          ref={emailConnexionRef}
        />
        <LabelInput
          htmlFor="passwordConnexion"
          label="Mot de passe :"
          type="password"
          id="passwordConnexion"
          ref={passwordConnexionRef}
        />
        <Button text="Se connecter" className="buttonSubmit" />
      </form>
    </div>
  );
}
