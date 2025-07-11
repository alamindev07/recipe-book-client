


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; 
import router from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
   
<AuthProvider>
  <ThemeProvider>
  <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-center" />
  </ThemeProvider>
    
    </AuthProvider>
   
  </React.StrictMode>
);
