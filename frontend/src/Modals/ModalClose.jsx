import React from "react";

export default function ModalClose({ onClick }) {
  return (
    <i
      onClick={onClick}
      className="fa-solid fa-xmark absolute z-50 right-2.5 top-2.5 text-xl text-black cursor-pointer"
    ></i>
  );
}
