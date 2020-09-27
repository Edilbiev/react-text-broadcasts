import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Onlines from "../Onlines";
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

  // const history = useHistory();
  //
  // const handleBroadcastCreator = () => {
  //   history.push('/admin/add')
  // };

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
          <Onlines online={online} key={online._id} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

export default AdminOnlines;
