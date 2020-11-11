import React from "react";
import dayjs from "dayjs";
import s from "./mainEvent.module.css";

function MainEvent({ item }) {
  const handleScroll = () => {
    const targetDOMElement = document.getElementById(item._id);
    targetDOMElement.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <div className={s.mainEvent} onClick={handleScroll}>
      <div className={s.time}>
        <div className={s.checkpoint} />
        {dayjs(item.createdDate).format("HH:mm")}
      </div>
      <div className={s.text}>{item.title}</div>
    </div>
  );
}

export default MainEvent;
