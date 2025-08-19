import React from "react";

export default function LabelInput({
  htmlFor,
  label,
  type,
  id,
  InputRef,
  classNameInput,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={htmlFor} className="ml-2.5 font18-600">
        {label}{" "}
      </label>
      <input
        type={type}
        id={id}
        ref={InputRef}
        className={`py-2.5 px-5 inputButton insideInput ${classNameInput}`}
      />
    </div>
  );
}
