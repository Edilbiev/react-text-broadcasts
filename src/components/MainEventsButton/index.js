import React from 'react';
import s from "./mainEventsButton.module.css"
import icon from "./burger.svg"

function MainEventsButton({ handleMainEventsBar }) {

  return (
    <div>
      <button onClick={handleMainEventsBar} className={s.button}>
        <img src={icon} alt="Main events"/>
      </button>
    </div>
  );
}

export default MainEventsButton;
