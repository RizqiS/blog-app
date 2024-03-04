import React from "react";
import ReactDOM from "react-dom/client";
import BlogAppRouter from "./BlogAppRouter.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BlogAppRouter />
  </React.StrictMode>
);
