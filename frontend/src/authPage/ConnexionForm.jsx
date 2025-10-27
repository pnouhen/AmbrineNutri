import React, { useRef, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { redirectAfterLogin } from "../services/redirectAfterLogin";
import { AuthContext } from "../contexts/AuthContext";
import { fetchDataPost } from "../services/fetchDataPost";

import Button from "../components/Button";

export default function ConnexionForm({ setCheckSubmit }) {
  const [email, setEmail] = useState("user@user.fr");
  const [isSelect, setIsSelect] = useState(false);
  const [focusedOption, setFocusedOption] = useState("");
  const containerRef = useRef(null);

  const passwordConnexionRef = useRef();

  const dataEmail = ["user@user.fr", "admin@admin.fr"];

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const mainButtonRef = useRef(null);

  // Connexion account
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailConnexion = email.trim();
    const passwordConnexion = passwordConnexionRef.current?.value.trim();

    if (!emailConnexion || !passwordConnexion) {
      setCheckSubmit("ErrorSubmit");
      return;
    }

    const connexion = {
      email: emailConnexion,
      password: passwordConnexion,
    };

    try {
      const data = await fetchDataPost(
        `${import.meta.env.VITE_BASE_API}/api/users/login`,
        connexion
      );

      login(data.token, data.user);
      redirectAfterLogin(navigate, location);
    } catch (error) {
      console.error("Erreur:", error);
      setCheckSubmit("noConnexionAuthPage");
    }
  };

  // Interaction with input email
  const onClickOption = (e, option) => {
    e.stopPropagation();
    setEmail(option);
    setIsSelect(false);
  };

  const onKeyDownOption = (e, index) => {
    if (e.key === "Tab" && isSelect) {
      if (index < dataEmail.length - 1) {
        setEmail(dataEmail[index + 1]);
        setFocusedOption(dataEmail[index + 1]);
      } else {
        setIsSelect(false);
      }
    }
    if (e.key === "Escape") setIsSelect(false);
  };

  // Close the selector if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="section pb-5 px-5 authPageDiv">
      <h2 className="h2">Connexion</h2>

      <form className="authPageForm" onSubmit={handleSubmit} ref={containerRef}>
        <div className="labelInput relative">
          <label htmlFor="emailConnexion" className="label font18-600">
            E-mail :
          </label>
          <input
            type="email"
            id="emailConnexion"
            className={`relative py-2.5 px-5 insideInput ${
              isSelect ? "rounded-t-xl shadow-inputButton" : "inputButton"
            }`}
            maxLength={160}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <i
            className={`fa-solid fa-chevron-${
              isSelect ? "up" : "down"
            } h3 absolute lg:top-11 md:top-10 top-9 right-2.5 cursor-pointer`}
            onClick={() => setIsSelect(!isSelect)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIsSelect(!isSelect)}
          ></i>

          <ul
            className={`absolute z-50 lg:top-[4.75rem] md:top-17 top-15 py-2.5 px-2.5 left-0 w-full lg:max-h-44 max-h-20 flex-col overflow-auto ${
              isSelect
                ? "z-10 flex shadow-inputButton insideInput"
                : "-z-10 hidden"
            }`}
          >
            {dataEmail.map((option, index) => (
              <li
                key={index}
                className={`py-1 px-2.5 ${
                  focusedOption === option ? "bg-blue-600 text-white-200" : ""
                }`}
              >
                <button
                  type="button"
                  className="text cursor-pointer"
                  onClick={(e) => onClickOption(e, option)}
                  onMouseEnter={() => setFocusedOption(option)}
                  onKeyDown={(e) => onKeyDownOption(e, index)}
                  ref={mainButtonRef}
                  tabIndex={isSelect ? 0 : -1}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="labelInput">
          <label htmlFor="passwordConnexion" className="label font18-600">
            Mot de passe :
          </label>
          <input
            type="password"
            id="passwordConnexion"
            ref={passwordConnexionRef}
            className="inputButton py-2.5 px-5 insideInput"
            autoComplete="off"
            maxLength={160}
            defaultValue="Kfq66jb2yBNmGk3!"
          />
        </div>

        <Button text="Se connecter" className="buttonSubmit" />
      </form>
    </div>
  );
}
