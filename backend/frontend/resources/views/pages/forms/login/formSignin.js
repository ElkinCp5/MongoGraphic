import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { auth as authAxios } from '../../../../../services/services' ;
import "../styleForms.css";


function hasErrors(fieldsError){
  return Object.keys(fieldsError).some( field => fieldsError[field]);
}

class NormalLoginForm extends Component {

  componentDidMount(){
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault(); 
    this.props.form.validateFields( (err, values)=>{
      if (!err)
        var info = authAxios.signin(values);
        console.log('Received values of form: ', values);
        console.log('Respuesta:=> ', info);
        
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