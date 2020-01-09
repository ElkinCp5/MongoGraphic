import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, message, } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormRegiste from "./forms/register/formSignup";
import { Ecolor} from "../../images";
import "./css/login.css";


class Signup extends Component {
  
  constructor(props) {

    super(props);
    this.state = {
      isRedirect: false,
      loanding: false,
      message: false,
      success: false,
      error: false
    };
    this.handleMessage    = this.handleMessage.bind(this);
    this.handleState      = this.handleState.bind(this);
    this.handleRedirectTo = this.handleRedirectTo.bind(this); 
    this.handleLoading    = this.handleLoading.bind(this); 
  }
  componentDidUpdate(){
    if(this.state.isRedirect){
      window.location.reload();
    }
  }

  handleState =(state)=>{
    this.setState({
      isRedirect: state.isRedirect,
      loanding: state.loanding,
      message: state.message,
      success: state.success,
      error: state.error
    })
    console.log({state: state});
  }

  handleMessage(){
    let success     = this.state.success,
        error       = this.state.error, 
        messageInfo = this.state.message, 
        loanding    = this.state.loanding;

    if(error && loanding){ 
      message.error(messageInfo);
    }else if(success && loanding){
      message.success(messageInfo);
      setTimeout(()=>this.handleRedirectTo(), 2500);
    };
    console.log({thisState: this.state});
    
    setTimeout(()=> this.handleLoading(), 3000);
  }

  handleRedirectTo(){
    this.setState({ isRedirect: true})
  }

  handleLoading(){
    this.setState({ loanding: false });
  }
  render() {
    const { loanding } = this.state
    return (
      <Standar className="login-page">
        <div className={loanding ? 'loanding' : ''} />
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
              <FormRegiste stateLogin={this.handleState} showMessage={this.handleMessage} />
            </div>
          </div>
      </Standar>
    );
  }
}

export default Signup;