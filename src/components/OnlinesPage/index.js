import React from 'react';
import {useSelector} from "react-redux";
import Onlines from "../Onlines";

function OnlinesPage() {
  const onlines = useSelector((state) => state.onlines.items);

  return (
    <>
      {onlines.map((online) => (
        <Onlines online={online} key={online._id} />
      ))}
    </>
  );
}

export default OnlinesPage;
