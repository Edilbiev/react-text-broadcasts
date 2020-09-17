import React from 'react';
import s from './dropdown.module.css'

function DropdownItem({ children, action }) {
  return (
    <div className={s.dropdownItem} onClick={action}>{children}</div>
  );
}

export default DropdownItem;
