import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import { useForm } from "../hooks/useForm";

function App() {

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCardsInfo] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cardToDelete, setCardToDelete] = React.useState(null)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [regSuccess, setRegSuccess] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')

  const navigate = useNavigate();
  let location = useLocation();

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  })

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeleteCardPopupOpen || selectedCard || isInfoToolTipOpen

  React.useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEsc)
    }
    return () => {
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


  const handleLoginSubmit = (inputValues) => {
    auth.login(inputValues)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setValues({
          email: '',
          password: ''
        });
        setLoggedIn(true);
        navigate('/', { replace: true })
      })
      .catch(err => console.log(err))
  }

  const handleRegisterSubmit = (inputValues) => {
    auth.register(inputValues)
      .then(data => {
        setRegSuccess(true);
        setInfoToolTipOpen(true);
        navigate('/sign-in', { replace: true })
      })
      .catch(err => {
        console.log(err, 'Что-то пошло не так!Попробуйте ещё раз.');
        setRegSuccess(false);
        setInfoToolTipOpen(true);
        navigate('/sign-up', { replace: true })
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email)
            navigate('/', { replace: true })
          }
        })
        .catch(err => console.log(err))
    }
  }

  function handleButtonClick() {
    if (loggedIn) {
      setLoggedIn(false);
      setUserEmail('');
      localStorage.removeItem('jwt');
      navigate('/sign-in', { replace: true })
    }
    else if (location.pathname === '/sign-up') {
      navigate('/sign-in', { replace: true })
    }
    else {
      navigate('/sign-up', { replace: true })
    }
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={userEmail || ''}
            buttonText={loggedIn ? 'Выйти' : (location.pathname === '/sign-up') ? 'Войти' : 'Регистрация'}
            onClick={handleButtonClick} />
          <Routes>
            <Route path='/' element={<ProtectedRoute
              element={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onCardDeleteConfirm={handleCardDeleteConfirm}
              loggedIn={loggedIn} />} />
            <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />} />
            <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />} />
            <Route path='*' element={<Login onLogin={handleLoginSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
          <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={cardToDelete} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} regSuccess={regSuccess} />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
