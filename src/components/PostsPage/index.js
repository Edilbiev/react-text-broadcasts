import React, { useEffect } from "react";
import Posts from "../Posts";
import MainEvents from "../MainEvents";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./postsPage.module.css";
import MainEventsButton from "../MainEventsButton";
import { mainEventsBarHandled, postsLoaded } from "../../redux/actions";
import { CSSTransition } from "react-transition-group";
import Loader from "../common/Loader";

function PostsPage() {
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoaded(id));
  }, [dispatch, id]);

  const mainEventsBarOpened = useSelector(({ onlines }) => {
    if (onlines.mainEventsBarOpened.hasOwnProperty(id)) {
      return onlines.mainEventsBarOpened[id];
    }

    return false;
  });

  const loading = useSelector((state) => state.posts.loading);

  const handleMainEventsBar = () => {
    dispatch(mainEventsBarHandled(id));
  };

  if (loading) {
    return (
      <div className={s.loader}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={s.postsPage}>
      <Posts />
      <MainEventsButton handleMainEventsBar={handleMainEventsBar} />
      <CSSTransition
        in={mainEventsBarOpened}
        timeout={200}
        classNames="transition"
        unmountOnExit
      >
        <MainEvents isOpened={1} />
      </CSSTransition>
    </div>
  );
}

export default PostsPage;
