import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import cl from "classnames";
import useEmbed from "../../hooks/useEmbed";
import s from "./post.module.css";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import { postDeleted } from "../../redux/actions";
import Popup from "../common/Popup";

function Post({ item, isAdmin }) {
  const dispatch = useDispatch();
  const id = useParams().id;

  const ref = useRef(null);
  const embedHook = useEmbed(item);

  useEffect(() => {
    if (embedHook !== null) {
      ref.current.append(embedHook);
    }
  }, [embedHook]);

  const [popup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!popup);
  const handleDelete = () => {
    dispatch(postDeleted(id, item._id));
  };

  return (
    <div
      id={item._id}
      className={cl(s.card, {
        [s.importantCard]: item.important,
      })}
    >
      <div className={s.time}>
        {dayjs(item.createdDate).format("HH:mm")}
        {isAdmin ? <DropdownMenu handlePopup={handlePopup} /> : null}
      </div>
      <div className={s.title}>{item.title}</div>
      <div className={s.content} ref={ref} />
      <Popup
        isOpened={popup}
        cancel={handlePopup}
        action={handleDelete}
        text={"Подтвердите действие"}
      />
    </div>
  );
}

export default Post;
