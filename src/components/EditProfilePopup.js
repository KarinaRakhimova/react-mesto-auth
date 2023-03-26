import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  const { values, handleChange, setValues } = useForm({
    name: "",
    about: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        name="name"
        id="profile-name"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error profile-name-error"></span>
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_description"
        name="about"
        id="job-description"
        required
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error job-description-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
