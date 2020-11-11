import React, { useEffect } from "react";
import s from "./popup.module.css";
import Loader from "../Loader";

function Popup({ isOpened, text, action, cancel, deleting }) {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <div className={s.background} onClick={cancel}>
      <div className={s.popup}>
        <div>{text}</div>
        <div className={s.buttons}>
          <div>
            <button className="cancel-button" onClick={cancel}>
              Отмена
            </button>
          </div>
          <div>
            <div>
              <button
                className="confirm-button"
                onClick={action}
                disabled={deleting}
              >
                Удалить
              </button>
            </div>
            <div className={s.loader}>
              {deleting && <Loader size="small" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
