import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorised } from "../../redux/actions";
import s from "./auth.module.css";
import { Redirect } from "react-router-dom";

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
    dispatch(userAuthorised(login, password))
    setClicked(true);
  };

  if(!loading && clicked) {
    if(authorized) {
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
      />
      <input
        placeholder="Введите пароль"
        value={password}
        onChange={handleChangePassword}
        className={s.input}
      />
      <div>
        <button type="submit" onClick={handleClick} className={s.button} disabled={loading}>
          Войти
        </button>
      </div>
      <div>
        {error && 'ошибка'}
      </div>
    </div>
  );
}

export default Auth;
