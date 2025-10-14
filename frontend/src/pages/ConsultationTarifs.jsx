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
  const [firstConsult, setFirstConsult] = useState(() => {
    const prices = JSON.parse(sessionStorage.getItem("prices"));

    if (!prices) return null;
    return prices[0];
  });
  const [followUpConsult, setFollowUpConsult] = useState(() => {
    const prices = JSON.parse(sessionStorage.getItem("prices"));

    if (!prices) return null;
    return prices[1];
  });
  const [messageModal, setMessageModal] = useState("");

  // To display the header at once if the user is logged in
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!firstConsult || !followUpConsult)
      fetchDataGet(`${import.meta.env.VITE_BASE_API}/api/prices`, "prices")
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

    const priceFirstConsult = priceFirstConsultRef.current.value;
    const coupleRateFirstConsult = coupleRateFirstConsultRef.current.value;
    const priceFollowUpConsult = priceFollowUpConsultRef.current.value;
    const coupleRateFollowUpConsult =
      coupleRateFollowUpConsultRef.current.value;

    const newPrices = [
      {
        _id: 1,
        values: {
          price: priceFirstConsult,
          coupleRate: coupleRateFirstConsult,
        },
      },
      {
        _id: 2,
        values: {
          price: priceFollowUpConsult,
          coupleRate: coupleRateFollowUpConsult,
        },
      },
    ];

    const isPricesValid =
      priceFirstConsult > 0 &&
      coupleRateFirstConsult > 0 &&
      priceFollowUpConsult > 0 &&
      coupleRateFollowUpConsult > 0;

    if (isPricesValid) {
      setFirstConsult(newPrices[0]);
      setFollowUpConsult(newPrices[1]);
      setMessageModal("UpdateTrue");
    } else {
      setMessageModal("UpdateFalse");
    }
  };

  // Display page
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
