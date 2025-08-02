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
            src="/assets/img/LauraPicture.webp"
            alt="Photo de Laura"
            className="md:w-full w-40 h-full md:rounded-tl-full rounded-2xl object-cover"
          />
          <div className="w-full section pb-5 text flex flex-col justify-around items-center gap-5 rounded-tr-2xl rounded-br-2xl max-md:rounded-2xl">
            <p>
              Passionnée par l'importance de l'alimentation sur la santé, c'est
              naturellement que je me suis orientée vers des études en
              diététique.
            </p>
            <p>
              Après un Bac scientifique, je suis rentrée à l'Université
              d'Auvergne et j'ai obtenu mon DUT (Diplôme Universitaire de
              Technologie) option diététique en 2011.
            </p>
            <p>
              Depuis 9 ans j'exerce le métier de diététicienne nutritionniste.
              Durant ces années j'ai pu me perfectionner notamment dans les
              accompagnements individuels et personnalisés. Chaque être humain
              est à part, a sa propre histoire avec ses antécédents et ses
              difficultés personnelles. Ma vision de la nutrition est
              indissociable de la dimension humaine et psychologique.
            </p>
            <p>
              Aujourd'hui, je vous propose des consultations au cabinet ou à
              distance pour vous transmettre mes connaissances en nutrition, et
              vous apporter toujours de nouvelles solutions pour atteindre vos
              objectifs personnels!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
