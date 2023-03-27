import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, onSignOut, loggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getButtonByPathName = () => {
    if (location.pathname === "/sign-up") {
      return <Link to="/sign-in" style={{textDecoration:'none', color: '#FFF'}}>Войти</Link>
    }
    else if (location.pathname === "/sign-in") {
      return <Link to="/sign-up" style={{textDecoration:'none', color: '#FFF'}}>Регистрация</Link>
    }
    else {
      return (
        <button className="header__button" onClick={loggedIn ? onSignOut : navigate("/sign-in", {replace:true})}>
          {loggedIn ? "Выйти" : "Войти"}
          </button>
      )
    }
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__userInfo">
        <p className="header__email">{email}</p>
        {getButtonByPathName()}
      </div>
    </header>
  );
}

export default Header;
