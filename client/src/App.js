// Components
import MenuLogout from "./components/menus/MenuLogout";
import MenuLogin from "./components/menus/MenuLogin";
import MenuRegister from "./components/menus/MenuRegister";
import MenuForgetPassword from "./components/menus/MenuForgetPassword";
import MenuProfile from "./components/menus/MenuProfile";
import ProfileEdit from "./components/menus/ProfileEdit";
import ProfileOrdersHistory from "./components/menus/ProfileOrdersHistory";
import MenuOrderConfirm from "./components/menus/MenuOrderConfirm";
import MenuOrderWaiting from "./components/menus/MenuOrderWaiting";

import NotificationElem from "./features/notificationElem";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

// Import Redux and notificationSlice
import { useSelector, useDispatch } from "react-redux";
import { clearContent } from "./store/notificationSlice";

import "./App.css";

const App = () => {
  // Read content of notification from its Slice
  const content = useSelector((state) => state.notification.content);
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (content === "") {
      setShowNotification(false);
    } else {
      setShowNotification(true);
      setTimeout(() => {
        dispatch(clearContent());
        setShowNotification(false);
      }, 3000);
    }
  }, [content, showNotification, dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MenuLogout />} />
        <Route path="login" element={<MenuLogin />} />
        <Route path="register" element={<MenuRegister />} />
        <Route path="recover" element={<MenuForgetPassword />} />
        <Route path="profile" element={<MenuProfile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/orders" element={<ProfileOrdersHistory />} />
        <Route path="/order/confirm" element={<MenuOrderConfirm />} />
        <Route path="/order/waiting" element={<MenuOrderWaiting />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showNotification && <NotificationElem content={content} />}
    </HashRouter>
  );
};

export default App;
