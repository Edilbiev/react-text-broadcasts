import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import cl from "classnames";
import useEmbed from "../../hooks/useEmbed";
import s from "./post.module.css";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import { postDeleted } from "../../redux/ducks/posts";
import Popup from "../common/Popup";
import PostEditor from "../PostEditor";
import Calendar from "dayjs/plugin/calendar";

function Post({ item, isAdmin }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleting = useSelector((state) => state.posts.deleting);

  const embedHook = useEmbed(item);

  useEffect(() => {
    if (embedHook !== null) {
      ref.current.append(embedHook);
    }
  }, [embedHook]);

  const [popup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!popup);

  const [editor, setEditor] = useState(false);
  const handleEditor = () => setEditor(!editor);

  const [clicked, setClicked] = useState(false);

  const handleDelete = (e) => {
    setClicked(true);
    e.stopPropagation();
    dispatch(postDeleted(item._id));
  };

  dayjs.extend(Calendar);

  if (!deleting && clicked) {
    handlePopup();
    setClicked(false);
  }

  return (
    <div
      id={item._id}
      className={cl(s.card, {
        [s.importantCard]: item.important,
      })}
    >
      <div className="time1">
        {dayjs(item.createdDate).calendar(null, {
          sameDay: "[Сегодня] HH:mm",
          lastDay: "[Вчера] HH:mm",
          lastWeek: "dddd HH:mm",
          sameElse: "DD/MM/YYYY",
        })}
        {isAdmin ? (
          <DropdownMenu handlePopup={handlePopup} handleEditor={handleEditor} />
        ) : null}
      </div>
      <div className="title">{item.title}</div>
      <div className="content" ref={ref} />

      <Popup
        isOpened={popup}
        cancel={handlePopup}
        action={handleDelete}
        text={"Подтвердите действие"}
        deleting={deleting}
      />
      <PostEditor item={item} isOpened={editor} cancel={handleEditor} />
    </div>
  );
}

export default Post;
