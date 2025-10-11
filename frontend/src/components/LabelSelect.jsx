import React, { useEffect, useState, useRef } from "react";
import { toggleOverflow } from "../services/toggleOverflow";

export default function LabelSelect({
  classNameLabelSelect,
  title,
  newOption,
  setOption,
  data,
}) {
  const [isSelect, setIsSelect] = useState(false);
  const [focusedOption, setFocusedOption] = useState("")

  const mainButtonRef = useRef(null);
const containerRef = useRef(null);

  // Reset newOption et change overflow of body
  useEffect(() => {
    toggleOverflow(isSelect);

    if (!isSelect && focusedOption === newOption) {
      mainButtonRef.current.focus();
    }
  }, [isSelect]);

  const onClickOption = (e, option) => {
    e.stopPropagation();
    setOption(option);
    setIsSelect(false);
  };

  const onMouseEnter = (e, option) => {
    setFocusedOption(option);
  };

  const onKeyDownButton = (e) => {
    if (e.key === "Tab" && isSelect) {
      setOption(data[0]);
      setFocusedOption(data[0])
    }
    if (e.key === "Escape") setIsSelect(false);
  };

  const onKeyDownOption = (e, index) => {
    if (e.key === "Tab" && isSelect) {
      if (index < data.length - 1) {
        setOption(data[index + 1]);
        setFocusedOption(data[index + 1])
      } else {
        setIsSelect(false);
      }
    }
    if (e.key === "Escape") setIsSelect(false);
  };

  // Close the selector if clicked outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSelect(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={`labelInput ${classNameLabelSelect}`}>
      <p className="label font18-600">{title}</p>
      <div
        className={`relative py-2.5 px-5 insideInput flex items-center justify-between gap-5 cursor-pointer ${
          isSelect ? "rounded-t-xl shadow-inputButton" : "inputButton"
        }`}
        onClick={() => setIsSelect(!isSelect)}
      >
        <button
          ref={mainButtonRef} // Associe le ref ici
          className="cursor-pointer"
          onKeyDown={onKeyDownButton}
        >
          {newOption}
        </button>
        <i
          className={`fa-solid fa-chevron-${
            isSelect ? "up" : "down"
          } h3 cursor-pointer`}
        ></i>

        <ul
          className={`absolute top-11 left-0 w-full flex flex-col gap-2.5 ${
            isSelect
              ? "z-10 opacity-100 rounded-b-xl shadow-inputButton insideInput"
              : "-z-10 opacity-0"
          }`}
        >
          {data?.map((option, index) => (
            <li
              key={index}
              className={`py-1 px-2.5 ${
                focusedOption === option ? "bg-blue-600 text-white-200" : ""
              }`}
              onClick={(e) => onClickOption(e, option)}
              onMouseEnter={(e) => onMouseEnter(e, option)}
              onKeyDown={(e) => onKeyDownOption(e, index)}
            >
              <button tabIndex={isSelect ? 0 : -1}>{option}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
