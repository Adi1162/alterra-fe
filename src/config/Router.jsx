import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import MainApp from "../pages/MainApp";
import Register from "../pages/Register";
import PrivateRoutes from "../pages/PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <MainApp />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
