import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorage from "../services/storage/session"
import services from "../services/index"

let { authAxios } = services;
let { verifyToken, verifyAccount} = authAxios;
let account = (SessionStorage.getAccount() != null) ? SessionStorage.getAccount() : null;
let authentication = SessionStorage.getToken();
let verify = account != null ? JSON.parse(account).verify : false;


let token = async()=>{
  let status = await verifyToken().then(res=>{ let { token } = res;
    if(token == true){ 
      return true
    }else{ 
      return false
    } 

  }).catch(err =>{
    return false;
  })
  console.log({token: status });
  
  return status;
  
}

let _account = async()=>{
  let status = await verifyAccount().then(res=>{ let { verify } = res;
    if(verify == true){  return true
    }else{  return false } 

  }).catch(err =>{
    return false;
  })
  console.log({account: status });
  
  return status;
}

authentication = (authentication != undefined) ? authentication : false;
verify        = (verify != undefined) ? verify : false;

console.log('Helper:= ',
  {authentication,  verify}
)

const PrivateRoute =({children, ...rest})=>{
  let { isAuthentication, isVerify, path} = rest;
  console.log({rest});
  return (
    <Route {...rest} render={
        ({ location }) =>{
          if(isAuthentication && isVerify){
            return children 
          }else if(isAuthentication && !isVerify && path != '/account-verify'){
            return (
              <Redirect to={{
                pathname: "/account-verify",
                state: { from: location }
              }}/>);
          }else if(!isAuthentication  && path != '/'){
            return (
              <Redirect to={{
                pathname: "/",
                state: { from: location }
              }}/>);
          }else{
            return children 
          }
        }  
      }
    />
  );
}


const RouteWithSubRoutes = route => {
  let isAuth = route.isAuth != undefined ? route.isAuth : false;
  //console.log('RouteWithSubRoutes: ',route)
  if(isAuth ){
    return (
      <PrivateRoute isAuthentication={authentication} isVerify={verify} path={route.path} >
        <Route path={route.path}
          render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
          )}
        />
      </PrivateRoute>
    )
  }else if(!isAuth && authentication){
    return (
    <Route>
        <Redirect to="/dashboard"/>
    </Route>);
  }else if(!isAuth && !authentication){
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

/*
const RouteWithSubRoutes = route => {
  //console.log('RouteWithSubRoutes: ',route)
  if((route.isAuth !== undefined) && verify && route.isAuth){
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
  }else if(!authentication && !verify && !route.isAuth ){
    return (
      <Route path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }else if(authentication && !verify && !route.isAuth){
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
*/
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