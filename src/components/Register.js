import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({onRegister}) {
  const {values, setValues, handleChange} = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values)
  }


  return(
    <form className="authForm" onSubmit={handleSubmit}>
      <h3 className="authForm__title">Регистрация</h3>
      <input className="authForm__input authForm__input_type_login" type="email" placeholder="Email" name='email'
      value={values.email} onChange={handleChange}/>
      <span className="authForm__input_error"/>
      <input className="authForm__input authForm__input_type_password" type="password" placeholder="Пароль" name='password'
      value={values.password} onChange={handleChange}/>
      <span className="authForm__input_error"/>
      <button className="authForm__submit" type="submit">Зарегистрироваться</button>
      <p className="authForm__caption">Уже зарегистрированы?<Link to='/sign-in' style={{textDecoration:'none', color:'#FFFFFF'}}> Войти</Link></p>
    </form>
  )
}

export default Register;
