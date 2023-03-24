import regSuccesImg from '../images/regSuccess.svg';
import regFailImg from '../images/regFail.svg';

function InfoTooltip({isOpen, onClose, regSuccess}) {
  return(
<div className={`popup popup_type_regResult ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <img className="popup__image" src={regSuccess ? regSuccesImg : regFailImg} alt={''} />

        <button className="popup__close" aria-label="закрыть" type="button" onClick={onClose} />
      </figure>
    </div>
  )
}

export default InfoTooltip;
