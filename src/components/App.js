import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from "./ImagePopup";
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import { api } from '../utils/Api';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth'

function App() {

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCardsInfo] = React.useState([])

  const [isEditProfilePopupLoading, setEditProfilePopupLoading] = React.useState(false)
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)

  const [isAddPlacePopupLoading, setAddPlacePopupLoading] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)

  const [isEditAvatarPopupLoading, setEditAvatarPopupLoading] = React.useState(false)
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)

  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cardToDelete, setCardToDelete] = React.useState(null)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [regSuccess, setRegSuccess] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then(([profileInfo, cardsInfo]) => {
        setCurrentUser(profileInfo);
        setCardsInfo(cardsInfo);
      })
      .catch(err => console.log(`Ошибка ${err}`))
    }

  }, [loggedIn])

  React.useEffect(() => {
    checkToken()
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
    setCardToDelete(null);
    setInfoToolTipOpen(false)
  }

  function handleCardLike(card, isLiked) {
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCardsInfo((state) => state.map((c) => (c._id === card._id ? newCard : c)))})
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateUser(profileInfo) {
    setEditProfilePopupLoading(true);
    api.editProfileInfo(profileInfo)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setEditProfilePopupLoading(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setEditAvatarPopupLoading(true);
    api.editAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setEditAvatarPopupLoading(false))
  }

  function handleAddPlaceSubmit(cardInfo) {
    setAddPlacePopupLoading(true);
    api.postNewCard(cardInfo)
      .then(res => {
        setCardsInfo([res, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setAddPlacePopupLoading(false))
  }

  function handleCardDelete (someCard) {
    setCardToDelete(someCard);
    setDeleteCardPopupOpen(true);
  }

  function handleCardDeleteConfirm (cardToDelete) {
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCardsInfo(newCards => newCards.filter(newCard => newCard._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  const handleLoginSubmit = (inputValues) => {
    auth.login(inputValues)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(inputValues.email)
          navigate('/', { replace: true })
        }
        return;
        })
      .catch(err => console.log(err))
  }

  const handleRegisterSubmit = (inputValues) => {
    auth.register(inputValues)
      .then(data => {
        setRegSuccess(true);
        navigate('/sign-in', { replace: true })
      })
      .catch(err => {
        console.log(err, 'Что-то пошло не так!Попробуйте ещё раз.');
        setRegSuccess(false);
      })
      .finally(()=>setInfoToolTipOpen(true))
  }

  function checkToken() {
      auth.getToken()
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email)
            navigate('/', { replace: true })
          }
        })
        .catch(err => console.log(err))
  }

  function handleSignOut() {
    auth.signout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          setUserEmail("");
          navigate("/sign-in", { replace: true });
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={userEmail || ''} loggedIn={loggedIn} onSignOut={handleSignOut}/>
          <Routes>
            <Route
            path='/'
            element={<ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onCardDeleteConfirm={handleCardDeleteConfirm}
              loggedIn={loggedIn}
             />} />
            <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />} />
            <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />} />
            <Route path='*' element={<Login onLogin={handleLoginSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isEditProfilePopupLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isEditAvatarPopupLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isAddPlacePopupLoading} />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDeleteConfirm}
            card={cardToDelete} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} regSuccess={regSuccess} />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
