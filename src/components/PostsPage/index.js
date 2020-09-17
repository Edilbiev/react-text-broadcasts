import React from "react";
import Posts from "../Posts";
import MainEvents from "../MainEvents";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./postsPage.module.css";
import MainEventsButton from "../MainEventsButton";
import { mainEventsBarHandled } from "../../redux/actions";
import {CSSTransition} from "react-transition-group";

function PostsPage() {
  const id = useParams().id;
  const dispatch = useDispatch();

  const mainEventsBarOpened = useSelector(({ onlines }) => {
    if (onlines.mainEventsBarOpened.hasOwnProperty(id)) {
      return onlines.mainEventsBarOpened[id];
    }

    return false;
  });

  const handleMainEventsBar = () => {
    dispatch(mainEventsBarHandled(id));
  };

  return (
    <div className={s.postsPage}>
      <Posts />
      <MainEventsButton handleMainEventsBar={handleMainEventsBar} />
      <div>
        <CSSTransition in={mainEventsBarOpened} timeout={200} classNames="transition">
          <MainEvents isOpened={mainEventsBarOpened} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default PostsPage;
