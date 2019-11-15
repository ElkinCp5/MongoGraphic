import React  from 'react';
import { Col, Input, Modal, Tabs, Button, Select, message, Row} from 'antd';

const { TabPane } = Tabs;
const { Component } = React;
const { Option } = Select;

class SinglePanel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          schemaJson: [], 
          visible: false,
          confirmLoading: false,
          mode: 'left',
          property: {
            column: '',
            config:{
              type: 'String',
              required: null
            }
          }
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(value) {
      console.log(`selected ${value}`);
    }
    
    onBlur() {
      console.log('blur');
    }
    
    onFocus() {
      console.log('focus');
    }
    
    onSearch(val) {
      console.log('search:', val);
    }

    render() {
        let { fields } = this.props;
        fields = { name: 'String'}
        console.log(fields);
      return (
          <div>
            
              <Row>
                <Col className="colInput" xs={24}>
                    <Input addonBefore="Field name" placeholder="example field name: name, surname or gender" />
                </Col>
                <Col className="colInput" xs={24}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a type of data"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
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
                  <Button style={{ 
                    float: 'right' 
                  }}
                    icon="search">validate field
                  </Button>
                </Col>
              </Row>
          </div>
      );
    }
}
export default SinglePanel;