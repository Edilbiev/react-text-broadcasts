import React, { useEffect, useState } from "react";
import s from "./onlineEditor.module.css";
import dayjs from "dayjs";
import { Editor } from "react-draft-wysiwyg";
import Loader from "../common/Loader";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { onlineEdited } from "../../redux/ducks/onlines";
import draftToHtml from "draftjs-to-html";

function OnlineEditor({ isOpened, online, cancel }) {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.onlines.editing);

  const blocksFromHtml = htmlToDraft(online.introtext);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);

  const [title, setTitle] = useState(online.title);
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(editorState);
  const handleChangeContent = (editorState) => setContent(editorState);

  const [clicked, setClicked] = useState(false);

  const handleEditOnline = () => {
    setClicked(true);
    dispatch(
      onlineEdited(
        online._id,
        title,
        draftToHtml(convertToRaw(content.getCurrentContent()))
      )
    );
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isOpened]);

  if (!editing && clicked) {
    cancel();
    setClicked(false);
  }

  if (!isOpened) {
    return null;
  }

  return (
    <div className="popup-background">
      <div className={s.onlineEditor}>
        <div className={s.time}>
          {dayjs(online.startedDate).format("HH:mm")}
        </div>
        <div>
          <textarea
            className="title"
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
          <div>
            <button className="cancel-button" onClick={cancel}>
              Отмена
            </button>
          </div>
          <div>
            <button
              className="confirm-button"
              onClick={handleEditOnline}
              disabled={editing}
            >
              Изменить
            </button>
            <div className="button-loader">
              {editing && <Loader size="small" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineEditor;
