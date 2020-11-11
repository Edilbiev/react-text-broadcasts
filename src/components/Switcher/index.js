import React, { useEffect, useState } from "react";
import s from "./button.module.css";
import cl from "classnames";

function Switcher({ defaultValue, onSwitchedOn, onSwitchedOff, disabled }) {
  const [isOn, setIsOn] = useState(defaultValue);

  useEffect(() => {
    setIsOn(defaultValue);
  }, [defaultValue]);

  const handleClick = () => {
    if (!disabled) {
      if (isOn) {
        onSwitchedOff();
      } else {
        onSwitchedOn();
      }
      setIsOn(!isOn);
    }};

  return (
    <div className={cl(s.switcher, {
      [s.switcherDisabled]: disabled,
    })}>
      <div
        onClick={handleClick}
        className={cl(s.backgroundOff, {
          [s.backgroundOn]: isOn,
        })}
      >
        <div className={s.round} />
      </div>
    </div>
  );
}

export default Switcher;