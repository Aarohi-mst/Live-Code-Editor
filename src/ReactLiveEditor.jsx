import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";

export default function ReactLiveEditor() {
  const [code, setCode] = useState(`
function App() {
  return <h1>Hello React Live</h1>;
}
`);

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const compiled = Babel.transform(code, {
          presets: [["react", { runtime: "classic" }], "env"],
        }).code;

        setSrcDoc(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root"></div>

    <!-- Load React FIRST -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <!-- User code -->
    <script>
      ${compiled}

      // Render the App
      ReactDOM.render(
        React.createElement(App),
        document.getElementById("root")
      );
    <\/script>
  </body>
</html>
        `);
      } catch (err) {
        setSrcDoc(`<pre style="color:red">${err.message}</pre>`);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Editor
        width="50%"
        height="100%"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
      />

      <iframe
        title="preview"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        style={{ width: "50%", border: "none" }}
      />
    </div>
  );
}
