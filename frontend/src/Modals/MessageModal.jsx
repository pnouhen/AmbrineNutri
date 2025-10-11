import React, { useEffect, useRef } from "react";
import ModalClose from "./ModalClose";
import { dataModalMessage } from "./dataModalMessage";

export default function ModalMessage({
  action,
  onClickClose,
  classNameValidation,
  onClickValidate,
}) {
  // For the controle with keydown
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);
  useEffect(() => {
    if (action) {
      // Save the element that had focus
      lastFocusedRef.current = document.activeElement;
      // Focus in the modal
      modalRef.current?.focus();
    } else {
      // Restore focus to the previous element
      lastFocusedRef.current?.focus();
    }
  }, [action]);
  const onEscapeClose = (e) => {
    if (e.key === "Escape") {
      onClickClose();
    }
  };

  // Action is the message to display
  if (!action) return null;

  // All the messages are stocked in files.js
  const messageModal = dataModalMessage.filter(
    (message) => message.action === action
  );

  return (
    <div
      ref={modalRef}
      tabIndex={-1} // Give priority to the modal
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

        {/* To display line breaks */}
        {typeof messageModal[0].message === "string" &&
        messageModal[0].message.includes("<") ? (
          <p
            className="text text-center"
            dangerouslySetInnerHTML={{ __html: messageModal[0].message }}
          ></p>
        ) : (
          <p className="text text-center">{messageModal[0].message}</p>
        )}

        {/* For confirm the delete in back-end */}
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
