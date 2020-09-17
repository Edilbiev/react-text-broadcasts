import React, { useState } from "react";
import s from "./button.module.css";
import cl from "classnames";

function Switcher({ defaultValue, onSwitchedOn, onSwitchedOff }) {
  const [isOn, setIsOn] = useState(defaultValue);

  return (
    <div className={s.switcher}>
      <div
        onClick={() => {
          if (isOn) {
            onSwitchedOff();
          } else {
            onSwitchedOn();
          }
          setIsOn(!isOn);
        }}
        className={cl(s.backgroundOff, {
          [s.backgroundOn]: isOn,
        })}
      >
        <div className={s.round}/>
      </div>
      перевернуть трансляцию
    </div>
  );
}

export default Switcher;
