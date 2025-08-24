import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { redirectAfterLogin } from "../components/redirectAfterLogin";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function ConnexionForm({ setCheckSubmit }) {
  const emailConnexionRef = useRef();
  const passwordConnexionRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailConnexion = emailConnexionRef.current?.value.trim();
    const passwordConnexion = passwordConnexionRef.current?.value.trim();
    const isValid = emailConnexion && passwordConnexion !== "";

    if (!isValid) {
      setCheckSubmit("noConnexion");
      return;
    }

    const login = {
      email: emailConnexion,
      password: passwordConnexion,
      panier: [],
      purchases: [],
      address: [],
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login),
        }
      );

      if (!response.ok) throw new Error("Identifiants incorrects");

      const data = await response.json();
      sessionStorage.setItem("token", data.token);

      redirectAfterLogin(navigate, location);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }

    emailConnexionRef.current.value = "";
    passwordConnexionRef.current.value = "";
  };

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
