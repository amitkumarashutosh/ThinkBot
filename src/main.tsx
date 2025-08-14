import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NhostProvider } from "@nhost/react";
import App from "./App.tsx";
import "./index.css";
import { nhost } from "./lib/nhost.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>
  </StrictMode>
);
