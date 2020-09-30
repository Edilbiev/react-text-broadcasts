import React, { useEffect, useState } from "react";
import cl from "classnames";
import s from "./postEditor.module.css";
import dayjs from "dayjs";
import { Editor } from "react-draft-wysiwyg";
import Switcher from "../Switcher";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { postEdited } from "../../redux/actions";

function PostEditor({ item, isOpened, cancel }) {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.posts.editing);
  const [postEditor, setPostCEditor] = useState(false);

  const handleEdit = () => dispatch(postEdited(item._id));

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
  });

  const [importance, setImportance] = useState(false);
  const handleSwitch = () => setImportance(!importance);

  // const [clicked, setClicked] = useState(false);

  if (!isOpened) {
    return null;
  }

  return (
    <div className={s.background}>
      <div
        className={cl(s.postCreator, {
          [s.importantPostCreator]: importance,
        })}
      >
        <div className={s.time}>{dayjs(item.createdDate).format("HH:mm")}</div>
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
              <button className={s.cancel} onClick={cancel}>
                Отмена
              </button>
            </div>
            <div>
              <button
                className={s.edit}
                onClick={handleEdit}
                disabled={editing}
              >
                Изменить
              </button>
              <div className={s.loader}>
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
