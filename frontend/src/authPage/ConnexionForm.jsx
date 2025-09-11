import React, { useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { redirectAfterLogin } from "../components/redirectAfterLogin";
import { AuthContext } from "../contexts/AuthContext";
import { fetchDataPost } from "../services/fetchDataPost";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function ConnexionForm({ setCheckSubmit }) {
  const emailConnexionRef = useRef();
  const passwordConnexionRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailConnexion = emailConnexionRef.current?.value.trim();
    const passwordConnexion = passwordConnexionRef.current?.value.trim();
    const isValid = emailConnexion && passwordConnexion !== "";

    const connexion = {
      email: emailConnexion,
      password: passwordConnexion,
    };

    if (!isValid) {
      setCheckSubmit("ErrorSubmit");
    } else {
      try {
        await fetchDataPost(
          `${import.meta.env.VITE_BASE_API}/api/users/login`,
          connexion
        ).then((data) => {
          login(data.token, data.user);
          redirectAfterLogin(navigate, location);
        });
      } catch (error) {
        console.error("Erreur:", error);
        setCheckSubmit("noConnexionAuthPage");
      }
    }
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
          autoComplete={"off"}
        />
        <Button text="Se connecter" className="buttonSubmit" />
      </form>
    </div>
  );
}
