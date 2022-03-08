import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
// import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
