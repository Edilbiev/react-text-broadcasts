import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backpostsAppended } from "../../redux/ducks/posts";
import s from "./backpostsLoader.module.css";

function BackpostsLoader() {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.posts.temp);

  const appendBackposts = () => dispatch(backpostsAppended());

  return (
    <div className={s.backpostsLoader} onClick={appendBackposts}>
      <div className={s.inner}>
        Загрузить новые посты ({temp.length})
      </div>
    </div>
  );
}

export default BackpostsLoader;
