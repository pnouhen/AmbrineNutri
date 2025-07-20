import React from "react";

import ModalClose from "./ModalClose";
import { dataModalMeassage } from "./dataModalMeassage";

export default function ModalMessage({
  action,
  onClickClose,
  classNameValidation,
  onClickValidate,
}) {
  if (!action) return null;

  const messageModal = dataModalMeassage.filter(
    (message) => message.action === action
  );
  console.log(messageModal)
  return (
    <div onClick={onClickClose} className="z-10 modal">
      <div
        className="modalContainer w-96 rounded-lg flex flex-col justify-center g-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalClose onClick={onClickClose} />
        <h3 className="h3">{messageModal[0].title}</h3>
        {typeof messageModal[0].message === "string" && messageModal[0].message.includes("<") ? (
          <p className="p16 text-center" dangerouslySetInnerHTML={{ __html: messageModal[0].message }}></p>
        ) : (
          <p className="p16 text-center">{messageModal[0].message}</p>
        )}
        <div
          className={
            classNameValidation === true ? "flex justify-around" : "hidden"
          }
        >
          <button
            className="w-24 cursor-pointer p-2.5 buttonSubmit"
            onClick={onClickValidate}
          >
            Oui
          </button>
          <button
            className="w-24 cursor-pointer p-2.5 buttonSubmit"
            onClick={onClickClose}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
