import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Provide Redux store to React
import { store } from "./store/store";
import { Provider } from "react-redux";

import Map from "../src/components/map/map";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <div className="relative h-screen w-screen">
      <App />
      <Map />
    </div>
  </Provider>
);
