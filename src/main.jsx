


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; 
import router from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
   
<HelmetProvider>
   <AuthProvider>
  <ThemeProvider>
  <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-center" />
  </ThemeProvider>
    
    </AuthProvider>
  </HelmetProvider>
   
  </React.StrictMode>
);
