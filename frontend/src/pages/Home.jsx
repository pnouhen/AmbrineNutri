import React, { useState, useEffect } from "react";

import { fetchDataGet } from "../services/fetchDataGet";
import { stopOverflow } from "../services/stopOverflow";

import { dataCardsObjectif } from "../../public/data/dataCardObjectif";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import CardObjectif from "../home/CardObjectif";
import Reviews from "../home/Reviews";
import Footer from "../structures/Footer";
import SubmitReview from "../home/SubmitReview";
import ModalMessage from "../components/MessageModal";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [checkSubmit, setCheckSubmit] = useState("");

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/reviews`)
      .then((data) => setReviews(data))
      .catch((error) => console.error("Erreur de chargement", error));
  }, []);

  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  stopOverflow(checkSubmit);

  return (
    <>
      <Header />

      <main className="relative py-5 flex flex-col gap-8 overflow-hidden">
        <BackgroundImg
          url="/assets/img/background/background-home.webp"
          className="object-top"
        />

        <section className="section grid md:grid-cols-3 grid-cols-2 justify-center gap-8">
          <h2 className="h2 col-start-1 md:col-end-4 col-end-3">
            Ensemble, nous pouvons :
          </h2>

          {dataCardsObjectif.map(({ id, logo, title, text }) => (
            <CardObjectif key={id} logo={logo} title={title} text={text} />
          ))}
        </section>

        <Reviews reviews={reviews} />

        <SubmitReview setCheckSubmit={setCheckSubmit} setReviews={setReviews} />
      </main>
      <Footer />

      <ModalMessage
        action={checkSubmit === true}
        title="Avis déposé"
        onClickClose={() => setCheckSubmit("")}
        message={
          <>
            Merci pour votre retour !<br />
            <strong>
              Étant donné qu'il s'agit d'un site de démonstration, votre
              commentaire sera supprimé dans 10 minutes.
            </strong>
          </>
        }
        dangerouslySetInnerHTML={true}
      />

      <ModalMessage
        action={checkSubmit === false}
        title="Erreur de validation"
        onClickClose={() => setCheckSubmit("")}
        message="Le formulaire est incomplet"
      />
    </>
  );
}
