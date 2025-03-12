import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";
import QueryProvider from "./lib/providers/query-provider";
import "./styles/index.css";

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </StrictMode>
  );
}
