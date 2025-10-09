import React, { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { fetchDataGet } from "../services/fetchDataGet";
import { fetchDataUserPut } from "../services/fetchDataUserPut";

import { dataCardsConsultTarif } from "../consultationTarifs/dataConsultationTarifs";

import Header from "../structures/Header";
import BackgroundImg from "../components/BackgroundImg";
import ChangePrices from "../admin/ChangePrices";
import { ConsultationTarifsCard } from "../consultationTarifs/ConsultationTarifsCard";
import Footer from "../structures/Footer";
import ModalMessage from "../Modals/MessageModal";

export default function ConsultationTarifs() {
  const [firstConsult, setFirstConsult] = useState(null);
  const [followUpConsult, setFollowUpConsult] = useState(null);
  const [messageModal, setMessageModal] = useState("");

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

  // Change prices
  const priceFirstConsultRef = useRef();
  const coupleRateFirstConsultRef = useRef();
  const priceFollowUpConsultRef = useRef();
  const coupleRateFollowUpConsultRef = useRef();

  const changePrices = (e) => {
    e.preventDefault();

    const body = [
      {
        _id: firstConsult._id,
        values: {
          price: priceFirstConsultRef.current.value,
          coupleRate: coupleRateFirstConsultRef.current.value,
        },
      },
      {
        _id: followUpConsult._id,
        values: {
          price: priceFollowUpConsultRef.current.value,
          coupleRate: coupleRateFollowUpConsultRef.current.value,
        },
      },
    ];

    fetchDataUserPut(
      `${import.meta.env.VITE_BASE_API}/api/users/me/admin/changePrices`,
      body
    )
      .then((newPrices) => {
        setFirstConsult(newPrices[0]);
        setFollowUpConsult(newPrices[1]);
        setMessageModal("UpdateTrue");
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setMessageModal("UpdateFalse");
      });
    console.log("ok");
  };

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
        {userInfo?.role === "admin" && (
          <ChangePrices
            dataCardsConsultTarif={dataCardsConsultTarif}
            firstConsult={firstConsult}
            followUpConsult={followUpConsult}
            priceFirstConsultRef={priceFirstConsultRef}
            coupleRateFirstConsultRef={coupleRateFirstConsultRef}
            priceFollowUpConsultRef={priceFollowUpConsultRef}
            coupleRateFollowUpConsultRef={coupleRateFollowUpConsultRef}
            changePrices={changePrices}
          />
        )}
        {/* Stockage in file.js */}
        {dataCardsConsultTarif.map(
          ({ title, duration, description, tarifs, type, priceCondition }) => (
            <ConsultationTarifsCard
              key={title}
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

      <ModalMessage
        action={messageModal}
        onClickClose={() => setMessageModal("")}
      />
    </>
  );
}
