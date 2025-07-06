import React from "react";

import { dataCardsObjectif } from "../../public/data/dataCardObjectif"

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import CardObjectif from "../home/CardObjectif";
import Reviews from "../home/Reviews";
import Footer from "../structures/Footer";
import SubmitReview from "../home/SubmitReview";

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative py-5 flex flex-col gap-8">
        <BackgroundImg url="/assets/img/background/background-home.webp" />

        <section className="section md:grid md:grid-cols-3 md:justify-center flex flex-col justify-between gap-8">
          <h2 className="h2 col-start-1 col-end-4">Ensemble, nous pouvons :</h2>

          {dataCardsObjectif.map(({ id, logo, title, text }) => (
            <CardObjectif key={id} logo={logo} title={title} text={text} />
          ))}
        </section>
        
          <Reviews />

          <SubmitReview/>
      </main>
      <Footer />
    </>
  );
}
