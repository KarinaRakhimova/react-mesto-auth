function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_type_element-image ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <img className="popup__image" src={`${card ? `${card.link}`: '#'}`} alt={card ?`${card.name}` : ''} />
        <figcaption className="popup__caption">{card ?`${card.name}` : ''}</figcaption>
        <button className="popup__close" aria-label="закрыть" type="button" onClick={onClose} />
      </figure>
    </div>
  )
}

export default ImagePopup;
