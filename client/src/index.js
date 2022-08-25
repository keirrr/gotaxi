import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./store/store";
import { Provider } from "react-redux";

import MenuLogout from "./components/menus/MenuLogout";
import MenuLogin from "./components/menus/MenuLogin";
import MenuRegister from "./components/menus/MenuRegister";
import MenuForgetPassword from "./components/menus/MenuForgetPassword";
import MenuProfile from "./components/menus/MenuProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <div className="absolute bg-cover h-full w-full bg-[url('https://i.imgur.com/WgW280A.jpeg')]">
      <p> </p>
    </div>
    <App />
  </Provider>
);
