import React, { useRef } from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function SignInForm({ setCheckSubmit }) {
  const lastnameSignInRef = useRef();
  const firstNameSignInRef = useRef();
  const emailSignInRef = useRef();
  const passwordSignInRef = useRef();
  const confirmPasswordSignInRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const lastnameSignIn = lastnameSignInRef.current?.value.trim();
    const firstNameSign = firstNameSignInRef.current?.value.trim();
    const emailSignIn = emailSignInRef.current?.value.trim();
    const passwordSignIn = passwordSignInRef.current?.value.trim();
    const confirmPasswordSign = confirmPasswordSignInRef.current?.value.trim();

    const isTextValid =
      lastnameSignIn &&
      firstNameSign &&
      emailSignIn &&
      passwordSignIn &&
      confirmPasswordSign != "";
    const isPasswordValid = passwordSignIn.length >= 8;
    const isConfirmPasswordValid = passwordSignIn === confirmPasswordSign;

    if (isTextValid) {
      if (!isPasswordValid) {
        setCheckSubmit("passwordLength");
      } else if (!isConfirmPasswordValid) {
        setCheckSubmit("ErrorPassword");
      } else {
        setCheckSubmit("SignIn");

        lastnameSignInRef.current.value = "";
        firstNameSignInRef.current.value = "";
        emailSignInRef.current.value = "";
        passwordSignInRef.current.value = "";
        confirmPasswordSignInRef.current.value = "";
      }
    } else {
      setCheckSubmit("ErrorSignIn");
    }
  };

  return (
    <div className="section authPageDiv">
      <h2 className="h2">Inscription</h2>
      <form className="authPageForm" onSubmit={handleSubmit}>
        <LabelInput
          htmlFor="name"
          label="Nom :"
          type="text"
          id="name"
          ref={lastnameSignInRef}
        />
        <LabelInput
          htmlFor="firstName"
          label="Prénom :"
          type="text"
          id="firstName"
          ref={firstNameSignInRef}
        />
        <LabelInput
          htmlFor="email"
          label="Email :"
          type="email"
          id="email"
          ref={emailSignInRef}
        />
        <LabelInput
          htmlFor="password"
          label="Mot de passe :"
          type="password"
          id="password"
          ref={passwordSignInRef}
        />
        <LabelInput
          htmlFor="confirmPassword"
          label="Confirmer votre mot de passe :"
          type="password"
          id="confirmPassword"
          ref={confirmPasswordSignInRef}
        />
        <Button text="Se connecter" className="buttonSubmit" />
      </form>
    </div>
  );
}
