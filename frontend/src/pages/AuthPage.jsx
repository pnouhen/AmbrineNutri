import React, { useEffect, useContext, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { redirectAfterLogin } from "../services/redirectAfterLogin";
import { AuthContext } from "../contexts/AuthContext";
import { toggleOverflow } from "../services/toggleOverflow";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import ConnexionForm from "../authPage/ConnexionForm";
import SignInForm from "../authPage/SignInForm";
import Footer from "../structures/Footer";
import ModalMessage from "../Modals/MessageModal";
import ScrollToTop from "../services/ScrollToTop";

export default function AuthPage() {
  const [checkSubmit, setCheckSubmit] = useState("TemporaryDataNotice");
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useContext(AuthContext);

  const sectionRef = useRef();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      redirectAfterLogin(navigate, location);
    }
  }, [token]);

  // ModalMessage is active, stop Overflow
  toggleOverflow(checkSubmit !== "");

  return (
    <>
      <Header />

      <ScrollToTop targetRef={sectionRef} />

      <main
        className="relative p-5 flex flex-wrap justify-around items-center gap-5"
        ref={sectionRef}
      >
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
