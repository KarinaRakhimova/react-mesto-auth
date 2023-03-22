import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, card }) {

  return (
    <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isOpen} onClose={onClose} buttonText={'Да'} onSubmit={(evt) => onCardDelete(evt,card)}/>
  )
}

export default DeleteCardPopup;
