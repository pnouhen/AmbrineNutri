import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { fetchDataGet } from "../services/fetchDataGet";
import { dataCardsConsultTarif } from "../consultationTarifs/dataConsultationTarifs";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import { ConsultationTarifsCard } from "../consultationTarifs/ConsultationTarifsCard";
import Footer from "../structures/Footer";

export default function ConsultationTarifs() {
  const [firstConsult, setFirstConsult] = useState(null);
  const [followUpConsult, setFollowUpConsult] = useState(null);

  // To display the header at once if the user is logged in
  const { token, userInfo } = useContext(AuthContext);

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/prices`)
      .then((data) => {
        setFirstConsult(data[0]);
        setFollowUpConsult(data[1]);
      })
      .catch((error) => {
        // If firstConsult && followUpConsult = null, the page doesn't display
        setFirstConsult([]);
        setFollowUpConsult([]);
        console.error("Erreur de chargement", error);
      });
  }, []);

  // Display page
  if (token && !userInfo) return null;
  if (!firstConsult || !followUpConsult) return null;

  return (
    <>
      <Header />
      <main className="relative p-5 flex flex-col items-center gap-5">
        <BackgroundImg
          url="/assets/img/background/background-methodRate.webp"
          className="object-right"
        />
        {/* Stockage in file.js */}
        {dataCardsConsultTarif.map(
          ({
            data,
            title,
            duration,
            description,
            tarifs,
            type,
            priceCondition,
          }) => (
            <ConsultationTarifsCard
              key={title}
              data={data}
              title={title}
              duration={duration}
              description={description}
              tarifs={tarifs}
              price={
                type === "firstConsult"
                  ? firstConsult?.values?.price
                  : followUpConsult?.values?.price
              }
              coupleRate={
                type === "firstConsult"
                  ? firstConsult?.values?.coupleRate
                  : followUpConsult?.values?.coupleRate
              }
              priceCondition={priceCondition}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
}
