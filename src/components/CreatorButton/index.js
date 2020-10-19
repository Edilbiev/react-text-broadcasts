import React from "react";
import s from "./CreatorButton.module.css";

function CreatorButton({ handleClick, text }) {
  return (
    <div>
      <button className={s.button} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
}

export default CreatorButton;
