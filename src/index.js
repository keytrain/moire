import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router, Route } from "react-router-dom";

import Wrapper from "./components/Wrapper";

ReactDOM.render(
  <Router>
    <Route path="/" component={Wrapper} />
  </Router>,
  document.getElementById("root")
);
