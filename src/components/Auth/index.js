import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorised } from "../../redux/actions";
import s from "./auth.module.css";
import { Redirect } from "react-router-dom";
import Loader from "../common/Loader";

function Auth() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const authorized = useSelector((state) => state.auth.authorized);

  const [error, setError] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    dispatch(userAuthorised(login, password));
    setClicked(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  const emptyForms = login === "" || password === "";

  if (!loading && clicked) {
    if (authorized) {
      return <Redirect to="/admin" />;
    } else {
      setError(true);
    }

    setClicked(false);
  }

  return (
    <div className={s.auth}>
      <input
        placeholder="Введите имя пользователя"
        value={login}
        onChange={handleChangeUsername}
        className={s.input}
        onKeyDown={handleKeyDown}
      />
      <input
        placeholder="Введите пароль"
        value={password}
        onChange={handleChangePassword}
        className={s.input}
        onKeyDown={handleKeyDown}
      />
      <div>
        <button
          type="submit"
          onClick={handleClick}
          className={s.button}
          disabled={loading || emptyForms}
        >
          Войти
        </button>
      </div>
      <div className={s.loader}>
        {loading && clicked && <Loader size="small" />}
      </div>
      <div className={s.error}>{error && "ошибка"}</div>
    </div>
  );
}

export default Auth;
