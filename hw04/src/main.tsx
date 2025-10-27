// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store";

// 훅 없이 전역 store 구독 → 수동 리렌더
const root = ReactDOM.createRoot(document.getElementById("root")!);

function render() {
  root.render(
    <React.StrictMode>
      <App data={store.getSnapshot()} actions={store.actions} />
    </React.StrictMode>
  );
}

// 변경 시마다 다시 그리기
store.subscribe(render);

// 최초 1회 렌더
render();
