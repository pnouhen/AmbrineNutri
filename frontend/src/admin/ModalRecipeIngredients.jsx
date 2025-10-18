import { useRef, useState } from "react";
import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";
import Button from "../components/Button";

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
      index: Date.now(),
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

  const deleteIngredient = (id) => {
    const filterIngredients = ingredients.filter((ingre) => ingre.id !== id);
    setIngredients(filterIngredients);
  };

  return (
    <div
      className="max-md:px-5 md:px-2 w-full md:grid md:grid-cols-2 flex flex-col gap-x-5 overflow-auto"
      style={{ height: getFormHeight() }}
      onSubmit={(e) => e.preventDefault()}
    >
      <form className="md:pr-5 py-5 w-full lg:grid lg:grid-cols-2 lg:grid-rows-3 flex flex-col gap-5 md:border-r-2 max-md:border-b-2 border-gray-400">
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
        {!isValidNewIngredient &&
          submitNewIngredient &&(
            <p className="pt-5 text text-red-600">
              Tous les champs ne sont pas remplis
            </p>
          )}
        </div>
        
      </form>

      <div className="pr-5 py-5 max-md:h-40 md:overflow-auto">
        <p className="font18-600 mb-5">Les ingrédients :</p>

        <ul className="flex flex-col gap-5">
          {ingredients.map((ingre) => (
            <li key={ingre.index} className="w-full flex justify-between">
              <p className="text break-words">
                {ingre.quantity}
                {ingre.dosage?.length <= 2 ? "" : " "}
                {ingre.dosage} {ingre.name}
              </p>

              <i
                className="fa-solid fa-trash mr-5 cursor-pointer"
                onClick={() => deleteIngredient(ingre.id)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
