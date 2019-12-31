import React from "react";
import { Route, Redirect } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: sessionStorage.getItem('session') ? true : false,
};

const PrivateRoute = ({ children, ...rest })=>{
  return (
    <Route {...rest} render={({ location }) =>
        (fakeAuth.isAuthenticated) ? (
          children
        ) : (
          <Redirect to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const NotSessionRoute = ({...rest })=>{
  return (
    <Route {...rest} render={({ location }) =>
          <Redirect to={{
              pathname: "/dashboard",
              state: { from: location }
            }}
          />
      }
    />
  );
}

const RouteWithSubRoutes = route => {
  //console.log('RouteWithSubRoutes: ',route)
  if((route.isAuth !== undefined) && route.isAuth){
    return (
      <PrivateRoute>
        <Route path={route.path}
          render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
          )}
        />
      </PrivateRoute>
    );
  }else if(!fakeAuth.isAuthenticated && !route.isAuth){
    return (
      <Route path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }else if(fakeAuth.isAuthenticated && !route.isAuth){
    return (
      <NotSessionRoute />
    );
  }else{
    return (
      <Route path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
}

const buttonToHistory = (history, url) => {
  /*this.props.history.push({to: url});*/
  history.push(url);
  console.log( history, url)
}

const parseFormData = params => {
  const formData = new FormData();
  for (var s in params) {
    formData.append(s, params[s]);
  }
  return formData;
}



export default {parseFormData, RouteWithSubRoutes, buttonToHistory};