import React  from 'react';
import ReactDOM from 'react-dom';
import { Card, Modal, Tabs, Button, message} from 'antd';
import './router.css'

import SinglePanel from '../components/tabpanel/singlePanel';

const { TabPane } = Tabs;
const { Component } = React;
let fieldGlobal;


const success = (text) => {
  message.success('This is a success '+(text ? text : null), 3);
};
const error = (text) => {
  message.error('This is an error '+(text ? text : null), 3);
};
const warning = (text) => {
  message.warning('This is a warning '+(text ? text : null), 3);
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      schemaJson: [], 
      visible: false,
      confirmLoading: false,
      mode: 'left',

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
        schemaJson: [...prevState.schemaJson, this.state.field],
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
     return this.state.schemaJson.map((el, i) => 
         <div key={i}>
            <input type="text"    onChange={this.handleChange.bind(this, i)} />
            <Button shape="circle" icon="delete" onClick={this.removeClick.bind(this, i)} />
         </div>          
     )
  }

  handleChange(i, event) {
     let schemaJson = [...this.state.schemaJson];
     schemaJson[i].name = event.target.value;
     this.setState({ schemaJson });
  }
  // Tabs style
  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  handleValidate(field){
    if(field) this.setState({ field })
      else this.setState({ 
        confirmLoading: false 
      });

    if(!field) error('field: undefined and is required')
      else success('Schemas update')
  };
  
  removeClick(i){
     let schemaJson = [...this.state.schemaJson];
     schemaJson.splice(i,1);
     this.setState({ schemaJson });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.schemaJson.join(', '));
    event.preventDefault();
  }

  render() {
    const { mode } = this.state;
    let test = {una: 'mamam'};
    console.log(JSON.stringify(test).replace('{', '').split(":", 1)[0]);
    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px', minHeight:'100vh' }}>
          
          <Card title="Creator of schemas" 
            extra={
              <Button shape="circle" icon="plus" onClick={this.showModal} />
            }
            bordered={false} 
            style={{ width: 500, margin:'auto' }}>
              <pre>
                {
                  JSON.stringify(this.state, null , 4)
                }
              </pre>
            <form onSubmit={this.handleSubmit}>
              {this.createUI()}        
              <Button icon="save" htmlType="submit" >Save</Button>
            </form>
          </Card>
          <Modal
            title="Title"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          >
            <Tabs defaultActiveKey="1" tabPosition={mode} style={{ minHeight: 220 }}>
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
