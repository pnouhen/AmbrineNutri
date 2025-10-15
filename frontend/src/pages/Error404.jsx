import React, { useRef } from "react";
import Header from "../structures/Header";
import { NavLink } from "react-router-dom";
import Footer from "../structures/Footer";
import ScrollToTop from "../services/ScrollToTop";

export default function Error404() {
  const sectionRef = useRef();

  return (
    <>
      <Header />

      <ScrollToTop targetRef={sectionRef} />

      <main
        className="p-5 flex flex-1 flex-col justify-center items-center bg-gray"
        ref={sectionRef}
      >
        <section className="p-5 lg:w-7/12 md:w-10/12 w-full section flex flex-col justify-center items-center gap-5 rounded-2xl">
          <h2 className="h2 w-full text-center">Page introuvable</h2>

          <p>
            Désolé, la page que vous recherchez n’existe pas ou a été déplacée.{" "}
            <br /> Vérifiez l’adresse ou retournez à l’accueil :
          </p>

          <NavLink to="/" className="font-semibold underline">
            Accéder à la page d'accueil
          </NavLink>
        </section>
      </main>

      <Footer />
    </>
  );
}
