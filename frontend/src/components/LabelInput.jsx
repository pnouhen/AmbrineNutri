import React from "react";

export default function LabelInput({
  classNameLabelInput,
  htmlFor,
  label,
  type,
  id,
  value,
  InputRef,
  classNameInput,
  onChange,
  maxLength,
}) {
  return (
    <div className={`labelInput ${classNameLabelInput}`}>
      <label htmlFor={htmlFor} className="label font18-600">
        {label}{" "}
      </label>
      <input
        type={type}
        id={id}
        defaultValue={value}
        ref={InputRef}
        className={`py-2.5 px-5 inputButton insideInput ${classNameInput}`}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
