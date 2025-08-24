import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { redirectAfterLogin } from "../components/redirectAfterLogin";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import ConnexionForm from "../authPage/ConnexionForm";
import SignInForm from "../authPage/SignInForm";
import Footer from "../structures/Footer";
import ModalMessage from "../Modals/MessageModal";

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation();

  const [checkSubmit, setCheckSubmit] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if(token) redirectAfterLogin(navigate, location)
  }, [])

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
