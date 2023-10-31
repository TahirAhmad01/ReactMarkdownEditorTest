import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const EditorWithPreview = () => {
  const [content, setContent] = useState("");
  console.log(content);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["image", "link"],

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

    return nodes.map((node, index) => {
      if (
        (node.nodeName === "PRE" && node.classList.contains("ql-syntax")) ||
        (node.nodeName === "CODE" &&
          node.classList.contains("custom-code-class"))
      ) {
        return (
          <div key={index} className="my-3">
            <span className="text-xs font-bold text-gray-500">Code</span>
            <SyntaxHighlighter
              language="javascript"
              style={a11yDark}
              wrapLines={true}
              showLineNumbers={true}
              key={index}
              className="rounded-md overflow-hidden"
            >
              {node.textContent}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // Render other nodes as they are

        return (
          <ReactQuill
            key={index}
            // dangerouslySetInnerHTML={{ __html: node.outerHTML }}
            modules={{
              toolbar: false,
            }}
            value={node.outerHTML}
            readOnly={true}
            style={{}}
            theme="snow"
          />
        );
      }
    });
  };

  return (
    <div className="grid grid-cols-2 h-screen pt-10 gap-6">
      <div>
        <h2>Editor</h2>
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          value={content}
          onChange={handleEditorChange}
          className="h-[calc(100%-10rem)]"
        />
      </div>
      <div className="">
        <h2>Preview</h2>
        <div className="border-2 rounded-md p-3 react-custom-quill">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default EditorWithPreview;
