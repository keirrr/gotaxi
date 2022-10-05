// Redux
import { useSelector } from "react-redux";

// Components
import MenuLogout from "./components/menus/MenuLogout";
import MenuLogin from "./components/menus/MenuLogin";
import MenuRegister from "./components/menus/MenuRegister";
import MenuForgetPassword from "./components/menus/MenuForgetPassword";
import MenuProfile from "./components/menus/MenuProfile";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import isUserLogin from './features/isUserLogin'

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuLogout />} />
        <Route path="login" element={<MenuLogin />} />
        <Route path="register" element={<MenuRegister />} />
        <Route path="recover" element={<MenuForgetPassword />} />
        <Route path="profile" element={<MenuProfile />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
