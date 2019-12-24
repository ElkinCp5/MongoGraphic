import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormLogin from "./forms/login/formSignin"
import FormRegiste from "./forms/register/formSignup"
import { Ecolor} from "../../images";
import "./css/login.css"


class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signin: true,
      signup: false,
      fromSignin: 'active',
      fromSignup: 'not',

    };
  }

  handleClick = e =>{
    let button = e.target.name;
    let signin = this.state.signin;
    let signup = this.state.signup;
    let fromSignin = this.state.fromSignin;
    let fromSignup = this.state.fromSignup;

    if(button == 'signin' && !signin && signup){
      signup = signin; signin = !signin;
      fromSignup = 'not'; fromSignin = 'active'; 
      //console.log('signin', this.state.signin)
    }else if(button == 'signup' && !signup && signin){
      signup = signin; signin = !signin;
      fromSignin = 'not'; fromSignup = 'active'; 
      //console.log('signup', this.state.signup)
    }

    this.setState({
      signin: signin, 
      signup: signup,
      fromSignin: fromSignin,
      fromSignup: fromSignup
    });
  }
  render() {
    return (
      <Standar className="login-page">
          <div className="card-login">
            <div className="logo-login">
              <img src={Ecolor} />
              <div className="tabs-login">
                <ul>
                  <li><Link to="" onClick={this.handleClick} name={'signin'} className={this.state.fromSignin}>Inicio</Link></li>
                  <li><Link to="" onClick={this.handleClick} name={'signup'} className={this.state.fromSignup}>Registrate</Link></li>
                </ul>
              </div>
            </div>
            <div className="container-login">
              { this.state.signin ? <FormLogin />: null }
              { this.state.signup ? <FormRegiste /> : null }
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