import React, { useState } from "react";

import imageCompression from "browser-image-compression";

import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";

export default function ModalRecipeGeneral({
  getFormHeight,
  nameRecipeRef,
  categories,
  categorieSelect,
  setCategorieSelect,
  duration,
  durationSelect,
  setDurationSelect,
  vegetarien,
  vegetarienSelect,
  setVegetarienSelect,
  nameLabel,
  setNameLabel,
  file,
  setFile,
  preview,
  setPreview,
}) {
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setNameLabel("Image chargé");

      // Convert image in webp with the library : browser-image-compression
      const webpBlob = await imageCompression(selectedFile, {
        fileType: "image/webp",
      });

      // Change extension
      const webpName = selectedFile.name.replace(/\.\w+$/, ".webp");

      // Créer new object with new name
      const webpFile = new File([webpBlob], webpName, { type: "image/webp" });

      setPreview(URL.createObjectURL(webpFile));
    }
  };

  return (
    <form
      className="py-5 w-full md:grid md:grid-cols-2 flex flex-wrap gap-5 overflow-auto"
      style={{ maxHeight: getFormHeight() }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="col-start-1 col-end-3 md:grid md:grid-cols-2 flex flex-wrap md:gap-5 gap-2">
        <LabelInput
          classNameLabelInput="mx-auto lg:w-72 md:w-64 max-md:w-60"
          htmlFor="nameRecipe"
          label="Nom de la recette :"
          type="text"
          id="nameRecipe"
          ref={nameRecipeRef}
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
          data={vegetarien}
          title="Végétarien :"
          newOption={vegetarienSelect}
          setOption={setVegetarienSelect}
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
            onChange={handleFileChange}
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
              alt={`Photo de ${file.name}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </form>
  );
}
