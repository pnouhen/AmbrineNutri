import React, { useState } from "react";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import ConnexionForm from "../authPage/ConnexionForm";
import SignInForm from "../authPage/SignInForm";
import Footer from "../structures/Footer";
import ModalMessage from "../Modals/MessageModal";

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
        <ConnexionForm setCheckSubmit={setCheckSubmit} />
        <SignInForm setCheckSubmit={setCheckSubmit} />
      </main>
      <Footer />
      
      <ModalMessage
        action={checkSubmit}
        onClickClose={() => setCheckSubmit("")}
      />
    </>
  );
}
