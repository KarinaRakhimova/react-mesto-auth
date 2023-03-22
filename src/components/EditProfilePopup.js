import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (

    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : 'Сохранить'} onSubmit={handleSubmit}>

      <input type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" id="profile-name"
        required minLength="2" maxLength="40" value={name || ''} onChange={evt => setName(evt.target.value)} />
      <span className="popup__input-error profile-name-error"></span>
      <input type="text" placeholder="О себе" className="popup__input popup__input_type_description" name="about" id="job-description"
        required minLength="2" maxLength="200" value={description || ''} onChange={evt => setDescription(evt.target.value)} />
      <span className="popup__input-error job-description-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;
