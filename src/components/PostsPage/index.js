import React, { useEffect } from "react";
import Posts from "../Posts";
import MainEvents from "../MainEvents";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./postsPage.module.css";
import MainEventsButton from "../MainEventsButton";
import { CSSTransition } from "react-transition-group";
import Loader from "../common/Loader";
import { backgroundPostsLoaded, postsLoaded } from "../../redux/ducks/posts";
import { mainEventsBarHandled } from "../../redux/ducks/onlines";

function PostsPage() {
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoaded(id));
  }, [dispatch, id]);

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(backgroundPostsLoaded(id));
    }, 5000);
    return () => clearInterval(i);
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
      <div className="loader-large">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={s.postsPage}>
      <div className={s.posts}>
        <Posts />
      </div>
      <MainEventsButton handleMainEventsBar={handleMainEventsBar} />
      <CSSTransition
        in={mainEventsBarOpened}
        timeout={300}
        classNames="transition"
        unmountOnExit
      >
        <MainEvents isOpened={1} />
      </CSSTransition>
    </div>
  );
}

export default PostsPage;
