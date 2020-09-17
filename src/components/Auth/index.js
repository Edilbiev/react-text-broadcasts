import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorised } from "../../redux/actions";
import s from "./auth.module.css";
import { Redirect } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const sendForm = () => {
    dispatch(userAuthorised(login, password));
  };

  const handleClick = () => {
    sendForm();
  };

  if (isAdmin) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className={s.auth}>
      <input
        placeholder="Введите имя пользователя"
        value={login}
        onChange={handleChangeUsername}
        className={s.input}
      />
      <input
        placeholder="Введите пароль"
        value={password}
        onChange={handleChangePassword}
        className={s.input}
      />
      <div>
        <button type="submit" onClick={handleClick} className={s.button}>
          Войти
        </button>
      </div>
      {jwt.hasOwnProperty("error") ? (
        <div className={s.error}>{jwt.error}</div>
      ) : null}
    </div>
  );
}

export default Auth;
