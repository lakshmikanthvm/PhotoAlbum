import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from './components/NotFound';
import FacebookButton from './components/FacebookButton'; 

export default ({ childProps }) =>
  <Switch>
    <Route path="/facebook-connect" component={FacebookButton} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
</Switch>;