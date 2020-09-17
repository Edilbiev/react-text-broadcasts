import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postsCountSet } from "../../redux/actions";
import s from "./PostsSliceButtons.module.css";
import cl from "classnames";

function PostsSliceButtons() {
  const id = useParams().id;

  const postsCount = useSelector(({ onlines }) => {
    if (onlines.postsCount.hasOwnProperty(id)) {
      return onlines.postsCount[id];
    }

    return -1;
  });

  const dispatch = useDispatch();

  const setCount = (count) => {
    dispatch(postsCountSet(id, count));
  };

  return (
    <div className={s.buttonsGroup}>
      <span className={s.text}>Выводить записи</span>
      <button
        onClick={() => setCount(10)}
        className={cl(s.button, {
          [s.activeButton]: postsCount === 10,
        })}
      >
        10
      </button>
      <button
        onClick={() => setCount(30)}
        className={cl(s.button, {
          [s.activeButton]: postsCount === 30,
        })}
      >
        30
      </button>
      <button
        onClick={() => setCount(50)}
        className={cl(s.button, {
          [s.activeButton]: postsCount === 50,
        })}
      >
        50
      </button>
      <button
        onClick={() => setCount(-1)}
        className={cl(`${s.button} ${s.endButton}`, {
          [s.activeButton]: postsCount === -1,
        })}
      >
        все
      </button>
    </div>
  );
}

export default PostsSliceButtons;
