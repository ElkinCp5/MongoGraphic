import React  from 'react';
import ReactDOM from 'react-dom';
import { Card, Modal, Tabs, Select, Button, Input, message, Col, Row} from 'antd';
import './router.css'

import SinglePanel from '../components/tabpanel/singlePanel';

const { TabPane } = Tabs;
const { Component } = React;
const { Option } = Select;
let fieldGlobal;
let schemaMaster ={
  schema_name: '',
  field_collections: [
    {
      field_type:'single',
      field:{
        name:'name',
        type: 'String',
        unique: [true, null],
        max: 10,
        min: 0
      },
      message:{
        unique:'',
        max:'max > this.field.max',
        min: `min > this.field.min`,
      }
    }
  ]
};

const success = (text) => {
  message.success('This is a success '+(text ? text : null), 3);
};
const error = (text) => {
  message.error('This is an error '+(text ? text : null), 3);
};
const warning = (text) => {
  message.warning('This is a warning '+(text ? text : null), 3);
};
const OptionData =[
  {value:"String", name: 'String'},
  {value:"Number", name: 'Number'},
  {value:"Date", name: 'Date'},
  {value:"Buffer", name: 'Buffer'},
  {value:"Boolean", name: 'Boolean'},
  {value:"Mixed", name:'Mixed'},
  {value:"ObjectId", name:'ObjectId'},
  {value:"Array", name: 'Array'},
  {value:"Decimal128", name: 'Decimal128'},
  {value:"Map", name: 'Map'}
];
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      schema: null,
      listField: [], 
      visible: false,
      confirmLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ confirmLoading: true,});

    setTimeout(() => {
      this.state.field ?
      this.setState(prevState => ({
        listField: [...prevState.listField, this.state.field],
        visible: false,
        confirmLoading: false 
      }))
      : this.setState({ confirmLoading: false });
    }, 1000);

  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  createUI(){
  let Field = this.state.listField;
   if(Field)
     return  (<Row> {Field.map((el, i) =>
      <div key={i}>
          <Col className="colInput">
            <Input size="large" value={el.name} addonBefore="Field name"
                onChange={this.handleChange.bind(this, i)}  
                      placeholder="example field name: name, surname or gender" />
          </Col>
          <Col key={i} className="colInput">
            <Select size={'large'} 
                  defaultValue={el.type}
                  onChange={this.onSelect.bind(this, i)} style={{ width: 200 }}>
              {
                OptionData.map((option, index)=>{
                  return <Option value={option.value} key={index}>{option.name}</Option>
                })
              }      
            </Select>        
            <Button shape="circle" icon="delete" onClick={this.removeClick.bind(this, i)} />
          </Col> 
          <hr/>
      </div>          
    )}</Row>)
  }

  handleChange(i, event) {
     let updateName = [...this.state.listField];
     updateName[i].name = event.target.value;
     this.setState({ updateName });
  }

  handleShangeSchemaName(event) {
    event.target.value ?
    this.setState({ 
      schema: event.target.value
    }) :
    this.setState({ 
      schema: null
    });
  }

  onSelect(i, value) {
    let updateType = [...this.state.listField];
    updateType[i].type = value;
    this.setState({ updateType });
  }

  handleValidate(field){
    if(field) this.setState({ field })
      else this.setState({ 
        confirmLoading: false 
      });

    if(!field) error('field: undefined and is required')
      else success('Schemas update')
  };
  
  removeClick(i){
     let schema = [...this.state.listField];
     schema.splice(i,1);
     this.setState({ schema });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.listField.join(', '));
    event.preventDefault();
  }

  render() {
    //let test = {una: 'mamam'};
    //console.log(JSON.stringify(test).replace('{', '').split(":", 1)[0]);
    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px', minHeight:'100vh' }}>
          
          <Card title={'Creator of schemas'} extra={
              <Button shape="circle" icon="plus" onClick={this.showModal} />
            }
            actions={[
              <Button shape="circle" icon="save" size="large" htmlType="submit" />
            ]}
            bordered={false} 
            
            style={{ width: 500, margin:'auto' }}>
              <Row>
                <Col className="colInput">
                  <Input id={'shemaname'}size="default" addonBefore="shcema"
                     onChange={this.handleShangeSchemaName.bind(this)}   
                      placeholder="as a user, employeer etc..."
                      //style={{ width:'200px'}} 
                  />
                </Col>
              </Row>
              <Tabs style={{ minHeight: '200px'}} defaultActiveKey="1">
                <TabPane tab="JSON" key="1">
                  <pre>
                    {
                      JSON.stringify(schemaMaster, null , 2)
                    }
                  </pre>
                </TabPane>
                <TabPane tab="FORM" key="2">
                  <form onSubmit={this.handleSubmit}>
                    {this.createUI()}        
                  </form>
                </TabPane>
              </Tabs>
          </Card>

          <Modal
            title="Title"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          >
            <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ minHeight: 220 }}>
              <TabPane tab='Validation' key={1}>
                <h1>simple field</h1>
                <SinglePanel 
                  fieldsState={this.state.field} 
                  fieldsEvente={this.handleValidate}
                />
                <br/>
                <span>
                  It is a long established fact that a reader will 
                  be distracted by the readable content of a page when 
                  looking at its layout. The point of
                </span>
              </TabPane>
            </Tabs>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
