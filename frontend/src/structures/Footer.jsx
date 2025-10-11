import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-8 px-5 md:grid md:grid-cols-2 flex flex-wrap justify-around gap-8 bg-white">
      <article className="flex flex-col gap-6">
        <h2 className="h2">Contactez-moi :</h2>

        <div className="flex flex-col gap-6">
          <div className="flex gap-1.5">
            <p className="font18-600">Adresse :</p>

            <a
              href="https://www.google.com/maps/place/10+Rue+de+la+Paix,+75002+Paris/@48.8690308,2.3309502,17z/data=!4m16!1m9!3m8!1s0x47e66e31ab3c3753:0x7228ae88d596524!2s10+Rue+de+la+Paix,+75002+Paris!3b1!8m2!3d48.8689443!4d2.3312533!10e5!16s%2Fg%2F11bw3x7ccr!3m5!1s0x47e66e31ab3c3753:0x7228ae88d596524!8m2!3d48.8689443!4d2.3312533!16s%2Fg%2F11bw3x7ccr?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="flex items-center underline text"
            >
              10 Rue de la Paix, 75002 Paris
            </a>
          </div>

          <div className="flex gap-1.5">
            <p className="font18-600">Téléphone :</p>

            <a href="tel:+33123456789" className="underline text">
              01.23.45.67.89
            </a>
          </div>

          <div className="flex gap-1.5">
            <p className="font18-600">E-mail :</p>

            <a
              href="mailto:contact@clairediet.fr"
              className="flex items-center underline text"
            >
              contact@clairediet.fr
            </a>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap justify-around gap-6">
        <h2 className="w-full h2">Suivez-moi :</h2>

        <a
          href="https://www.facebook.com/"
          className="flex items-center"
        >
          <img
            src="/assets/logo/facebook.webp"
            alt="Lien vers facebook"
            className="w-14"
          />
        </a>

        <a
          href="https://www.instagram.com/"
          className="text-black flex items-center"
        >
          <img
            src="/assets/logo/instagram.webp"
            alt="Lien vers instagram"
            className="w-14"
          />
        </a>
      </article>

      <div className="col-start-1 col-end-3 flex justify-center">
        <NavLink to="/mentions-legales" className="text font-medium underline">
          Mentions Légales
        </NavLink>
      </div>
    </footer>
  );
}
