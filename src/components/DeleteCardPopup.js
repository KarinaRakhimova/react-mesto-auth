import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit(evt) {
    evt.preventDefault()
    onCardDelete(card)
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Да"}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
