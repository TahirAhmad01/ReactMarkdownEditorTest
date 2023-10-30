import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const EditorWithPreview = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (value) => {
    setContent(value);
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

  const renderPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);
    const highlightedNodes = nodes.map((node, index) => {
      if (node.nodeName === "PRE" && node.classList.contains("ql-syntax")) {
        return (
          <SyntaxHighlighter language="javascript" style={docco} key={index}>
            {node.textContent}
          </SyntaxHighlighter>
        );
      } else {
        // Render other nodes as they are
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: content }} />
        );
      }
    });

    return highlightedNodes;
  };

  return (
    <div>
      <div>
        <h2>Editor</h2>
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          value={content}
          onChange={handleEditorChange}
        />
      </div>
      <div>
        <h2>Preview</h2>
        {renderPreview()}
      </div>
    </div>
  );
};

export default EditorWithPreview;
