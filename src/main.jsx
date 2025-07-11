


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; 
import router from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-center" />
    </AuthProvider>
  </React.StrictMode>
);
