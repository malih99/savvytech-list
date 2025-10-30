import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
  </React.StrictMode>
);
