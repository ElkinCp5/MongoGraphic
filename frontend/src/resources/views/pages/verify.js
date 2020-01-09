import React, { Component } from "react";
/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import {  
  Alert,
  message,
  Button, 
  Row,
  Col
} from "antd";
import './css/verify.css';
import { Ecolor} from "../../images";
import SessionStorage from "../../../services/storage/session";
import services from '../../../services' ;

let account = (SessionStorage.getAccount() != null) ? JSON.parse(SessionStorage.getAccount()) : null;

const { authFetch, authAxios } = services;
class Verify extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isRedirect: false,
      loanding: false,
      message: false,
      success: true,
      error: false
    };
    this.handleMessage    = this.handleMessage.bind(this);
  }

  handleReset = e => {
    this.setState({loanding: true, success: false, error: false });
    message.loading('Processing, login request..', 1.5)
    authAxios.reset().then(res=>{
        if(res.user){
          setTimeout(()=>{ this.int(res.message) }, 1000);
        }else if(!res.user){
          setTimeout(()=>{ this.uot(res.message) }, 1000);
        }
      }).catch(err =>{
          console.error('form axios reset error: ', err);
      })
  };

  handleValidate = e => {
    this.setState({loanding: true, success: false, error: false });
    message.loading('Processing, login request..', 1.5)
    authAxios.verify().then(res=>{
        if(res.user){
          setTimeout(()=>{ this.int_verify(res.message) }, 1000);
        }else if(!res.user){
          setTimeout(()=>{ this.uot(res.message) }, 1000);
        }
      }).catch(err =>{
          console.error('form axios reset error: ', err);
      })
  };

  componentDidUpdate(){
    if(this.state.isRedirect){
      window.location.reload();
    }
  }

  int_verify(message){
    if(message){
      this.setState(
        {
          success: true,
          message: message
        });
      setTimeout(()=> {this.handleMessage(true)}, 1000);
    }; 
  }

  int(message){
    if(message){
      this.setState(
        {
          error: false,
          success: true,
          message: message
        });
      setTimeout(()=> {this.handleMessage()}, 1000);
    }; 
  }

  uot(message){
    this.setState({
      error: true,
      success: false,
      message: message
    });
    setTimeout(()=> {this.handleMessage()}, 1000);
  }

  handleMessage( verify = false){
    let success     = this.state.success,
        error       = this.state.error, 
        messageInfo = this.state.message, 
        loanding    = this.state.loanding;

    if(error && loanding){ 
      message.error(messageInfo);
    }else if(success && loanding){
      message.success(messageInfo);
      if(verify){setTimeout(()=> { this.handleRedirectTo() }, 3000)};
    };
    setTimeout(()=> { this.setState({ loanding: false, }) }, 3000);
    console.log({thisState: this.state});
    
  }

  handleRedirectTo(){
    this.setState({ isRedirect: true})
  }

  
  render() {
    const { loanding, success, error } = this.state;
    const { history } = this.props;
    console.log({account})
    if(account.verify){
      history.push("/dashboard");
    }
    return (
      <Standar className="login-page">
          <div className={loanding ? 'loanding' : ''} />
          <div className="card-auth verify">
            <div className="logo-auth">
              <img src={Ecolor} />
            </div>
            <div className="container-auth" style={{
              textAlign: "center"
            }}>
              <h2>Email verification</h2>
              {
                (success) ?
                  <Alert
                    message="Mail has been sent!"
                    description={`Email verification mail has been sent! to ${account.email}`}
                    type="success"
                    closable
                    
                  /> : null
              }
              {
                (error) ?
                  <Alert
                    message="Mail has been sent!"
                    description={`Email verification mail has been sent! to ${account.email}`}
                    type="error"
                    closable
                    
                  /> : null
              }
              <p>
                if you cannot find the verification mail in the inbox folder, 
                please check the junk o Spam folder
              </p>
              <p style={{
                textAlign:"left"
              }}>
                <small>To verify your account, click on the <strong>"validate"</strong> button</small><br />
                <small>To send a new verification, click on the <strong>"reset"</strong> button</small>
              </p>
              
              <Button type="primary" onClick={this.handleValidate}>
                  validate 
              </Button>
              <Button type="primary" onClick={this.handleReset}>
                  reset 
              </Button>
            </div>
          </div>
      </Standar>

    );
  }
}

export default Verify;