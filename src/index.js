import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop "

import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>

  <ScrollToTop />
  <App />
  </BrowserRouter>
 
    );

    