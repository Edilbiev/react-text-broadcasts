import React, {useState} from "react";
import s from "./broadcastCreator.module.css";
import BroadcastCreatorButton from "../CreatorButton";
import dayjs from "dayjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useDispatch} from "react-redux";
import {onlineCreated} from "../../redux/actions";

function BroadcastCreator() {
  const dispatch = useDispatch();
  const [broadcastCreator, setBroadcastCreator] = useState(false);

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);

  // const [content, setContent] = useState("");
  // const handleChangeContent = (e) => setContent(e.target.value);

  const [content, setContent] = useState(EditorState.createEmpty());
  const handleChangeContent = (editorState) => setContent(editorState);

  const handleBroadcastCreator = () => {
    setBroadcastCreator(!broadcastCreator);
  };

  const handleAddBroadcast = () => {
    dispatch(onlineCreated(title, "тест"))
  }


  if (!broadcastCreator) {
    return <BroadcastCreatorButton handleClick={handleBroadcastCreator} text="Новая трансляция..."/>
  }
  console.log(content)

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
        {/*<textarea className={s.content} placeholder="Введите контент" />*/}
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

export default BroadcastCreator;
