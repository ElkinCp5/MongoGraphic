import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormRegiste from "./forms/register/formSignup";
import { Ecolor} from "../../images";
import "./css/login.css"


class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signin: true,
      signup: false,
      fromSignin: 'active',
      fromSignup: 'not',

    };
  }

  render() {
    return (
      <Standar className="login-page">
          <div className="card-auth signup">
            <div className="logo-auth">
              <img src={Ecolor} />
              <div className="tabs-auth">
                <ul>
                  <li><Link to="/" className="not">Inicio</Link></li>
                  <li><Link to="/signup" className="active">Registrate</Link></li>
                </ul>
              </div>
            </div>
            <div className="container-auth">
              <FormRegiste />
              <div className="footer-auth">
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

export default Signup;