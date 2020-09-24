import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dayjs from "dayjs";
import CreatorButton from "../CreatorButton";
import s from "./postCreator.module.css";
import { postCreated } from "../../redux/actions";
import cl from "classnames";
import Switcher from "../Switcher";

function PostCreator() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [postCreator, setPostCreator] = useState(false);

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(EditorState.createEmpty());
  const handleChangeContent = (editorState) => setContent(editorState);

  const [importance, setImportance] = useState(false);
  const handleSwitch = () => setImportance(!importance);

  const handleClick = () => {
    setPostCreator(!postCreator);
  };

  const handleCreatePost = () => {
    dispatch(
      postCreated(
        id,
        title,
        draftToHtml(convertToRaw(content.getCurrentContent())),
        importance
      )
    );
    setTitle("");
    setContent("");
    setImportance(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleCreatePost();
    }
  };

  console.log(importance);

  if (!postCreator) {
    return <CreatorButton handleClick={handleClick} text="Новый пост..." />;
  }

  return (
    <div
      className={cl(s.postCreator, {
        [s.importantPostCreator]: importance,
      })}
    >
      <div className={s.time}>{dayjs(new Date()).format("HH:mm")}</div>
      <div>
        <textarea
          className={s.title}
          placeholder="Введите заголовок"
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={handleKeyDown}
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
        <div className={s.importance}>
          <Switcher
            defaultValue={importance}
            onSwitchedOff={handleSwitch}
            onSwitchedOn={handleSwitch}
          />
        </div>
        <div>
          <button className={s.cancel} onClick={handleClick}>
            Отмена
          </button>
          <button className={s.add} onClick={handleCreatePost}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCreator;
