import React from "react";
import { useForm } from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <form className="authForm" onSubmit={handleFormSubmit}>
      <h3 className="authForm__title">Вход</h3>
      <input
        className="authForm__input authForm__input_type_login"
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <span className="authForm__input_error" />
      <input
        className="authForm__input authForm__input_type_password"
        type="password"
        placeholder="Пароль"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <span className="authForm__input_error" />
      <button className="authForm__submit" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
