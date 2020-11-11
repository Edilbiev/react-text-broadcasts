import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import { onlineDeleted } from "../../redux/ducks/onlines";
import Popup from "../common/Popup";
import OnlineEditor from "../OnlineEditor";
import Calendar from "dayjs/plugin/calendar";

function Online({ online, isAdmin }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleting = useSelector((state) => state.onlines.deleting);

  const handleClick = () => {
    if (isAdmin) {
      history.push("/admin/" + online._id);
    } else {
      history.push("/" + online._id);
    }
  };

  const [popup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!popup);

  const [clicked, setClicked] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setClicked(true);
    dispatch(onlineDeleted(online._id, online.title, online.introtext));
  };

  if (!deleting && clicked) {
    handlePopup();
    setClicked(false);
  }

  const [editor, setEditor] = useState(false);
  const handleEditor = () => setEditor(!editor);

  dayjs.extend(Calendar);

  return (
    <div>
      <div className="online-form" onClick={handleClick}>
        <div className="time1">
          {dayjs(online.startedDate).calendar(null, {
            sameDay: "[Сегодня] HH:mm",
            lastDay: "[Вчера] HH:mm",
            lastWeek: "dddd HH:mm",
            sameElse: "DD/MM/YYYY",
          })}
          {isAdmin ? (
            <DropdownMenu
              handlePopup={handlePopup}
              handleEditor={handleEditor}
            />
          ) : null}
        </div>
        <div className="title">{online.title}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: online.introtext }}
        />
      </div>
      <Popup
        isOpened={popup}
        cancel={handlePopup}
        action={handleDelete}
        text={"Подтвердите действие"}
        deleting={deleting}
      />
      <OnlineEditor online={online} isOpened={editor} cancel={handleEditor} />
    </div>
  );
}

export default Online;
