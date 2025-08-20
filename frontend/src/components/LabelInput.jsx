import React from "react";

export default function LabelInput({
  htmlFor,
  label,
  type,
  id,
  value,
  InputRef,
  classNameInput,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="ml-2.5 font18-600">
        {label}{" "}
      </label>
      <input
        type={type}
        id={id}
        defaultValue={value}
        ref={InputRef}
        className={`py-2.5 px-5 inputButton insideInput ${classNameInput}`}
      />
    </div>
  );
}
