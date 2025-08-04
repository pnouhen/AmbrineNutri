import React from "react";

export default function LabelInput({
  htmlFor,
  label,
  value,
  onChange,
  type,
  id,
  InputRef,
  classNameInput
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={htmlFor} className="ml-2.5 font18-600">{label} </label>
      <input type={type} id={id} ref={InputRef} value={value} onChange={onChange} className={`py-2.5 px-5 inputButton insideInput ${classNameInput}`}/>
    </div>
  );
}