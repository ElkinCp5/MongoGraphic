import React, { Component } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Icon, 
  Tooltip, 
  Form,
  Button, 
  Input, 
  Checkbox 
} from "antd";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";
import SelectDefault from "../../../../../../components/select/selectTypeDafault"

const rulesInputFieldName = {
  validateTrigger: ['onChange', 'onBlur'],
  rules: [
    {
      required: true,
      whitespace: true,
      message: "Please input passenger's name or delete this field.",
    },
  ],
}

class DynamicFieldSet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.id = 0;
  }
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++this.id);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };
  render() {
    let { routes } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {

      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 11 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <div key={k}>
        <Form.Item {...(formItemLayout)} required={false} >
          { 
            getFieldDecorator(`names[${k}]`, rulesInputFieldName)
            (<Input placeholder="field name" style={{ width: '60%', marginRight: 8 }} />)
          }
        </Form.Item>
          <Form.Item {...(formItemLayout)} required={false} >
          {
            <SelectDefault defaultValue='String' placeholder={'Select a type data'}/>
          }
        </Form.Item>
        {
          getFieldValue('keys').length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => {this.remove(k); console.log(k)}}
            />
          ) : null
        }
      </div>
    ));

    
    return (
      <div>
        <Title toBack={false} title="Tablero" subTitle="Cuadrilla para diligenciar tu hoja de vida" />
        <div className="container-page">
        <Form onSubmit={this.handleSubmit}>
        {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      </div>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet;