import React from "react";

const LabelInput = React.forwardRef(
  (
    {
      classNameLabelInput,
      htmlFor,
      label,
      type,
      id,
      value,
      classNameInput,
      onChange,
      maxLength,
      autoComplete
    },
    ref
  ) => {
    return (
      <div className={`labelInput ${classNameLabelInput}`}>
        <label htmlFor={htmlFor} className="label font18-600">
          {label}
        </label>
        <input
          type={type}
          id={id}
          defaultValue={value}
          ref={ref}
          className={`py-2.5 px-5 inputButton insideInput ${classNameInput}`}
          onChange={onChange}
          maxLength={maxLength === null ? "50" : maxLength}
          autoComplete={autoComplete}
        />
      </div>
    );
  }
);

export default LabelInput;
