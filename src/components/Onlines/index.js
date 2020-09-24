import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import s from "./onlines.module.css";
import {useDispatch, useSelector} from "react-redux";
import DropdownMenu from "../DropdownMenu";
import {onlineDeleted, postDeleted} from "../../redux/actions";
import Popup from "../common/Popup";

function Onlines({ online, isAdmin }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (isAdmin) {
      history.push("/admin/" + online._id);
    } else {
      history.push("/" + online._id);
    }
  };

  const [popup, setPopup] = useState(false);
  const handlePopup = (e) => {
    e.stopPropagation();
    setPopup(!popup);
  }
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(onlineDeleted(online._id));
  }

  return (
    <div className={s.online} onClick={handleClick}>
      <div className={s.time}>
        {dayjs(online.postData).format('HH:mm')}
        {isAdmin ? <DropdownMenu handlePopup={handlePopup}/> : null}
      </div>
      <div className={s.title}>{online.title}</div>
      <div className={s.content} dangerouslySetInnerHTML={{__html: online.introtext}}/>
      <Popup isOpened={popup} cancel={handlePopup} action={handleDelete} text={"Подтвердите действие"}/>
    </div>
  );
}

export default Onlines;
