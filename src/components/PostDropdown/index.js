import React, {useState} from 'react';
import Dropdown from "../common/Dropdown/Dropdown";
import DropdownItem from "../common/Dropdown/DropdownItem";
import s from "./postDropdown.module.css"
import icon from './more_horiz-24px.svg'

function PostDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setDropdown(!dropdown)

  return (
    <div>
      <button className={s.button} onClick={handleClick}>
        <img src={icon} alt="icon"/>
      </button>
      <Dropdown opened={dropdown}>
        <DropdownItem>
          Изменить
        </DropdownItem>
        <DropdownItem>
          Удалить
        </DropdownItem>
      </Dropdown>
    </div>
  );
}

export default PostDropdown;