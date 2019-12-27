import React, 
{ Component }     from "react";
import { Form, 
  Icon, 
  Input, 
  Button, 
  Checkbox }      from 'antd';
import Auth       from '../../../../../services/signin' ;
import { axios }  from '../../../../../utils';
import "../styleForms.css";


function hasErrors(fieldsError){
  return Object.keys(fieldsError).some( field => fieldsError[field]);
}

class NormalLoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signin: true,
      data: {},
      success: '',
      error: '',
      loanding: false
    };
  }

  componentDidMount(){
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault(); 
    this.props.form.validateFields((err, values)=>{
      if (!err){
        console.log('Received values of form: ', values);
        Auth.signin({
          email: values.email,
          password: values.password
        }).then(data => {
            console.log('Respuesta:=> ', data);
        }).catch(err=>{
            console.error('Auth.signin: ', err); 
        })}
        
      /*axios.post(
          'auth/signin',
          {
            email: values.email,
            password: values.password
          }
      ).the(res=>{
        this.setState({
            data: res.data,
            success: res.message,
            error: res.error
        });
      }).cath(err=>{
        this.setState({
            data: false,
            success: false,
            error: res.error
        });
      })*/
      
        
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