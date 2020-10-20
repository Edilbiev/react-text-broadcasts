import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import cl from "classnames";
import useEmbed from "../../hooks/useEmbed";
import s from "./post.module.css";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import { postDeleted } from "../../redux/actions";
import Popup from "../common/Popup";
import PostEditor from "../PostEditor";
import Calendar from 'dayjs/plugin/calendar';
dayjs.extend(Calendar);

function Post({ item, isAdmin }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const embedHook = useEmbed(item);

  useEffect(() => {
    if (embedHook !== null) {
      ref.current.append(embedHook);
    }
  }, [embedHook]);

  const [popup, setPopup] = useState(false);
  const handlePopup = (e) => {
    setPopup(!popup);
  };

  const [editor, setEditor] = useState(false);
  const handleEditor = () => setEditor(!editor);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(postDeleted(item._id));
  };

  return (
    <div
      id={item._id}
      className={cl(s.card, {
        [s.importantCard]: item.important,
      })}
    >
      <div className={s.time}>
        {dayjs(item.createdDate).calendar(null,{
          sameDay: '[Сегодня] HH:mm',
          lastDay: '[Вчера] HH:mm',
          lastWeek: 'dddd [в] HH:mm',
          sameElse: 'DD/MM/YYYY'
          })}
        {isAdmin ? (
          <DropdownMenu handlePopup={handlePopup} handleEditor={handleEditor} />
        ) : null}
      </div>
      <div className={s.title}>{item.title}</div>
      <div className={s.content} ref={ref} />

      <Popup
        isOpened={popup}
        cancel={handlePopup}
        action={handleDelete}
        text={"Подтвердите действие"}
      />
      <PostEditor item={item} isOpened={editor} cancel={handleEditor} />
    </div>
  );
}

export default Post;
