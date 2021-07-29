// wdyr 要在第一引入
import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira 之后引入antd
import "antd/dist/antd.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProviders from "context";
import { Profiler } from "components/profiler";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <Profiler id="RootAPP" phases={["mount"]}>
          <App />
        </Profiler>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
