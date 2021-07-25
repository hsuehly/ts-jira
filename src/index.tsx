import React from "react";
import ReactDOM from "react-dom";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira 之后引入antd
import "antd/dist/antd.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProviders from "context";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
