import { useRef, useState } from "react";
import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";
import Button from "../components/Button";
import ModalRecipeList from "./ModalRecipeList";

export default function ModalRecipeIngredients({
  dosage,
  ingredients,
  setIngredients,
  getFormHeight,
}) {
  const [submitNewIngredient, setSubmitNewIngredient] = useState(false);

  const nameIngredientRef = useRef();
  const quantityIngredientRef = useRef();
  const [newdosage, setNewDosage] = useState("");

  const isValidNewIngredient =
    nameIngredientRef.current?.value.trim() !== "" &&
    quantityIngredientRef.current?.value.trim() !== "" &&
    newdosage !== "";

  const addIngredient = (e) => {
    e.preventDefault();

    const newIngredient = {
      name: nameIngredientRef.current?.value,
      quantity: quantityIngredientRef.current?.value,
      dosage: newdosage,
    };

    if (isValidNewIngredient) {
      setIngredients((prev) => [...prev, newIngredient]);
      nameIngredientRef.current.value = "";
      quantityIngredientRef.current.value = "";
      setNewDosage("");
      setSubmitNewIngredient(false);
    } else {
      setSubmitNewIngredient(true);
    }
  };

  return (
    <div
      className="max-md:px-5 md:px-2 w-full md:grid md:grid-cols-2 flex flex-col gap-x-5 overflow-auto"
      style={{ height: getFormHeight() }}
    >
      <div className="md:pr-5 py-5 w-full lg:grid lg:grid-cols-2 lg:grid-rows-3 flex flex-col gap-5 md:border-r-2 max-md:border-b-2 border-gray-400">
        <LabelInput
          classNameLabelInput="col-start-1 col-end-3 w-full"
          htmlFor="nameIngredient"
          label="Nom de l'ingrédient"
          type="text"
          id="nameIngredient"
          classNameInput=""
          ref={nameIngredientRef}
        />

        <LabelInput
          classNameLabelInput="w-44"
          htmlFor="quantityIngredient"
          label="Quantité :"
          type="number"
          id="quantityIngredient"
          classNameInput=""
          ref={quantityIngredientRef}
        />

        <LabelSelect
          classNameLabelSelect="w-48"
          title="Dosage :"
          newOption={newdosage}
          setOption={setNewDosage}
          data={dosage}
        />

        <div className="col-start-1 col-end-3">
          <Button
            text="+ Ajoutez"
            className={`h3 w-full h-12 ${
              isValidNewIngredient && "buttonSubmit cursor-pointer"
            }`}
            onClick={(e) => addIngredient(e)}
          />
          {!isValidNewIngredient && submitNewIngredient && (
            <p className="pt-5 text text-red-600">
              Tous les champs ne sont pas remplis
            </p>
          )}
        </div>
      </div>

      <ModalRecipeList
        setDelete={setIngredients}
        data={ingredients}
        title={"Les ingrédients :"}
        ingredient={true}
      />
    </div>
  );
}
