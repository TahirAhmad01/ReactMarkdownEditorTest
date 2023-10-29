import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "highlight.js/styles/dracula.css"; // Include the highlight.js style

const MyEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <div>
      <h2>React Quill Editor</h2>
      <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
      <h2>Highlighted Code</h2>
      <SyntaxHighlighter language="javascript" style={docco}>
        {editorHtml}
      </SyntaxHighlighter>
    </div>
  );
};

export default MyEditor;
