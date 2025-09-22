import React, { useEffect, useRef } from "react";
import ModalClose from "./ModalClose";
import { dataModalMeassage } from "./dataModalMeassage";

export default function ModalMessage({
  action,
  onClickClose,
  classNameValidation,
  onClickValidate,
}) {
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (action) {
      // sauvegarder l'élément qui avait le focus
      lastFocusedRef.current = document.activeElement;
      // focus sur la modal
      modalRef.current?.focus();
    } else {
      // restaurer le focus à l'élément précédent
      lastFocusedRef.current?.focus();
    }
  }, [action]);

  const onEscapeClose = (e) => {
    if (e.key === "Escape") {
      onClickClose();
    }
  };

  if (!action) return null;

  const messageModal = dataModalMeassage.filter(
    (message) => message.action === action
  );

  return (
    <div
      ref={modalRef}
      tabIndex={-1} // focusable uniquement par JS
      onClick={onClickClose}
      onKeyDown={onEscapeClose}
      className="z-10 modal"
    >
      <div
        className="modalContainer w-96 flex flex-col justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalClose onClick={onClickClose} />
        <h3 className="h3 text-center">{messageModal[0].title}</h3>
        {typeof messageModal[0].message === "string" &&
        messageModal[0].message.includes("<") ? (
          <p
            className="text text-center"
            dangerouslySetInnerHTML={{ __html: messageModal[0].message }}
          ></p>
        ) : (
          <p className="text text-center">{messageModal[0].message}</p>
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
