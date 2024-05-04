import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";

import App from "./components/App";
import Discord from "./components/Discord";
import Reader from "./components/Reader";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Router>
    <Switch>
      <Route exact path="/discord" component={Discord} />
      <Route exact path="/r/:series/:chapter/:page" component={Reader} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
