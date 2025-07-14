import React from "react";

import ModalClose from "./ModalClose";

export default function ModalMessage({
  action,
  onClickClose,
  title,
  message,
  classNameValidation,
  onClickValidate
}) {
  if (!action) return null;

  return (
    <div onClick={onClickClose} className="z-10 modal">
      <div className="modalContainer w-96 rounded-sm flex flex-col justify-center g-2.5" onClick={(e) => e.stopPropagation()}>

        <ModalClose onClick={onClickClose} />
        <h3 className="h3">{title}</h3>
        <p className="p-16 text-center">{message}</p>
        <div
          className={
            classNameValidation === true ? "flex justify-around" : "hidden"
          }
        >
          <button className="w-24 cursor-pointer p-2.5 buttonSubmit" onClick={onClickValidate}>Oui</button>
          <button className="w-24 cursor-pointer p-2.5 buttonSubmit" onClick={onClickClose}>Non</button>
        </div>
      </div>
    </div>
  );
}
