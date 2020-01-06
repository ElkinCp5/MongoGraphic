import React, { Component, useState, useReducer, useEffect  } from "react";
import services from '../../../../../services' ;
import { 
  Form, 
  Icon, 
  Input, 
  Button,
  message, 
  Checkbox }  from 'antd';
import "../styleForms.css";

function hasErrors(fieldsError){
  return Object.keys(fieldsError).some( field => fieldsError[field]);
}

const { authFetch, authAxios } = services;
class NormalLoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      message: false,
      success: false,
      error: false,
      loanding: false
    };
  }


  componentDidMount(){
    //this.props.form.validateFields();
  }
  componentDidUpdate(){
    
  }

  handleSubmit = e => {
    e.preventDefault(); 
    this.props.form.validateFields(async(err, values)=>{
      if (!err){
        const {email, password} = values;
        this.props.stateLogin({loanding: true });
        message.loading('Processing, login request..', 1.5)
        
        authAxios.signin(email, password).then(res=>{
          if(res != undefined && res.message != undefined && res.user != false){
            setTimeout(()=>{
              this.int(res.message);
            }, 1500);
          }else if(!res.user){
            setTimeout(()=>{
              this.uot(res.message);
            }, 1500);
          }

        }).catch(err =>{
          console.error('form axios signi Error', err);
        })
      }
    });
  };

  int(message){
    if(message){
      this.props.stateLogin(
        {
          loanding: true,
          error: false,
          success: true,
          message: message
        });
      setTimeout(()=>this.preproct(this.props), 1000);
    }; 
  }

  uot(message){
    this.props.stateLogin({
      loanding: true,
      error: true,
      success: false,
      message: message
    });
    setTimeout(()=>this.preproct(this.props), 1000);
  }
  
  preproct(props){
    props.showMessage(); 
  }

  render() {
    
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    const { stateLogin, showMessage } = this.props
    //console.log('stateLogin: ', {stateLogin, showMessage} );
    return (

      <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Email"/>)}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>

          <Button type="primary" 
            htmlType="submit" 
            className="login-form-button"
            disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
          
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);