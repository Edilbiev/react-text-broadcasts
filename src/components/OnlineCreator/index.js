import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useRouteMatch} from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import {convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dayjs from "dayjs";
import s from "./onlineCreator.module.css";
import BroadcastCreatorButton from "../CreatorButton";
import {onlineCreated} from "../../redux/actions";


function OnlineCreator() {
  const m = useRouteMatch('/admin/add');

  const dispatch = useDispatch();
  const [broadcastCreator, setBroadcastCreator] = useState(m);

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(EditorState.createEmpty());
  const handleChangeContent = (editorState) => setContent(editorState);

  const handleBroadcastCreator = () => {
    setBroadcastCreator(!broadcastCreator);
  };

  const handleAddBroadcast = () => {
    dispatch(onlineCreated(title, draftToHtml(convertToRaw(content.getCurrentContent()))))
  }


  if (!broadcastCreator) {
    return <BroadcastCreatorButton handleClick={handleBroadcastCreator} text="Новая трансляция..."/>
  }

  return (
    <div className={s.broadcastsCreator}>

      <div className={s.time}>
        {dayjs(new Date()).format('HH:mm')}
      </div>
      <div>
        <textarea
          className={s.title}
          placeholder="Введите заголовок"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        <Editor
          editorState={content}
          placeholder="Введите контент"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleChangeContent}
        />
      </div>
      <div className={s.buttons}>
        <button className={s.cancel} onClick={handleBroadcastCreator}>
          Отмена
        </button>
        <button className={s.add} onClick={handleAddBroadcast}>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default OnlineCreator;
