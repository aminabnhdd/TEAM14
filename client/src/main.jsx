import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Add this line to import the App component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode> 
);
