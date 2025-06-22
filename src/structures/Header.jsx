import React from "react";
import { useState } from "react";

export default function Header() {
  return (
    <header className="flex gap-4 px-8 py-2.5 bg-white">
      <img src="/assets/logo/logo.webp" alt="Logo de Laura Diététique" className="h-36 w-20 object-contain"/>
      <div className="w-full flex flex-col gap-5">
        <div className="h-full flex flex-col justify-around">
          <h1 className="h1">Laura diététique</h1>
          <p>A l'écoute pour des conseils de qualité et personnalisés</p>
        </div>

        <nav className="mr-2.5">
          {/* Icone qui ouvre/ferme le menu en mobile */}
          <i className="lg:hidden block absolute top-6 right-5 text-xl fa-solid fa-bars"></i>
          <ul className="flex justify-end gap-4 list-none">
            {/* <HeaderNavItem to="" text="Accueil" />
            <HeaderNavItem to="qui-suis-je" text=" Qui suis-je ?" />
            <HeaderNavItem to="consultations-et-tarifs" text="Consultations et Tarifs" /> */}
            <li>
              <a
                className="appointment"
                href="https://user.clicrdv.com/Laura-Gentes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </li>
            {/* <HeaderNavItem to="recettes" text="Recettes" />
            <HeaderNavItem to="se-connecter" text="Se connecter" /> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
