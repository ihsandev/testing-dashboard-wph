import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";
import "./index.css";

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  );
}
