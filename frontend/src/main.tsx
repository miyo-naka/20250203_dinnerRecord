import { StrictMode } from "react"; //開発用のデバッグ機能
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx"; //アプリのメインコンポーネント

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
