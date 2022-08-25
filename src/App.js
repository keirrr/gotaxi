// Redux
import { useSelector } from "react-redux";

// Components
import MenuLogout from "./components/menus/MenuLogout";
import MenuLogin from "./components/menus/MenuLogin";
import MenuRegister from "./components/menus/MenuRegister";
import MenuForgetPassword from "./components/menus/MenuForgetPassword";
import MenuProfile from "./components/menus/MenuProfile";

import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  const screen = useSelector((state) => state.menuScreen.screen);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuLogout />} />
        <Route path="login" element={<MenuLogin />} />
        <Route path="register" element={<MenuRegister />} />
        <Route path="recover" element={<MenuForgetPassword />} />
        <Route path="profile" element={<MenuProfile />} />
      </Routes>
    </BrowserRouter>
  );
  // switch (screen) {
  //   case "logout":
  //     return (
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<MenuLogout />} />
  //         </Routes>
  //       </BrowserRouter>
  //     );
  //   case "login":
  //     return (
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="login" element={<MenuLogin />} />
  //         </Routes>
  //       </BrowserRouter>
  //     );
  //   default:
  //     return (
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<MenuLogout />} />
  //           <Outlet />
  //         </Routes>
  //       </BrowserRouter>
  //     );
  // }
}

export default App;
