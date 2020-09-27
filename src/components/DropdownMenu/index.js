import React, { useState } from "react";
import Dropdown from "../common/Dropdown/Dropdown";
import DropdownItem from "../common/Dropdown/DropdownItem";
import s from "./dropdownMenu.module.css";
import icon from "./more_horiz-24px.svg";

function DropdownMenu({ handlePopup, handleEditor }) {
  const [dropdown, setDropdown] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };

  const handleOpenPopup = (e) => {
    e.stopPropagation();
    handlePopup();
    setDropdown(!dropdown);
  };

  const handleOpenEditor = (e) => {
    e.stopPropagation();
    handleEditor();
    setDropdown(!dropdown);
  };

  return (
    <div>
      <button className={s.button} onClick={handleClick}>
        <img src={icon} alt="icon" />
      </button>
      <Dropdown opened={dropdown} handleClick={handleClick}>
        <DropdownItem action={handleOpenEditor}>Изменить</DropdownItem>
        <DropdownItem action={handleOpenPopup}>Удалить</DropdownItem>
      </Dropdown>
    </div>
  );
}

export default DropdownMenu;
