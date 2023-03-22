import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
//import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from "./ImagePopup";
import { api } from '../utils/Api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
function App() {

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCardsInfo] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cardToDelete, setCardToDelete] = React.useState(null)

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen ||isDeleteCardPopupOpen||selectedCard

  React.useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEsc)
    }
    return() => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [isOpen])

  React.useEffect(() => {
    Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then(([profileInfo, cardsInfo]) => {
        setCurrentUser(profileInfo);
        setCardsInfo(cardsInfo);
      })
      .catch(err => console.log(`Ошибка ${err}`));
  }, [])

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, !isLiked ? 'PUT' : 'DELETE')
      .then((newCard) => setCardsInfo((state) => state.map((c) => c._id === card._id ? newCard : c)))
      .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleUpdateUser(profileInfo) {
    setIsLoading(true);
    api.editProfileInfo(profileInfo)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api.editAvatar(avatarLink)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);
    api.postNewCard(cardInfo)
      .then(res => setCardsInfo([res, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleCardDeleteConfirm(someCard) {
    setCardToDelete(someCard);
    setDeleteCardPopupOpen(true);
  }

  function handleCardDelete(evt, cardToDelete) {
    evt.preventDefault();
    api.deleteCard(cardToDelete._id)
    .then(() => {
      setCardsInfo(newCards => newCards.filter(newCard => newCard._id !== cardToDelete._id));
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка ${err}`))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          onCardDeleteConfirm={handleCardDeleteConfirm} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={cardToDelete} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
