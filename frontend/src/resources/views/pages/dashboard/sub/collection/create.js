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
  InputNumber,
  Switch,
  Tree ,
  Radio,
  Checkbox,
  Divider,
  Modal,
  Alert
} from "antd";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";
import SelectDefault from "../../../../../../components/select/selectTypeDafault";
import TreeDynamic from "../../../../../../components/tree/treeDynamicField";

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

const InputGroup = Input.Group;
const { TreeNode } = Tree;
let nuewField; 

function FormRow(props){
  const { fields } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const listField = fields.map((field, index)=> 
  <div className='row-filds' key={index.toString()}>
    <Row>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item label="Field name" {...(formItemLayout)} style={{ paddingRight: 4 }} required={false} >
          { 
            <Input placeholder="field name" defaultValue={field.name} />
          }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item label="Select a type " {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <SelectDefault defaultValue={field.type} placeholder={'Select a type data'}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Required: ", <Switch checkedChildren="true" unCheckedChildren="false" required={false}/>]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Minimum: ", <InputNumber  min={1} />]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Maximum: ", <InputNumber  min={1} />]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      
    </Row>
    {
      /*getFieldValue('keys').length > 0 ? (
        <div style={{
          textAlign: "right",
          display: 'block',
          width: '100%',
          padding: '5px'
          }}>
          <Icon
            style={{
              fontSize: "24px"
            }}
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => {
              this.remove(k); console.log(k)
            }}
          />
        </div>
      ) : null */
    }
  </div>
  );
  return (listField);
}
  

class DynamicFieldSet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newFiled: {},

      modalConfigFild: false,
      collapsed: false,

      model: { name: undefined, structure: [], },
      banner:{
        visible: false,
        message: 'Error'
      }
    };
    this.id = 0;
    this.handleProcessFieldStructure = this.handleProcessFieldStructure.bind(this);
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

  handleAddField = () => {
    const { name, structure } = this.state.model;
    if(name && name != undefined && name != ''){

    }else{
      this.setState({
        banner:{
          visible: true,
          message: 'Error: structure name modal is undefined'
        }
      });
    }
  };

  handleModalOK = async() => {
    const { name } = this.state.model;
    if(name && name != undefined && name != ''){
      if( typeof nuewField == 'object'){
        await this.setState(state => {
          const structure  = state.model.structure.push(nuewField);
          return {
            modalConfigFild: !state.modalConfigFild,
            structure
          }
        });
        console.log('true new: ', nuewField);
        nuewField = undefined;
      }
    }else{
      await this.setState({
        banner:{
          visible: true,
          message: 'Error: structure name modal is undefined'
        }
      });
      nuewField = undefined;
    }
  };
  handleModal = async() => {
    await this.setState({ 
      modalConfigFild: !this.state.modalConfigFild
    });
    nuewField = undefined;
  };

  handleChange(e) {
    e.persist();
    this.setState(state => ({
      ...state,
      model: {
        ...state.model,
        name: e.target.value
      },
      banner:{
        visible: false,
        message: false
      }
    }));
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

  handleProcessFieldStructure(field){
    const { name, params } = field;
    nuewField = {} = params;
    //console.log(nuewField);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  render() {
    let { routes } = this.props;
    let { model }= this.state;
    let { name, structure }= model;

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      /*wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      }*/
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24},
        sm: { span: 8},
        md: { span: 6},
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
 
    return (
      <div className='input-create-schema'>
        { 
          (this.state.banner.visible) ?
            <Alert 
              message={this.state.banner.message} 
              banner
            />
          : null
        }
        <Title toBack={false} 
        title={`New collection: ${name }`}
          headsubTitle ={`${structure.length} ${structure.length >1 ? 'fields' : 'fild'} of`}
          subTitle={`${name }`}
        />
        <div className="container-page">
          <div style={{ padding: '20px', backgroundColor: '#CCC'}}>
            <pre className="language-bash">{JSON.stringify(model, null, 2)}</pre>
          </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
          <div style={{ marginBottom: 16 }}>
            <Input onChange={
              (e)=> this.handleChange(e)
            } 
              addonBefore="Collection name is: "
              placeholder={'model or collection name'}
            />
          </div>
          </Form.Item>
          <FormRow fields={structure}/>
          
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.handleModal.bind(this)} style={{ width: '100%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel} >
            <Button type="primary" htmlType="submit" >
              Create model
            </Button>
          </Form.Item>
        </Form>
        {(this.state.modalConfigFild) ?<Modal
        style={{ top: 20 }}
          title={`Advanced validations`}
          visible={this.state.modalConfigFild}
          onOk={this.handleModalOK.bind(this)}
          onCancel={this.handleModal.bind(this)}
        >
          <TreeDynamic initialize={{}} 
          onProcessField={this.handleProcessFieldStructure}/>
        </Modal> : null}
        </div>
      </div>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet;


/*
  <div className='row-filds' key={index}>
    <Row>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item label="Field name" {...(formItemLayout)} style={{ paddingRight: 4 }} required={false} >
          { 
            getFieldDecorator(`names[${k}]`, rulesInputFieldName)
            (<Input placeholder="field name" defaultValue={field.name} />)
          }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item label="Select a type " {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <SelectDefault defaultValue='String' placeholder={'Select a type data'}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Required: ", <Switch checkedChildren="true" unCheckedChildren="false" required={false}/>]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Minimum: ", <InputNumber  min={1} />]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      <Col xs={24} sm={8} md={6} lg={5}>
        <Form.Item 
        label={["Maximum: ", <InputNumber  min={1} />]} 
        {...(formItemLayout)} style={{ paddingRight: 4 }}  required={false} >
        {
          <Input placeholder={'validation of meassege'} style={{ paddingRight: 4 }} required={false}/>
        }
        </Form.Item>
      </Col>
      
    </Row>
    {
      getFieldValue('keys').length > 0 ? (
        <div style={{
          textAlign: "right",
          display: 'block',
          width: '100%',
          padding: '5px'
          }}>
          <Icon
            style={{
              fontSize: "24px"
            }}
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => {
              this.remove(k); console.log(k)
            }}
          />
        </div>
      ) : null
    }
</div>
*/