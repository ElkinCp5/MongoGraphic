import React  from 'react';
import { Card, Modal, Button, message} from 'antd';
import './App.css';

const success = (text) => {
  message.success('This is a success '+(text ? text : null), 3);
};

const error = (text) => {
  message.error('This is an error '+(text ? text : null), 3);
};

const warning = (text) => {
  message.warning('This is a warning '+(text ? text : null), 3);
};

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      schemaJson: [], 
      visible: false,
      confirmLoading: false,
      property: {
        column: '',
        config:{
          type: 'String',
          required: null
        }
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
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
            <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
         </div>          
     )
  }

  handleChange(i, event) {
     let schemaJson = [...this.state.schemaJson];
     schemaJson[i].column = event.target.value;
     this.setState({ schemaJson });
  }

  addClick(){
    this.state.property ?
    this.setState(prevState => ({
      schemaJson: [
        ...prevState.schemaJson, this.state.property 
      ]
    }))
    
    : error('property: undefined');
  }

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
    let file = {
      column: '',
      config:{
        type: 'String',
        required: null
      }
    }
    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px', height:'100vh' }}>
          
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
              <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
              
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
            <p>Hola Mama </p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
