import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Online from "../Online";
import { onlinesLoaded } from "../../redux/actions";
import Loader from "../common/Loader";
import s from "../PostsPage/postsPage.module.css";

function OnlinesPage() {
  const dispatch = useDispatch();

  const onlines = useSelector((state) => state.onlines.items);
  const loading = useSelector((state) => state.onlines.loading);

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={s.loader}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <>
      {onlines.map((online) => (
        <Online online={online} key={online._id} />
      ))}
    </>
  );
}

export default OnlinesPage;
