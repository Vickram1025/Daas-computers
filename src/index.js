import ReactDOM from "react-dom/client";
import "./index.css";           // Tailwind CSS + custom styles
import "./App.css";             // Your app-specific styles
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop "; // ✅ Removed extra space
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render app
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
    <ToastContainer 
      autoClose={2000} 
      className="toast-position" 
    />
  </BrowserRouter>
);
