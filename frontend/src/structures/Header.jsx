import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavItem from "../header/NavItem";
import { fetchDataGetUser } from "../services/fetchDataGetUser";

export default function Header() {
  const [menuBurger, setMenuBurger] = useState(false);
  const [compteActive, setCompteActive] = useState(false);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const location = useLocation();
  const panierActive = location.pathname === "/panier";
  const navigate = useNavigate();

  const onClickCompte = () => {
    setCompteActive(!compteActive);
  };

  const onMouseEnterCompte = () => {
    setCompteActive(true);
  };

  const onMouseLeaveCompte = () => {
    setCompteActive(false);
  };

  if (menuBurger) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    setToken(savedToken || "");
    if(token !== "")
    fetchDataGetUser(`${import.meta.env.VITE_BASE_API}/api/users/me`)
      .then((user) => setUserInfo(user))
      .catch((error) => console.error("Erreur lors du chargement", error));
  }, []);

  const removeToken = () => {
    sessionStorage.removeItem("token");
    setCompteActive(false);
    if (panierActive) {
      navigate(-1);
    }
    setToken("");
  };

  return (
    <header className="relative flex gap-4 px-8 py-2.5 bg-white-300">
      <img
        src="/assets/logo/logo.webp"
        alt="Logo de Laura Diététique"
        className="md:h-36 h-16 md:w-20 w-8 object-contain"
      />

      <div className="w-full flex flex-col lg:gap-5">
        <div className="h-full flex flex-col justify-around">
          <h1 className="h1">Laura diététique</h1>

          <p className="md:mr-0 mr-3.5 ls:text-2xl md:text-xl text-sm font-header">
            A l'écoute pour des conseils de qualité et personnalisés
          </p>
        </div>

        <nav
          className={`${
            menuBurger === false
              ? ""
              : "max-lg:h-[100vh] max-lg:w-[100vw] max-lg:bg-white"
          } max-lg:absolute max-lg:right-1/2 max-lg:left-0 max-lg:z-50 max-lg:px-8 md:mx-2.5 max-lg:w-full  max-lg:flex max-lg:flex-col max-lg:items-end max-lg:gap-14`}
        >
          {" "}
          <div className="lg:hidden absolute right-4 top-0 translate-y-1/2 w-6 flex justify-center">
            <i
              className={`fa-solid ${
                menuBurger === true ? "fa-xmark" : "fa-bars "
              } text-2xl cursor-pointer text-end`}
              onClick={() => setMenuBurger(!menuBurger)}
            ></i>
          </div>
          <ul
            className={`max-lg:absolute left-0 right-0 top-16 max-lg:px-5 flex md:justify-end md:gap-1 gap-4 list-none ${
              menuBurger === false ? "max-lg:hidden" : "w-full flex flex-col"
            }`}
          >
            <NavItem
              to=""
              className="navItem-padding navItem-rounded"
              text="Accueil"
            />

            <NavItem
              to="qui-suis-je"
              className="navItem-padding navItem-rounded"
              text=" Qui suis-je ?"
            />

            <NavItem
              to="consultations-et-tarifs"
              className="navItem-padding navItem-rounded"
              text="Consultations et Tarifs"
            />

            <li className="navLi">
              <a
                className="navItem navItem-padding navItem-rounded bg-green-100"
                href="https://user.clicrdv.com/Laura-Gentes"
                target="_blank"
                rel="nomenuBurgerer noreferrer"
              >
                Prendre rendez-vous
              </a>
            </li>

            <NavItem
              to="recettes"
              className="navItem-padding navItem-rounded"
              text="Recettes"
            />

            {token !== "" ? (
              <li
                className={`navItem relative min-w-[8.75rem] ${
                  compteActive ? "rounded-t-[1.25rem]" : "navItem-rounded"
                } ${panierActive ? "bg-mustard" : "bg-green-100"}`}
                onMouseEnter={onMouseEnterCompte}
                onMouseLeave={onMouseLeaveCompte}
              >
                <div
                  className="navItem-padding relative w-full z-10 flex justify-center gap-2 cursor-pointer "
                  onClick={onClickCompte}
                >
                 {userInfo?.firstName}
                  <i
                    className={`fa-solid fa-chevron-down absolute top-1/2 -translate-y-1/2 right-5 ${
                      compteActive ? "rotate-180 mt-1" : "rotate-360"
                    }`}
                  ></i>
                </div>

                <ul
                  className={`absolute w-full transition-all ${
                    compteActive
                      ? "z-10 -bottom-22"
                      : "-z-10 bottom-0 opacity-0"
                  }`}
                >
                  <NavItem
                    to="panier"
                    className="navItem-padding"
                    text="Panier"
                  />

                  <li>
                    <button
                      className="navItem navLi navItem-padding w-full rounded-b-[1.25rem] bg-green-100 cursor-pointer"
                      onClick={removeToken}
                    >
                      Deconnexion
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <NavItem
                to="se-connecter"
                className="navItem-padding navItem-rounded"
                text="Se connecter"
              />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
