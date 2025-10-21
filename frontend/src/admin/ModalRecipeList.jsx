import React from "react";

export default function ModalRecipeList({
  setDelete,
  data,
  title,
  ingredient,
  steps,
}) {
  const deleteElement = (elDelete) => {
    const filterElements = data.filter((el) => el !== elDelete);
    setDelete(filterElements);
  };

  return (
    <div className="pr-5 py-5 min-h-40 md:overflow-auto">
      <p className="font18-600 mb-5">{title}</p>

      <ul className="flex flex-col gap-5">
        {data.map((el, index) => (
          <li key={index} className="w-full flex justify-between">
            <p className="break-words">
              {ingredient ? (
                <>
                  {el.quantity}
                  {el.dosage?.length <= 2 ? "" : " "}
                  {el.dosage} {el.name}
                </>
              ) : steps ? (
                <>
                  {index + 1}. {el}
                </>
              ) : (
                el
              )}
            </p>

            <i
              className="fa-solid fa-trash mr-5 cursor-pointer"
              onClick={() => deleteElement(el)}
              onKeyDown={(e) => {
                if (e.key === "Enter") deleteElement(el);
              }}
              tabIndex={0}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}
