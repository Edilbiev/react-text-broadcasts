import React, {useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dayjs from "dayjs";
import s from "./onlineCreator.module.css";
import BroadcastCreatorButton from "../CreatorButton";
import { onlineCreated } from "../../redux/actions";
import cl from "classnames";
import Loader from "../common/Loader";

function OnlineCreator() {
  const m = useRouteMatch("/admin/add");
  const creating = useSelector((state) => state.onlines.creating);

  const dispatch = useDispatch();
  const [broadcastCreator, setBroadcastCreator] = useState(m);

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);

  const [content, setContent] = useState(EditorState.createEmpty());
  const handleChangeContent = (editorState) => setContent(editorState);

  const [clicked, setClicked] = useState(false);

  const [creatorOpened, setCreatorOpened] = useState(false);

  const handleBroadcastCreator = () => {
    setCreatorOpened(false);
    setBroadcastCreator(!broadcastCreator);
  };

  const isEmpty = content.getCurrentContent().getPlainText().length === 0

  const handleAddBroadcast = () => {
    setClicked(true);
    dispatch(
      onlineCreated(
        title,
        draftToHtml(convertToRaw(content.getCurrentContent()))
      )
    );
  };

  const setEditorReference = (ref) => !creatorOpened && ref?.focus();


  if (!creating && clicked) {
    setTitle("");
    setContent(EditorState.createEmpty());
    setClicked(false);
  }

  if (!broadcastCreator) {
    return (
      <BroadcastCreatorButton
        handleClick={handleBroadcastCreator}
        text="Новая трансляция..."
      />
    );
  }

  return (
    <div className={s.broadcastsCreator}>
      <div className={s.time}>{dayjs(new Date()).format("HH:mm")}</div>
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
      <div className={s.buttons}>
        <div>
          <button className={s.cancel} onClick={handleBroadcastCreator}>
            Отмена
          </button>
        </div>
        <div>
          <button
            className={s.add}
            onClick={handleAddBroadcast}
            disabled={creating || isEmpty}
          >
            Добавить
          </button>
          <div className={s.loader}>
            {creating && <Loader size="small" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineCreator;
