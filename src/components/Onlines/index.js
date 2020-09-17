import React from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import s from "./onlines.module.css";
import {useSelector} from "react-redux";

function Onlines({ online }) {
  const history = useHistory();
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const handleClick = () => {
    if (isAdmin) {
      history.push("/admin/" + online._id);
    } else {
      history.push("/" + online._id);
    }
  };

  return (
    <div className={s.online} onClick={handleClick}>
      <div className={s.time}>
        {dayjs(online.postData).format('HH:mm')}
      </div>
      <div className={s.title}>{online.title}</div>
      <div className={s.content} dangerouslySetInnerHTML={{__html: online.introtext}}/>
    </div>
  );
}

export default Onlines;
