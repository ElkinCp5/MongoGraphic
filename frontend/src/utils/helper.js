import React from "react";
import { Route, Redirect } from "react-router-dom";
import SessionStorage from "../services/storage/session"
import services from "../services/index"

let { authAxios } = services;
let { verifyToken, verifyAccount} = authAxios;
let account = (SessionStorage.getAccount() != null) ? SessionStorage.getAccount() : null;
let authentication = SessionStorage.getToken();
let verify = account != null ? JSON.parse(account).verify : false;
console.log('account: ', verify);

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

const PrivateRoute = ({ children, ...rest })=>{
  return (
    <Route {...rest} render={({ location }) =>
        (authentication) ? (
          (verify) ?
          children : 
          <Redirect to={{
            pathname: "/account-verify",
            state: { from: location }
          }}
        />
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

const verifyRoute = ({...rest })=>{
  return (
    <Route {...rest} render={({ location }) =>
          <Redirect to={{
              pathname: "/account-verify",
              state: { from: location }
            }}
          />
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
const validerUndefined=(valider)=>{
  return (valider.isAuth          !== undefined &&
          valider.isVerify        !== undefined &&
          valider.authentication !== undefined
          );
} 
const RouteWithSubRoutes = route => {
  let isAuth = route.isAuth != undefined ? route.isAuth : false;
  //console.log('RouteWithSubRoutes: ',route)
  if( verify && isAuth && authentication){
    return (
      <h1>Hola primer si </h1>
    );
  }else if(!authentication && !verify && !route.isAuth ){
    return (
      <h1>Hola segundo si</h1>
    );
  }else if(authentication && !verify && !route.isAuth){
    return (
      <h1>Hola tercer si</h1>
    );
  }else if(authentication && !verify && route.isAuth){
    return (
      <verifyRoute />
    );
  }else{
    return (
      <h1>Hola Final else</h1>
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