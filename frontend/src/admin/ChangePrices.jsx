import React from "react";

import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function ChangePrices({
  dataCardsConsultTarif,
  firstConsult,
  followUpConsult,
  priceFirstConsultRef,
  coupleRateFirstConsultRef,
  priceFollowUpConsultRef,
  coupleRateFollowUpConsultRef,
  changePrices
}) {
  return (
    <article className="section sectionConsultationTarifs flex flex-col gap-5">
      <h2 className="h2">Modification des tarifs</h2>
      <form action="submit" className="flex flex-col gap-5 items-center">
        {dataCardsConsultTarif.map(
          ({ title, priceCondition, type }) =>
            priceCondition && (
              <div key={title} className="w-full md:grid md:grid-cols-2 flex flex-wrap md:gap-x-2 gap-x-5 gap-y-2">
                <h3 className="h3 w-full col-start-1 col-end-3">{title}</h3>

                <LabelInput
                  classNameLabelInput="mx-auto md:w-42"
                  htmlFor={`price-${type}`}
                  label="Tarif :"
                  type="number"
                  id={`price-${type}`}
                  ref={
                    type === "firstConsult"
                      ? priceFirstConsultRef
                      : priceFollowUpConsultRef
                  }
                  value={
                    type === "firstConsult"
                      ? firstConsult?.values?.price
                      : followUpConsult?.values?.price
                  }
                />

                <LabelInput
                  classNameLabelInput="mx-auto md:w-50"
                  htmlFor={`coupleRate-${type}`}
                  label="Tarif en couple :"
                  type="number"
                  id={`coupleRate-${type}`}
                  ref={
                    type === "firstConsult"
                      ? coupleRateFirstConsultRef
                      : coupleRateFollowUpConsultRef
                  }
                  value={
                    type === "firstConsult"
                      ? firstConsult?.values?.coupleRate
                      : followUpConsult?.values?.coupleRate
                  }
                />
              </div>
            )
        )}
        <Button className="buttonSubmit w-50" text="Modifier" onClick={(e) => changePrices(e)}/>
      </form>
    </article>
  );
}
