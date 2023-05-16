import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, onCardDeleteConfirm, isLiked }) {

  const currentUser = React.useContext(CurrentUserContext)
  const cardElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      onCardDeleteConfirm={onCardDeleteConfirm}
      isLiked = {isLiked}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <article className="profile__info">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля" onClick={onEditAvatar} />
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button className="profile__edit" aria-label="изменить" type="button" onClick={onEditProfile}></button>
        </article>
        <button className="add-element" aria-label="добавить" type="submit" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cardElements}
        </ul>
      </section>
    </main>
  )
}

export default Main;
