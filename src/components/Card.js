import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const myCard = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }
  // function handleCardDelete() {
  //   props.onCardDelete(props.card)
  // }
  return (
    <li className="element" >
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={() => handleCardClick(props.card)} />
      <div className="element__description">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} aria-label="лайк" type="button" onClick={() => handleCardLike(props.card)}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      {myCard && <button className="element__delete" aria-label="удалить" type="button"
        onClick={() => props.onCardDeleteConfirm(props.card)}></button>}
    </li>
  )
}

export default Card;
