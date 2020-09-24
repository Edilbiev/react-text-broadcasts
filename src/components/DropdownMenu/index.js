import React, { useState } from "react";
import Dropdown from "../common/Dropdown/Dropdown";
import DropdownItem from "../common/Dropdown/DropdownItem";
import s from "./dropdownMenu.module.css";
import icon from "./more_horiz-24px.svg";

function DropdownMenu({ handlePopup, handleEdit }) {
  const [dropdown, setDropdown] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };

  return (
    <div>
      <button className={s.button} onClick={handleClick}>
        <img src={icon} alt="icon" />
      </button>
      <Dropdown opened={dropdown} handleClick={handleClick}>
        <DropdownItem>Изменить</DropdownItem>
        <DropdownItem action={handlePopup}>Удалить</DropdownItem>
      </Dropdown>
    </div>
  );
}

export default DropdownMenu;
