import React from 'react';
import s from './dropdown.module.css'

function Dropdown({ opened, children }) {
  if (opened === false) {
    return null
  }

  return (
    <div className={s.dropdown}>{children}</div>
  );
}

export default Dropdown;
