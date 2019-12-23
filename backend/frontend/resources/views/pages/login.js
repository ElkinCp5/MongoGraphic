import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Icon, Tooltip, Form, Input, Button, Checkbox } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormLogin from "./forms/login/formSignin"
import FormRegiste from "./forms/register/formSignup"
import { Ecolor} from "../../images";
import "./css/login.css"


class Login extends Component {
  render() {
    return (
      <Standar className="login-page">
          <div className="card-login">
            <div className="logo-login">
              <img src={Ecolor} />
              <div className="tabs-login">
                <ul>
                  <li><Link to="" className="active">Inicio</Link></li>
                  <li><Link to="">Registrate</Link></li>
                </ul>
              </div>
            </div>
            <div className="container-login">
              <FormLogin />
              <div className="footer-login">
                <Button shape="circle" icon="google" />
                <Button shape="circle" icon="windows" />
                <Button shape="circle" icon="linkedin" />
              </div>
            </div>
          </div>
      </Standar>
    );
  }
}

export default Login;