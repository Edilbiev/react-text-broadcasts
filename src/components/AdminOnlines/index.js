import React from 'react';
import {useSelector} from "react-redux";
import Onlines from "../Onlines";
import BroadcastCreator from "../BroadcastCreator";

function AdminOnlines() {
  const onlines = useSelector(state => state.onlines.items);

  return (
    <div>
      <BroadcastCreator/>
      <div>
        {onlines.map((online) => <Onlines online={online} key={online._id}/>)}
      </div>
    </div>
  );
}

export default AdminOnlines;