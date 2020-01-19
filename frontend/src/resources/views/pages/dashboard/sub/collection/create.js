import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
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
  message as boxMessage,
  Modal,
  Alert
} from "antd";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";
import SelectDefault from "../../../../../../components/select/selectTypeDafault";
import TreeDynamic from "../../../../../../components/tree/treeDynamicField";
import services from '../../../../../../services' ;

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

const { modelAxios } = services;
const InputGroup = Input.Group;
const { TreeNode } = Tree;
let newFiled; 

function FormRow(props){
  const { fields, removeField } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 }
    },
    wrapperCol: {
      xs: { span: 24 }
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
              removeField(index);
            }}
          />
        </div>
    </Row>
    
  </div>
  );
  return (listField);
}
  

class DynamicFieldSet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newFiled: {},
      loanding: false,
      modalConfigFild: false,
      collapsed: false,

      model: { 
        name: undefined,
        timestamps: false,
        structure: [], 
      },
      banner:{
        visible: false,
        message: 'Error'
      }
    };
    this.id = 0;
    this.handleProcessFieldStructure = this.handleProcessFieldStructure.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleModalOK = async() => {
    const { name } = this.state.model;
    if(name && name != undefined && name != '' && typeof newFiled == 'object' && newFiled.type ){
      if( typeof newFiled == 'object'){
        await this.setState(state => {
          const structure  = state.model.structure.push(newFiled);
          return {
            modalConfigFild: !state.modalConfigFild,
            structure,
            banner:{
              visible: false,
              message: undefined
            }
          }
        });
        console.log('true new: ', newFiled);
        newFiled = undefined;
      }
    }else if( !newFiled || !newFiled.type){
      boxMessage.error('Error: field structure requires type and name');
      newFiled = undefined;
    }else{
      await this.setState({
        banner:{
          visible: true,
          message: 'Error: structure name modal is undefined'
        }
      });
      newFiled = undefined;
    }
  };
  
  handleModal = async() => {
    const { name } = this.state.model;
    if(name && name != undefined && name != ''){
      await this.setState({ 
        modalConfigFild: !this.state.modalConfigFild
      });
      newFiled = undefined;
    }else{
      await this.setState({
        banner:{
          visible: true,
          message: 'Error: structure name modal is undefined'
        }
      });
      newFiled = undefined;
    }
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

  processModel(){
    const { name, structure, timestamps} = this.state.model
    let new_model = {
      name,
      timestamps: timestamps ? timestamps : false,
      structure: {

      }
    };
    structure.forEach((value, index, modelJson)=>{
      let name = value.name;
      modelJson[index].name = undefined;
      new_model.structure[name] = modelJson[index]
      console.log(new_model);

    });

    return new_model;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields( async(err, values) => {
      if (!err) {
        this.setState({ loanding:true })
        const newModel = await this.processModel();
        const response = await modelAxios.create(newModel);
        const {verbatim, structure, message, name } = response;

        console.log(name,response)
        if(structure && name ){ 
          boxMessage.success(message);
          setTimeout(()=>{ 
            this.stateInizialize();
          }, 3000);
        }else{
          boxMessage.error(message);
          this.setState({ loanding:false })
        }
        console.log(response);
      }
    });
  };

  handleRemoveField = async(index) =>{
    const { name } = this.state.model;
    if(name && name != '' && index >= 0){
      await this.setState(state => {
        const structure  = state.model.structure.splice(index, 1);
        return {
          structure
        }
      });
      console.log('handleRemoveField: ', index);
      newFiled = undefined;
    }else{
      boxMessage.error('Error: requires index');
      newFiled = undefined;
    }
  };

  stateInizialize(){
    this.setState({
      newFiled: {},
      loanding: false,
      modalConfigFild: false,
      collapsed: false,

      model: { 
        name: undefined,
        timestamps: false,
        structure: [], 
      },
      banner:{
        visible: false,
        message: 'Error'
      }
    });
  }
  handleProcessFieldStructure(field){
    const {params } = field;
    newFiled = {} = params;
    //console.log(newFiled);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  render() {
    let { routes } = this.props;
    let { model, loanding }= this.state;
    let { name, structure }= model;

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24},
        sm: { span: 8},
        md: { span: 6},
      },
    };
 
    return (
      <div className='input-create-schema'>
        <div className={loanding ? 'subloanding' : ''} />
        { 
          (this.state.banner.visible) ?
            <Alert 
              message={this.state.banner.message} 
              banner
            />
          : null
        }
        <Title toBack={false} 
        title={`New schema: ${name ? name : '' }`}
          headsubTitle ={`${structure.length} ${structure.length >1 ? 'fields' : 'fild'} in schema`}
          subTitle={`${name ? name : 'undefined schema' }`}
        />
        <div className="container-page">
          <div style={{ padding: '20px', backgroundColor: '#CCC', display:'none'}}>
            <pre className="language-bash">{JSON.stringify(model, null, 2)}</pre>
          </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
          <div style={{ marginBottom: '0px' }}>
            <Input onChange={ (e)=> this.handleChange(e) } 
              addonBefore="Schema name"
              placeholder={'User, employee, client or product'}
            />
          </div>
          </Form.Item>
          <FormRow fields={structure} removeField={this.handleRemoveField}/>
          
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.handleModal.bind(this)} disabled={(!name) ? true : false} style={{ width: '100%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel} >
            <Button type="primary" htmlType="submit" disabled={(!structure.length) ? true : false} style={{ width: '100%' }}>
              Create schema
            </Button>
          </Form.Item>
        </Form>
        {(this.state.modalConfigFild) ?<Modal
        style={{ top: 20 }}
          title={`Advanced validations`}
          visible={this.state.modalConfigFild}
          onOk={this.handleModalOK.bind(this)}
          //okButtonProps={{ disabled: (typeof newFiled) ? true: false }}
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

*/