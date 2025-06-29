import React from "react";

import Header from "../structures/Header";
import BackgroundImg from "../elements/BackgroundImg";
import CardObjectif from "../home/CardObjectif";
import { dataCardsObjectif } from "../home/dataCardObjectif";
import Reviews from "../home/Reviews";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative flex flex-col gap-8">
        <BackgroundImg url="/assets/img/background/background-home.webp" />

        <section className="section lg:grid lg:grid-cols-3 lg:justify-center flex flex-col justify-between gap-8">
          <h2 className="h2 col-start-1 col-end-4">Ensemble, nous pouvons :</h2>

          {dataCardsObjectif.map(({ id, logo, title, text }) => (
            <CardObjectif key={id} logo={logo} title={title} text={text} />
          ))}
        </section>
        
          <Reviews />
      </main>
    </>
  );
}
