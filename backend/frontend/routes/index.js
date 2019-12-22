import React from "react";
/* Router */
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Helper } from '../utils';

/* Overwrite */
import routes from "./json/routes";

let { RouteWithSubRoutes } = Helper;


function RouteLink() {
  return (
      <Router>
        <Switch>
          {
            routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))
          }
        </Switch>
      </Router>
  );
}

export default RouteLink;