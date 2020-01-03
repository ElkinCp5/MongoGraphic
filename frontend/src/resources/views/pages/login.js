import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import { Button, message } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormLogin from "./forms/login/formSignin";
import { Ecolor} from "../../images";
import "./css/login.css"

class Login extends Component {
  
  constructor(props) {

    super(props);
    this.state = {
      isRedirect: false,
      loanding: false,
      message: false,
      success: false,
      error: false
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleRedirectTo = this.handleRedirectTo.bind(this); 
  }

  componentDidUpdate(){
    if(this.state.isRedirect){
      console.log(this.state.isRedirect);
      window.location.reload();
      //this.props.history.push('/dashboard');
    }
  }

  handleState =(state)=>{
    this.setState({
      isRedirect: state.isRedirect || this.state.isRedirect,
      loanding: state.loanding || this.state.loanding,
      message: state.message || this.state.message,
      success: state.success || this.state.success,
      error: state.error || this.state.error
    })
  }

  handleMessage(){
    let success     = this.state.success,
        error       = this.state.error, 
        messageInfo = this.state.message, 
        loanding    = this.state.loanding;

    if(error && loanding){ 
      message.error(messageInfo);
    };

    if(success && loanding){
      message.success(messageInfo);
    };

    setTimeout(this.handleRedirectTo(), 2000);
  }

  handleRedirectTo(){
    this.setState({
      isRedirect: true,
      loading: false
    })
  }
  
  render() {
    const { history, location} = this.props
    
    return (
      <Standar className="login-page">
          <div className={this.state.loanding ? 'loanding' : ''} />
          <div className="card-login">
            <div className="logo-login">
              <img src={Ecolor} />
              <div className="tabs-login">
                <ul>
                  <li><Link to="/" className="active">Inicio</Link></li>
                  <li><Link to="/signup">Registrate</Link></li>
                </ul>
              </div>
            </div>
            <div className="container-login">
              <FormLogin stateLogin={this.handleState} showMessage={this.handleMessage} />
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