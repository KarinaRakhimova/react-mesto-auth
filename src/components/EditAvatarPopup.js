import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const userAvatarRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: userAvatarRef.current.value });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_type_avatar-link"
        name="avatar"
        id="avatar-link"
        required
        ref={userAvatarRef}
      />
      <span className="popup__input-error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
