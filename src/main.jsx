// import { configDotenv } from "dotenv";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  // </StrictMode>
);
