import React, { useEffect, useRef } from "react";

import { fetchDataPost } from "../services/fetchDataPost";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function SignInForm({ setCheckSubmit }) {
  const lastnameSignInRef = useRef();
  const firstNameSignInRef = useRef();
  const emailSignInRef = useRef();
  const passwordSignInRef = useRef();
  const confirmPasswordSignInRef = useRef();

  const handleSubmit = async (e) => {
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
        const newUser = {
          firstName: firstNameSign,
          lastName: lastnameSignIn,
          email: emailSignIn,
          password: passwordSignIn,
        };
        try {
          const data = await fetchDataPost(
            `${import.meta.env.VITE_BASE_API}/api/users/signup`,
            newUser
          );
          setCheckSubmit("SignIn");

          lastnameSignInRef.current.value = "";
          firstNameSignInRef.current.value = "";
          emailSignInRef.current.value = "";
          passwordSignInRef.current.value = "";
          confirmPasswordSignInRef.current.value = "";
        } catch (error) {
          console.error("Erreur :", error);
          setCheckSubmit("ErrorInscription");
        }
      }
    } else {
      setCheckSubmit("ErrorSubmit");
    }
  };

  return (
    <div className="section pb-5 px-5 authPageDiv">
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
