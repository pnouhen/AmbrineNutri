import React, { useRef, useState } from "react";

import imageCompression from "browser-image-compression";

import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";
import { handleRecipeImage } from "../services/handleRecipeImage";

export default function ModalRecipeGeneral({
  getFormHeight,
  nameRecipe,
  setNameRecipe,
  categories,
  categorieSelect,
  setCategorieSelect,
  duration,
  durationSelect,
  setDurationSelect,
  vegetarian,
  vegetarianSelect,
  setVegetarianSelect,
  nameLabel,
  setNameLabel,
  setFile,
  preview,
  setPreview,
}) {
  const nameRecipeRef = useRef();

  return (
    <div
      className="py-5 w-full md:grid md:grid-cols-2 flex flex-wrap gap-5 overflow-auto"
      style={{ maxHeight: getFormHeight() }}
    >
      <div className="col-start-1 col-end-3 md:grid md:grid-cols-2 flex flex-wrap md:gap-5 gap-2">
        <LabelInput
          classNameLabelInput="mx-auto lg:w-72 md:w-64 max-md:w-60"
          htmlFor="nameRecipe"
          label="Nom de la recette :"
          type="text"
          id="nameRecipe"
          ref={nameRecipeRef}
          value={nameRecipe}
          onChange={() => setNameRecipe(nameRecipeRef.current.value.trim())}
        />

        <LabelSelect
          classNameLabelSelect="mx-auto lg:w-72 md:w-64 max-md:w-60"
          data={categories}
          title="Catégorie :"
          newOption={categorieSelect}
          setOption={setCategorieSelect}
        />

        <LabelSelect
          classNameLabelSelect="mx-auto lg:w-72 md:w-64 max-md:w-60"
          data={duration}
          title="Durée :"
          newOption={durationSelect}
          setOption={setDurationSelect}
        />

        <LabelSelect
          classNameLabelSelect="mx-auto lg:w-72 md:w-64 max-md:w-60"
          data={vegetarian}
          title="Végétarien :"
          newOption={vegetarianSelect}
          setOption={setVegetarianSelect}
        />
      </div>

      <div className="m-auto w-full">
        <p className="font18-600 mx-auto pl-2.5 lg:w-72 md:w-64 max-md:w-60">
          Ajouter une photo :
        </p>

        <div className="relative mx-auto flex flex-col justify-center items-center">
          <i className="relative fa-solid fa-image text-green-200 md:text-[13rem] text-[10rem]"></i>

          <label
            htmlFor="addImg"
            className="absolute z-10 p-2.5 md:w-44 text-center inputButton insideInput truncate"
          >
            {nameLabel}
          </label>

          <input
            id="addImg"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="absolute z-10 top-1/2 left-1/2 -translate-1/2 w-52 md:h-[11.5rem] h-36 opacity-0 cursor-pointer"
            onChange={(e) =>
              handleRecipeImage({
                input: e.target.files[0],
                setFile,
                setPreview,
                setNameLabel,
              })
            }
          />
        </div>
      </div>
      <div className="mx-auto max-md:hidden">
        <p className="font18-600 mx-auto mb-3 pl-2.5 lg:w-72 md:w-64 max-md:w-60">
          {" "}
          Photo ajoutée :
        </p>

        <div className="m-auto w-44 h-44 border-2">
          {preview && (
            <img
              src={preview}
              alt={`Photo de ${nameRecipe}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
