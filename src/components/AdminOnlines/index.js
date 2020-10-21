import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Online from "../Online";
import OnlineCreator from "../OnlineCreator";
import { onlinesLoaded } from "../../redux/actions";
import s from "../PostsPage/postsPage.module.css";
import Loader from "../common/Loader";

function AdminOnlines({ isAdmin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  const onlines = useSelector((state) => state.onlines.items);
  const loading = useSelector((state) => state.onlines.loading);

  if (loading) {
    return (
      <div className={s.loader}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div>
      <OnlineCreator />
      <div>
        {onlines.map((online) => (
          <Online online={online} key={online._id} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

export default AdminOnlines;
