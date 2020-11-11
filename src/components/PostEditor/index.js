import React, { useEffect, useState } from "react";
import cl from "classnames";
import s from "./postEditor.module.css";
import dayjs from "dayjs";
import { Editor } from "react-draft-wysiwyg";
import Switcher from "../Switcher";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { postEdited } from "../../redux/ducks/posts";
import draftToHtml from "draftjs-to-html";

function PostEditor({ item, isOpened, cancel }) {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.posts.editing);

  const blocksFromHtml = htmlToDraft(item.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);

  const [title, setTitle] = useState(item.title);
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(editorState);
  const handleChangeContent = (editorState) => setContent(editorState);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isOpened]);

  const [importance, setImportance] = useState(false);
  const handleSwitch = () => setImportance(!importance);

  const [clicked, setClicked] = useState(false);

  const handleEdit = () => {
    setClicked(true);
    dispatch(
      postEdited(
        item._id,
        title,
        draftToHtml(convertToRaw(content.getCurrentContent())),
        importance
      )
    );
  }

  if (!editing && clicked) {
    cancel();
    setClicked(false);
  }

  if (!isOpened) {
    return null;
  }

  return (
    <div className="popup-background">
      <div
        className={cl(s.postEditor, {
          [s.importantPostEditor]: importance,
        })}
      >
        <div className={s.time}>{dayjs(item.createdDate).format("HH:mm")}</div>
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
        <div className={s.handlers}>
          <div>
            <Switcher
              defaultValue={importance}
              onSwitchedOff={handleSwitch}
              onSwitchedOn={handleSwitch}
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
                onClick={handleEdit}
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
    </div>
  );
}

export default PostEditor;