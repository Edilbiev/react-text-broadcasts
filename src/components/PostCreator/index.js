import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Loader from "../common/Loader";

function PostCreator() {

  const id = useParams().id;
  const dispatch = useDispatch();
  const creating = useSelector((state) => state.posts.creating);
  const [postCreator, setPostCreator] = useState(false);

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(EditorState.createEmpty());
  const handleChangeContent = (editorState) => setContent(editorState);

  const [clicked, setClicked] = useState(false);

  const editorRef = useRef(null);

  const [importance, setImportance] = useState(false);
  const handleSwitch = () => setImportance(!importance);

  const [creatorOpened, setCreatorOpened] = useState(false);

  const setEditorReference = (ref) => !creatorOpened && ref?.focus();

  const handlePostCreator = () => {
    setCreatorOpened(false);
    setPostCreator(!postCreator);
  };

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 13) {
  //     handleCreatePost();
  //   }
  // };

  // const isEmpty = content.getCurrentContent().getPlainText().length === 0;

  const handleCreatePost = () => {
    setClicked(true);
    dispatch(
      postCreated(
        id,
        title,
        draftToHtml(convertToRaw(content.getCurrentContent())),
        importance
      )
    );
  };

  if (!creating && clicked) {
    setTitle("");
    setContent("");
    setImportance(false);
    setClicked(false);
  }

  if (!postCreator) {
    return (
      <CreatorButton handleClick={handlePostCreator} text="Новый пост..." />
    );
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
          ref={editorRef}
          className={s.title}
          placeholder="Введите заголовок"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        <Editor
          editorRef={setEditorReference}
          editorState={content}
          placeholder="Введите контент"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleChangeContent}
          onBlur={() => setCreatorOpened(true)}
        />
      </div>
      <div className={s.handlers}>
        <div className={s.importance}>
          <Switcher
            defaultValue={importance}
            onSwitchedOff={handleSwitch}
            onSwitchedOn={handleSwitch}
          />
        </div>
        <div className={s.buttons}>
          <div>
            <button className={s.cancel} onClick={handlePostCreator}>
              Отмена
            </button>
          </div>
          <div>
            <button
              className={s.add}
              onClick={handleCreatePost}
              disabled={creating}
            >
              Добавить
            </button>
            <div className={s.loader}>
              {creating && <Loader size="small" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCreator;
