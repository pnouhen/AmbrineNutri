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
  // Price unit
  const euroNote = "€*";

  return (
    <article className="section sectionConsultationTarifs">
      <h2 className="h2">{title}</h2>

      {/* The condition allow you to adapt the map according to the desired elements */}
      {duration != "" && (
        <div className="displayFlex5px  items-center">
          <h3 className="h3">{duration == "" ? "" : "Durée :"}</h3>

          <p className="text">{duration}</p>
        </div>
      )}

      <div>
        <h3 className="h3">Description :</h3>

        <p
          className="text"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>

      {/* The condition allow you to adapt the map according to the desired elements */}
      {tarifs === true && (
        <>
          <div className="displayFlex5px items-center">
            <h3 className="h3">Tarif :</h3>

            <p className="text">
              {price ? price : " - "}
              {euroNote}
            </p>
          </div>

          <div className="displayFlex5px items-center">
            <h3 className="h3">Tarif en couple :</h3>

            <p className="text">
              {coupleRate ? coupleRate : " - "}
              {euroNote}
            </p>
          </div>
        </>
      )}

      {/* The condition allow you to adapt the map according to the desired elements */}
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
