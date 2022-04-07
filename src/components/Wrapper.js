import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "./App";
import Reader from "./Reader";
import Discord from "./Discord";

export default function Wrapper() {
  return (
    <Switch>
      <Route exact path="/discord" component={Discord} />
      <Route exact path="/r/:series/:chapter/:page" component={Reader} />
      <Route path="/" component={App} />
    </Switch>
  );
}
