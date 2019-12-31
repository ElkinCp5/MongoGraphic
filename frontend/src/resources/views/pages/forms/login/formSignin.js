import auth from '../../../../../services/signin' ;
import { messageSimple } from '../../../../../components/message';
import React, { Component, useState, useReducer, useEffect  } from "react";
import {axios as Axios} from '../../../../../utils';
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

const success = (text) => {
  return message.success(text || 'This is a success message');    
};

const { signin } = auth;
class NormalLoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signin: true,
      data: false,
      success: false,
      error: false,
      loanding: false
    };
  }


  componentDidMount(){
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault(); 
    this.props.form.validateFields(async(err, values)=>{
      if (!err){
        const {email, password} = values;
        var url = 'http://localhost:8080/api/auth/signin';
        var data = {email, password};

            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then(function(response) {
              console.log('response',response)
            }).catch(error => console.error('Error:', error))
      }
    });
  };


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

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
              placeholder="E-mail o correo"/>)}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
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