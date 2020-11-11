import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Online from "../Online";
import { onlinesLoaded } from "../../redux/ducks/onlines";
import Loader from "../common/Loader";

function OnlinesPage() {
  const dispatch = useDispatch();

  const onlines = useSelector((state) =>
    state.onlines.items.sort(
      (a, b) => new Date(b.startedDate) - new Date(a.startedDate)
    )
  );

  const loading = useSelector((state) => state.onlines.loading);

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader-large">
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