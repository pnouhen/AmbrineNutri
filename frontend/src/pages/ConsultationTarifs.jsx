import React, { useEffect, useState } from "react";

import { fetchDataGet } from "../services/fetchDataGet";
import { dataCardsConsultTarif } from "../consultationTarifs/dataConsultationTarifs";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import { ConsultationTarifsCard } from "../consultationTarifs/ConsultationTarifsCard";
import Footer from "../structures/Footer";

export default function ConsultationTarifs() {
 const [firstConsult, setFirstConsult] =useState(0)
 const [followUpConsult, setFollowUpConsult] =useState(0)

  useEffect(() => {
    fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/prices`)
    .then((data) => {
        setFirstConsult(data[0])
        setFollowUpConsult(data[1])
    }
      )
    .catch((error) => console.error("Erreur de chargement", error))
  }, [])

  return (
    <>
      <Header />
      <main className="relative p-5 flex flex-col items-center gap-5">
        <BackgroundImg url="/assets/img/background/background-methodRate.webp" className="object-right" />
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
              price={type === "firstConsult" ? firstConsult.values?.price : followUpConsult.values?.price}
              coupleRate={type === "firstConsult" ? firstConsult.values?.coupleRate : followUpConsult.values?.coupleRate}
              priceCondition={priceCondition}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
}
