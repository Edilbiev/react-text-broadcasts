import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Onlines from "../Onlines";
import OnlineCreator from "../OnlineCreator";
import { onlinesLoaded } from "../../redux/actions";

function AdminOnlines({ isAdmin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  const onlines = useSelector((state) => state.onlines.items);

  // const history = useHistory();
  //
  // const handleBroadcastCreator = () => {
  //   history.push('/admin/add')
  // };

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
