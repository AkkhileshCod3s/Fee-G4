import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index2.css"; // Check karo ki yeh exact path pe ho!

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);