import React, { Component, useState, useReducer, useEffect  } from "react";
import services from '../../../../../services' ;
import {
  Form, 
  Icon, 
  Input, 
  Button,
  message, 
  Checkbox,
  Tooltip,
} from 'antd';
import "../styleForms.css";

function hasErrors(fieldsError){
  return Object.keys(fieldsError).some( field => fieldsError[field]);
}

const { authFetch, authAxios } = services;
class RegistrationForm extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  componentDidMount(){
    //this.props.form.validateFields();
  }
  componentDidUpdate(){
    
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {email, password, name} = values;
        this.props.stateLogin({loanding: true });
        message.loading('Processing, login request..', 1.5)
        
        authAxios.signup(email, password, name).then(res=>{
          if(res != undefined && res.message != undefined && res.user != false){
            setTimeout(()=>{
              this.int(res.message);
            }, 1000);
          }else if(!res.user){
            setTimeout(()=>{
              this.uot(res.message);
            }, 1000);
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

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    const nameError = isFieldTouched('name') && getFieldError('name');
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
            prefix={<Icon type="mail" 
            style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="email o correo"/> )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [
              {
                min: 6,
                message: 'Your password is very short, minimum of 6',
              },
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password" />)}
        </Form.Item>
        <Form.Item validateStatus={confirmError ? 'error' : ''} help={confirmError || ''}>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="confirm Password"
            onBlur={this.handleConfirmBlur} 
            />)}
        </Form.Item>
        <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {getFieldDecorator('name', {
            rules: [
              {
                min: 3,
                message: 'minimum of caratares allowed',
              },
              {
                max: 10,
                message: 'maximum of caratares allowed',
              },
              { 
                required: true,
                message: 'Please input your name!', 
                whitespace: true 
              }
            ],
          })(<Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="name"
            />)}
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-form-button"
            disabled={hasErrors(getFieldsError())}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'signup' })(RegistrationForm);