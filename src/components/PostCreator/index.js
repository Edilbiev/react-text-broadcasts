import React, {useState} from 'react';
import CreatorButton from "../CreatorButton";
import s from "./postCreator.module.css";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {postCreated} from "../../redux/actions";

function PostCreator() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [postCreator, setPostCreator] = useState(false);

  const handleClick = () => {
    setPostCreator(!postCreator);
  };

  const handleCreatePost = () => {
    dispatch(postCreated(id,"Title", "content", true))
  }

  if (!postCreator) {
    return <CreatorButton handleClick={handleClick} text="Новый пост..." />
  }
  return (
    <div className={s.postCreator}>
      <div className={s.time}>
        {dayjs(new Date()).format('HH:mm')}
      </div>
      <div>
        <textarea className={s.title} placeholder="Введите заголовок" />
      </div>
      <div>
        <textarea className={s.content} placeholder="Введите контент" />
      </div>
      <div className={s.buttons}>
        <button className={s.cancel} onClick={handleClick}>
          Отмена
        </button>
        <div className={s.checkbox}>
          Важно <input type="checkbox"/>
        </div>
        <div className={s.checkbox}>
          Удалено <input type="checkbox"/>
        </div>
        <button className={s.add} onClick={handleCreatePost}>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default PostCreator;