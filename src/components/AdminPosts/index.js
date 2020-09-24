import React, { useEffect } from "react";
import { postsLoaded } from "../../redux/actions";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Post from "../Post";
import PostCreator from "../PostCreator";

function AdminPosts({ isAdmin }) {
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoaded(id));
  }, [dispatch, id]);

  const items = useSelector(state => state.posts.items);

  // const items = useSelector(state => {
  //   return [...state.posts.items].sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate))
  // });

  return (
    <div>
      <PostCreator />
      <div>
        {items.map((item) => <Post item={item} isAdmin={isAdmin} key={item._id} />)}
      </div>
    </div>
  );
}

export default AdminPosts;
