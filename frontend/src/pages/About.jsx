import React from "react";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import Footer from "../structures/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="relative h-full flex flex-1 items-center">
        <BackgroundImg
          url="/assets/img/background/background-about.webp"
          className="object-top"
        />

        <section className="my-10 md:grid md:grid-cols-[30%_60%] p-5 max-md:flex max-md:flex-col max-md:items-center justify-center max-md:gap-8">
          <img
            src="/assets/img/ClaireProfil.webp"
            alt="Photo de Claire"
            className="md:w-full w-40 h-full md:rounded-tl-[14rem] max-lg:rounded-2xl object-cover"
          />

          <div className="w-full section px-2 pb-5 text flex flex-col justify-around items-center gap-5 rounded-tr-2xl rounded-br-2xl max-md:rounded-2xl">
            <p>
              Depuis toujours, je suis convaincue que bien manger, c’est
              avant tout prendre soin de soi. C’est cette conviction qui m’a
              guidée vers la nutrition et m’a poussée à en faire mon métier.
            </p>

            <p>
              Après un baccalauréat scientifique, j’ai poursuivi mes études
              dans le domaine de la diététique et de la nutrition, où j’ai
              découvert toute la richesse de la relation entre alimentation,
              santé etéquilibre de vie.
            </p>

            <p>
              Aujourd’hui, j’exerce en tant que nutritionniste avec la volonté
              d’accompagner chaque personne vers une relation plussereine et
              durable avec son alimentation. J’accorde une attention particulière
              à l’écoute, à la bienveillance et à l’adaptation desconseils selon
              les besoins, le rythme et les objectifs de chacun.
            </p>

            <p>
              Je propose des consultations au cabinet ou à distance, afin devous
              aider à retrouver un équilibre alimentaire qui vous ressemble—
              sans restrictions inutiles, mais avec plaisir, compréhension
              etconfiance.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
