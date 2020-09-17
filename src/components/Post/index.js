import React, {useEffect, useRef, useState} from "react";
import dayjs from 'dayjs';
import cl from "classnames";
import useEmbed from "../../hooks/useEmbed";
import s from "./post.module.css";
import {useSelector} from "react-redux";
import Dropdown from "../common/Dropdown/Dropdown";
import PostDropdown from "../PostDropdown";

function Post({ item }) {
  const ref = useRef(null);
  const ss = useEmbed(item);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if(ss !== null) {
      ref.current.append(ss)
    }
  }, [ss])

  return (
    <div id={item._id} className={cl(s.card, {
      [s.importantCard]: item.important
    })}>
      <div className={s.time}>
        {dayjs(item.postData).format('HH:mm')}
        {isAdmin ? <PostDropdown /> : null}
      </div>
      <div className={s.title}>{item.title}</div>
      <div className={s.content} ref={ref}/>
    </div>
  );
}

export default Post;
