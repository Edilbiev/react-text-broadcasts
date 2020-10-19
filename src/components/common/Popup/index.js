import React, { useEffect } from "react";
import s from "./popup.module.css";

function Popup({ isOpened, text, action, cancel }) {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  });

  if (!isOpened) {
    return null;
  }

  return (
    <div className={s.background} onClick={cancel}>
      <div className={s.popup}>
        <div className={s.text}>{text}</div>
        <div className={s.buttons}>
          <button className={s.cancel} onClick={cancel}>
            Отмена
          </button>
          <button className={s.add} onClick={action}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
