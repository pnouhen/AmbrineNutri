import React, { useState } from "react";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import ConnexionForm from "../authPage/ConnexionForm";
import SignInForm from "../authPage/SignInForm";
import Footer from "../structures/Footer";
import ModalMessage from "../components/MessageModal";

export default function AuthPage() {
  const [checkSubmit, setCheckSubmit] = useState("");

  return (
    <>
      <Header />
      <main className="relative p-5 flex flex-wrap justify-around items-center gap-5">
        <BackgroundImg
          url="/assets/img/background/background-connexion.webp"
          className="object-center"
        />
        <ConnexionForm setCheckSubmit={setCheckSubmit}/>
        <SignInForm setCheckSubmit={setCheckSubmit}/>
      </main>
      <Footer />
      {/* TODO Mapper ces éléments avec une data ainsi que les autres modales pour enlever action */}
      <ModalMessage
        action={checkSubmit === "noConnexion"}
        title="La connexion a échoué"
        onClickClose={() => setCheckSubmit("")}
        message="Email/Mot de passe incorrect"
      />
      <ModalMessage
        action={checkSubmit === "SignIn"}
        title="Inscription réussie"
        onClickClose={() => setCheckSubmit("")}
        message={
          <>
            Vous allez recevoir un mail de confirmation<br />
            <strong>
              Étant donné qu'il s'agit d'un site de démonstration, l'e-mail ne vous sera pas envoyé
            </strong>
          </>
        }
      />
      <ModalMessage
        action={checkSubmit === "ErrorSignIn"}
        title="Erreur dans le formulaire"
        onClickClose={() => setCheckSubmit("")}
        message="Tous les champs doivent être remplis"
      />
      <ModalMessage
        action={checkSubmit === "passwordLength"}
        title="Erreur dans le formulaire"
        onClickClose={() => setCheckSubmit("")}
        message="Le mot de passe doit contenir au minimun 8 caractères"
      />
      <ModalMessage
        action={checkSubmit === "ErrorPassword"}
        title="Erreur dans le formulaire"
        onClickClose={() => setCheckSubmit("")}
        message="Les mots de passe doivent être identique"
      />
    </>
  );
}
