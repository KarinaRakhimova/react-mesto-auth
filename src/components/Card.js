import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext)
  const [isLiked, setIsLiked] = React.useState(card.likes.some(i => i._id === currentUser._id))
  const isOwn = card.owner._id === currentUser._id;
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card, isLiked);
    setIsLiked(!isLiked)
  }

  return (
    <li className="element" >
      {console.log(isOwn)}
      <img className="element__image" src={card.link} alt={card.name} onClick={() => handleCardClick(card)} />
      <div className="element__description">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} aria-label="лайк" type="button" onClick={() => handleCardLike(card)}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="element__delete" aria-label="удалить" type="button"
        onClick={() => onCardDelete(card)}></button>}
    </li>
  )
}

export default Card;
