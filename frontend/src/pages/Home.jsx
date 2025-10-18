import React, { useState, useEffect } from "react";

import { fetchDataGet } from "../services/fetchDataGet";

import { dataCardsObjectif } from "../home/dataCardObjectif";
import { toggleOverflow } from "../services/toggleOverflow";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import CardObjectif from "../home/CardObjectif";
import Reviews from "../home/Reviews";
import Footer from "../structures/Footer";
import SubmitReview from "../home/SubmitReview";
import ModalMessage from "../Modals/MessageModal";
import Loader from "../components/Loader";

export default function Home() {
  const [reviews, setReviews] = useState(null);
  const [checkSubmit, setCheckSubmit] = useState("");

  // Get rewiews here for update reviews after post
  useEffect(() => {
    if (!reviews)
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/reviews`, "reviews")
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          // If reviews = null, the page doesn't display
          setReviews([]);
          console.error("Erreur de chargement", error);
        });
  }, []);

  // Sort review by most recent date
  const sortedReviews = React.useMemo(() => {
    if (reviews)
      return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [reviews]);

  // ModalMessage is active, stop Overflow
  toggleOverflow(checkSubmit !== "");

  return (
    <>
      <Header />

      <Loader condition={reviews} />

      {reviews && (
        <>
          <main className="relative py-5 flex flex-col gap-8 overflow-hidden">
            <BackgroundImg url="/assets/img/background/background-home.webp" />

            <section className="section pb-5 px-5 grid md:grid-cols-3 grid-cols-2 justify-center gap-8">
              <h2 className="h2 col-start-1 md:col-end-4 col-end-3">
                Ensemble, nous pouvons :
              </h2>

              {/* Stockage in file.js */}
              {dataCardsObjectif.map(({ id, logo, title, text }) => (
                <CardObjectif key={id} logo={logo} title={title} text={text} />
              ))}
            </section>

            <Reviews reviews={sortedReviews} />

            <SubmitReview
              setCheckSubmit={setCheckSubmit}
              setReviews={setReviews}
            />
          </main>

          <Footer />

          <ModalMessage
            action={checkSubmit}
            onClickClose={() => setCheckSubmit("")}
          />
        </>
      )}
    </>
  );
}
