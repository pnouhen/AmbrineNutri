import React, { useRef, useState } from "react";

import ModalRecipeList from "./ModalRecipeList";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";

export default function ModalRecipeAddDetails({
  classNameContainer,
  getFormHeight,
  classNameDivLabel,
  htmlFor,
  id,
  label,
  details,
  setDetails,
  title,
  steps,
}) {
  const [newDetail, setNewDetail] = useState("");
  const [submitNewDetail, setSubmitNewDetail] = useState(false);

  const newDetailRef = useRef();

  const addDetail = () => {
    if (newDetail.trim()) {
      setDetails((prev) => [...prev, newDetail.trim()]);
      setSubmitNewDetail(false);
      setNewDetail("");
      newDetailRef.current.value = "";
    } else {
      setSubmitNewDetail(true);
    }
  };

  return (
    <div
      className={`max-md:px-5 md:px-2 w-full ${classNameContainer} flex flex-col gap-x-5 overflow-auto`}
      style={{ height: getFormHeight() }}
    >
      <div
        className={`md:pr-5 py-5 w-full flex flex-col gap-5 ${classNameDivLabel} border-gray-400`}
      >
        <LabelInput
          classNameLabelInput="w-full"
          htmlFor={htmlFor}
          label={label}
          type="text"
          id={id}
          onChange={(e) => setNewDetail(e.target.value)}
          ref={newDetailRef}
        />

        <div className="col-start-1 col-end-3">
          <Button
            text="+ Ajoutez"
            className={`h3 w-full h-12 ${
              newDetail.trim() !== "" && "buttonSubmit cursor-pointer"
            }`}
            onClick={addDetail}
          />
          {submitNewDetail && newDetail.trim() === "" && (
            <p className="pt-5 text text-red-600">
              Tous les champs ne sont pas remplis
            </p>
          )}
        </div>
      </div>

      <ModalRecipeList
        setDelete={setDetails}
        data={details}
        title={title}
        steps={steps}
      />
    </div>
  );
}
