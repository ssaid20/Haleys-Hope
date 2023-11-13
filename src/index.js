import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./components/App/App";
import "./index.css";

console.log(
  "%cHello",
  "color: green; font-style: italic; background-color: yellow; padding: 4px; border-radius: 5px; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 0px blue;"
);
const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
