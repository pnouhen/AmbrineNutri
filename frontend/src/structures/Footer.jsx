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
              href="https://www.google.com/maps/place/Laura+Di%C3%A9t%C3%A9tique/@45.8506005,1.2463868,20.5z/data=!4m15!1m8!3m7!1s0x47fecb2d76075669:0x8895982de98b07fb!2s21+Rue+V%C3%A9drines,+87100+Limoges!3b1!8m2!3d45.8505717!4d1.2465095!16s%2Fg%2F11c18qsfnj!3m5!1s0x47fecb32b39cb9f9:0xb7bb1b7ae0a2e9ec!8m2!3d45.8506088!4d1.246543!16s%2Fg%2F11cs04h0nd?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="flex items-center underline text"
            >
              21 Rue Védrines, 87100 Limoges
            </a>
          </div>

          <div className="flex gap-1.5">
            <p className="font18-600">Téléphone :</p>

            <a href="tel:+33675669604" className="underline text">
              06.75.66.96.04
            </a>
          </div>

          <div className="flex gap-1.5">
            <p className="font18-600">E-mail :</p>

            <a
              href="mailto:lauradietetique@gmail.com"
              className="flex items-center underline text"
            >
              lauradietetique@gmail.com
            </a>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap justify-around gap-6">
        <h2 className="w-full h2">Suivez-moi :</h2>

        <a
          href="https://www.facebook.com/Lauradietetique/"
          className="flex items-center"
        >
          <img
            src="/assets/logo/facebook.webp"
            alt="Lien vers facebook"
            className="w-14"
          />
        </a>

        <a
          href="https://www.instagram.com/dietandmom/"
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
