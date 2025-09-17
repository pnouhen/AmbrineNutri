import React from "react";

export function ConsultationTarifsCard({
  title,
  duration,
  description,
  price,
  coupleRate,
  tarifs,
  priceCondition,
}) {
  // Unité de prix
  const euroNote = "€*";

  return (
    <article className="lg:w-7/12 md:w-10/12 w-full section p-5 flex flex-col gap-5 rounded-2xl opacity-0 animate-[fadeIn_0.2s_0.2s_forwards]">
      <h2 className="h2">{title}</h2>

      {/* Les conditions permettent d'adapter la carte en fonction des elements souhaités */}
      {duration != "" && (
        <div className="displayFlex5px  items-center">
          <h3 className="h3">{duration == "" ? "" : "Durée :"}</h3>
          <p className="text">{duration}</p>
        </div>
      )}
      <div className="description">
        <h3 className="h3">Description :</h3>
        <p className="text"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      {tarifs === true && (
        <>
          <div className="displayFlex5px items-center">
            <h3 className="h3">Tarif :</h3>
            <p className="text">
              {price}
              {euroNote}
            </p>
          </div>
          <div className="displayFlex5px items-center">
            <h3 className="h3">Tarif en couple :</h3>
            <p className="text">
              {coupleRate}
              {euroNote}
            </p>
          </div>
        </>
      )}
      {priceCondition === true && (
        <p className="text font-medium italic">
          *Modes de règlement: Chèques, virements ou espèces. De plus, certaines
          mutuelles prennent en charge les consultations diététiques, renseignez
          vous auprès de la vôtre. Les justificatifs nécessaires vous seront
          délivrés.
        </p>
      )}
    </article>
  );
}