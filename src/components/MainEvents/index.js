import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainEvent from "../MainEvent";
import s from "./mainEvents.module.css";

function MainEvents({ isOpened }) {
  const id = useParams().id;

  const reversed = useSelector(({ onlines }) => {
    if (onlines.reversed.hasOwnProperty(id)) {
      return onlines.reversed[id];
    }

    return false;
  });

  const postsCount = useSelector(({ onlines }) => {
    if (onlines.postsCount.hasOwnProperty(id)) {
      return onlines.postsCount[id];
    }

    return -1;
  });

  const items = useSelector((state) => {
    const newItems = reversed
      ? [...state.posts.items].sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        )
      : [...state.posts.items].sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );

    if (postsCount !== -1) {
      return newItems.slice(0, postsCount);
    }

    return newItems;
  });

  return (
    <div className={s.mainEvents}>
      Ключевые моменты
      {items.map((item) => (
        <MainEvent item={item} key={item._id} />
      ))}
    </div>
  );
}

export default MainEvents;
