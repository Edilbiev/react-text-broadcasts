import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {backpostsAppended} from "../../redux/actions";
import s from "./backpostsLoader.module.css"

function BackpostsLoader() {
  const dispatch = useDispatch();
  const temp = useSelector(state => state.posts.temp);
  console.log(temp)

  const appendBackposts = () => dispatch(backpostsAppended())

  if (temp.length === 0) {
    return null
  }

  return (
    <div className={s.backpostsLoader} onClick={appendBackposts}>
      Загрузить новые посты
    </div>
  );
}

export default BackpostsLoader;