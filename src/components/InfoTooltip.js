import regSuccessImg  from "../images/regSuccess.svg";
import regFailImg from "../images/regFail.svg";

function InfoTooltip({ isOpen, onClose, regSuccess }) {
  return (
    <div
      className={`popup popup_type_regResult ${isOpen ? "popup_opened" : ""}`}
    >
      <figure className="popup__regResult-container">
        <img
          className="popup__regResult-image"
          src={regSuccess ? regSuccessImg : regFailImg}
          alt={""}
        />
        <figcaption className="popup__regResult-caption">
          {regSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так!Попробуйте ещё раз."}
        </figcaption>
        <button
          className="popup__close"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
      </figure>
    </div>
  );
}

export default InfoTooltip;
