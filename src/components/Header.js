
import logo from '../images/logo.svg';

function Header({ email, buttonText, onClick }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className='userInfo'>
        <p className='userInfo__email'>{email}</p>
        <button className='userInfo__button' onClick={onClick}>{buttonText}</button>
      </div>
    </header>
  )
}

export default Header;
