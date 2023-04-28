import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./editorStyle.module.scss";
import { useEffect } from "react";

const EditorComponent = ({ setText, text }) => {
  const [editorState, setEditorState] = useState(
    text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (text) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      );
    }
  }, [text]);

  useEffect(() => {
    setText(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }, [editorState, setText]);

  // const _contentState = ContentState.createFromText('Sample content state');
  // const raw = convertToRaw(_contentState);
  // console.log(
  //   EditorState.createWithContent(convertFromRaw(JSON.parse(editorState))),
  //   "asafg"
  // );
  return (
    <div className={styles.mainBox}>
      <Editor
        editorState={editorState}
        toolbarClassName={styles.toolbar}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        onEditorStateChange={(editor) => setEditorState(editor)}
        hashtag={{
          separator: " ",
          trigger: "#",
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "JavaScript", value: "javascript", url: "js" },
            { text: "Golang", value: "golang", url: "go" },
          ],
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: true,
          },
          list: {
            inDropdown: true,
          },
          textAlign: { inDropdown: true },
          link: {
            inDropdown: true,
            showOpenOptionOnHover: true,
          },

          history: { inDropdown: true },
        }}
      />
    </div>
  );
};
export default EditorComponent;
