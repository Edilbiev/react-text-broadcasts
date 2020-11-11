import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Online from "../Online";
import OnlineCreator from "../OnlineCreator";
import { onlinesLoaded } from "../../redux/ducks/onlines";
import Loader from "../common/Loader";

function AdminOnlines({ isAdmin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  const onlines = useSelector((state) =>
    state.onlines.items.sort(
      (a, b) => new Date(b.startedDate) - new Date(a.startedDate)
    )
  );

  const loading = useSelector((state) => state.onlines.loading);

  if (loading) {
    return (
      <div className="loader-large">
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