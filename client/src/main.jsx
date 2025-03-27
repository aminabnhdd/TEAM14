import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Add this line to import the App component

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode> 
);
