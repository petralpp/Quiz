import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupStore } from "./store/store.ts";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </StrictMode>
);
