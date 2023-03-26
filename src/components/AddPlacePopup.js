import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, setValues, handleChange } = useForm({
    name: "",
    link: "",
  })

  React.useEffect(() => {
    setValues({
      name: "",
      link: "",
    });
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="element"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_element-name"
        name="name"
        id="element-name"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__input-error element-name-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_element-link"
        name="link"
        id="element-link"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="popup__input-error element-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
