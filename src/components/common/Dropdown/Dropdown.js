import React from 'react';
import s from './dropdown.module.css'
import OutsideClickHandler from "react-outside-click-handler";

function Dropdown({ opened, handleClick, children }) {
  if (opened === false) {
    return null
  }

  return (
    <OutsideClickHandler
      onOutsideClick={handleClick}
    >
      <div className={s.dropdown}>{children}</div>
    </OutsideClickHandler>
  );
}

export default Dropdown;
