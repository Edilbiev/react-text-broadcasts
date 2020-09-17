import React, { useEffect } from "react";
import { postsLoaded } from "../../redux/actions";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Post from "../Post";
import CreatorButton from "../CreatorButton";
import PostCreator from "../PostCreator";

function AdminPosts() {
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoaded(id));
  }, [dispatch, id]);

  const items = useSelector(state => state.posts.items);

  return (
    <div>
      <PostCreator />
      <div>
        {items.map((item) => <Post item={item} key={item._id} />)}
      </div>
    </div>
  );
}

export default AdminPosts;
