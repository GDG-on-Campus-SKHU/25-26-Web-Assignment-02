// 루트 재렌더 연결

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { getState, subscribeRender } from "./lib/localdb.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

function renderApp() {
  const state = getState();
  root.render(
    <React.StrictMode>
      <App state={state} />
    </React.StrictMode>
  );
}

renderApp();
subscribeRender(renderApp);
