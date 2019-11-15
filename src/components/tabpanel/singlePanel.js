import React  from 'react';
import { Col, Input, Modal, Tabs, Button, Select, message, Row} from 'antd';

const { TabPane } = Tabs;
const { Component } = React;
const { Option } = Select;

class SinglePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          field:{
            name: false,
            type: false
          }
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    onSelect(value) {
      this.setState(prevState => ({
          field: {...prevState.field, type: value}
        }));
    }
    
    oInput(event) {
      this.setState({ 
        field: {
          name: event.target.value
        }
      });
    }
   
    render() {
        let { fieldsState, fieldsEvente } = this.props;
        var field ={};
        (this.state.field.type && this.state.field.name ) ? 
          field = this.state.field :
          field = null;
        //console.log(fieldsState, fieldsEvente);
      return (
          <div>
              <pre>
                {
                  JSON.stringify(this.state, null, 2)
                }
              </pre>
              <Row>
                <Col className="colInput" xs={24}>
                    <Input size="large"
                      onChange={this.oInput.bind(this)} 
                      addonBefore="Field name" 
                      placeholder="example field name: name, surname or gender" />
                </Col>
                <Col className="colInput" xs={24}>
                  <Select size={'large'} 
                  defaultValue="" 
                  onChange={this.onSelect.bind(this)} style={{ width: 200 }}>
                    <Option value="" disabled>type of data</Option>
                    <Option value="String">String</Option>
                    <Option value="Number">Number</Option>
                    <Option value="Date">Date</Option>
                    <Option value="Buffer">Buffer</Option>
                    <Option value="Boolean">Boolean</Option>
                    <Option value="Mixed">Mixed</Option>
                    <Option value="ObjectId">ObjectId</Option>
                    <Option value="Array">Array</Option>
                    <Option value="Decimal128">Decimal128</Option>
                    <Option value="Map">Map</Option>
                  </Select>
                </Col>
                <Col className="colInput" xs={24}>
                  <Button style={{  float: 'right'  }}
                    onClick={()=>fieldsEvente(field)}
                    icon="search">validate field
                  </Button>
                </Col>
              </Row>
          </div>
      );
    }
}
export default SinglePanel;