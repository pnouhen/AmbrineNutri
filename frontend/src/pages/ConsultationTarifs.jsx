import React from "react";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import { dataCardsConsultTarif } from "../consultationTarifs/dataConsultationTarifs";
import { ConsultationTarifsCard } from "../consultationTarifs/ConsultationTarifsCard";
import Footer from "../structures/Footer";

export default function ConsultationTarifs() {
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
            price,
            coupleRate,
            priceCondition,
          }) => (
            <ConsultationTarifsCard
              key={title}
              data={data}
              title={title}
              duration={duration}
              description={description}
              tarifs={tarifs}
              price={price}
              coupleRate={coupleRate}
              priceCondition={priceCondition}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
}
