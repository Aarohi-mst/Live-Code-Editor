import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const LiveCodeEditor = () => {
  const [html, setHtml] = useState("<h1>Hello React Sandbox!</h1>");
  const [css, setCss] = useState("body { font-family: sans-serif; }");
  const [js, setJs] = useState("console.log('Live JS');");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const safeJs = js.replace(/<\/script>/gi, "<\\/script>");

    const timeout = setTimeout(() => {
      setSrcDoc(`
            <!Doctype html>
            <html>
            <head>
            <style>${css}</style>
            </head>
            <body>
            ${html}
            <script>
               ${safeJs}
            </script>
            </body>
            </html>
            `);
    }, 300);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "50%" }}>
        <Editor
          height="33%"
          defaultLanguage="html"
          value={html}
          onChange={setHtml}
          theme="vs-dark"
        />
        <br />
        <br />
        <Editor
          height="33%"
          defaultLanguage="css"
          value={css}
          onChange={setCss}
          theme="vs-dark"
        />{" "}
        <br />
        <br />
        <Editor
          height="34%"
          defaultLanguage="javascript"
          value={js}
          onChange={setJs}
          theme="vs-dark"
        />{" "}
        <br />
        <br />
      </div>
      <iframe
        title="preview"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        style={{
          width: "50%",
          border: "none",
          background: "white",
        }}
      />{" "}
      <br />
      <br />
    </div>
  );
};

export default LiveCodeEditor;
