import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../Post";
import { orderReversed } from "../../redux/actions";
import Switcher from "../Switcher";
import PostsSliceButtons from "../PostsSliceButtons";
import s from "./posts.module.css";
import BackpostsLoader from "../BackpostsLoader";

function Posts() {
  const dispatch = useDispatch();
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

  const reverseOrder = () => {
    dispatch(orderReversed(id));
  };

  const handleSwitch = () => {
    reverseOrder();
  };

  return (
    <div className={s.post}>
      <div className={s.handlers}>
        <PostsSliceButtons />
        <Switcher
          defaultValue={reversed}
          onSwitchedOn={handleSwitch}
          onSwitchedOff={handleSwitch}
        />
      </div>
      <BackpostsLoader />
      <div>
        {items.map((item) => {
          if (item.separate) {
            return (
              <div className={s.newPostsBorder} key={item._id}>
                {item.content}
              </div>
            );
          }
          return <Post item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
