import React, { Component } from "react";
import { 
  Select, 
  Icon, 
  Button, 
  message as boxMessage, 
  Collapse, 
  Table} from "antd";
import inflec from "inflection";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";
//import SessionStorage from "../../../../../../services/storage/session";
import LocalStorage from '../../../../../../services/storage/local';
//import typeData from '../../../../../json/type_data';
import Columns from '../../../../../json/columns_data';
import propertys from  '../../../../../json/propertys_data';
import services from '../../../../../../services' ;



function callback(key) {
  console.log(key);
}

const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const { modelAxios }  = services;
const { Panel }       = Collapse;
const { Option }      = Select;


class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collection: LocalStorage.get(this.props.match.params.name) || [],
      collapsed: false,
      loanding: false,
      message: false,
      success: false,
      error: false,
      alert: false,
      name: this.props.match.params.name || false,
      buttonTitle: [
        {
          icon: 'delete',
          url: '/create',
          tooltip: 'Delete collection'
        },
        {
          icon: 'edit',
          url: '/create',
          tooltip: 'Edit collection'
        },
        {
          icon: 'unordered-list',
          url: `/dashboard/documents/${this.props.match.params.name}`,
          tooltip: 'See list of documents'
        }
        
      ]
    };
    this.dataComparison = this.dataComparison.bind(this);
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
  }

  componentDidMount(){
    this.handlecollection();
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collection.length);
  }

  dataComparison(collection_response = [], collection_state = []){
    let CR = JSON.stringify(collection_response); 
    let CS = JSON.stringify(collection_state);
    let isComparison = (CR === CS);
    return isComparison;
  }

  handlecollection = async()=>{
    const { name } = await this.state;
    const response = await modelAxios.show(name);
    const { model, verbatim, structure, message } = response;
    const comparison = !this.dataComparison(structure, this.state.collection);
    this.setState({ loanding: true});
    //console.log('Type: ' ,(typeof response))
    if(comparison){
      boxMessage.loading('updating collection list, please wait a moment', 1.5);
    }

    setTimeout(()=>{
      this.handlestatePreparer(model, verbatim, structure, message, comparison);
    }, 2000);
    
  };

  handlestatePreparer(model, verbatim, structure, message, comparison){
    if((typeof verbatim) == 'object' && (typeof structure) == 'object' ){ 
      if(comparison){ boxMessage.success(message)}
      this.handleUpdateCollection(structure);
    }else{
      boxMessage.error(message)
      this.handleUpdateCollection([]);
      LocalStorage.remove(this.state.name);
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(collection){
    this.setState({collection});
    LocalStorage.set(this.state.name, collection);
  }

  handleStateDefault(){
    this.setState({
      loanding: false,
      success: false,
      message: false,
      error: false
    });
  }

  handleColumn(data){
    let columns = Columns(data)
    columns.push({
        title: 'Config',
        key: 'config',
        fixed: 'right',
        width: 75,
        render: () => 
        <Button type="primary" shape="circle" icon="setting" />,
    })
    //console.log(columns, data)
    return columns;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', fieldsValue);
    });
  };

  render() {
    //const { getFieldDecorator } = this.props.form;
    let { collection, loanding, buttonTitle } = this.state;
    let { routes, match, history } = this.props;
    let { params } = match;

    //console.info(this.props)

    return (
      <div className="content-sub-page">
        <Title toBack={false} 
          title={`Collection: ${params.name }`}
          headsubTitle ={`10 Documents `}
          subTitle="list of documents"
          buttons={buttonTitle}
          history={history}
        />
        <div className="container-page">
        <div className={loanding ? 'subloanding' : ''} />
        <Collapse
          defaultActiveKey={1}
          onChange={callback}
          expandIconPosition={'right'}
        >
        <Panel 
        header={<a href="">
          <span style={{
            color: 'var(--color-second-2)',
            fontWeight: "bold"
            }}>Collection in json:
          </span> {params.name } </a>} 
          key={0}
          extra={genExtra()}>
            <div className={"content-props"}>
              <pre>
                {JSON.stringify(collection, null, 4)}
              </pre>
            </div>
          </Panel>
        <Panel 
        header={<a href="">
          <span style={{
            color: 'var(--color-second-2)',
            fontWeight: "bold"
            }}>Structure of collection:
          </span> {params.name } </a>} 
          key={1}
          extra={genExtra()}>
            <div className={"content-props"}>
              <Table columns={this.handleColumn(collection)} dataSource={propertys(collection)} scroll={{ x: 1500}} />
            </div>
          </Panel>
        </Collapse>
        </div>
      </div>
    );
  }
}


export default DashboardPage;
/**
 * {getFieldDecorator(field.toLowerCase(), config)( )}
 * <Row>
                <Col >
                  <Form layout='vertical' {...formItemLayout}>
                  {
                (typeof collection == 'object') ? (
                  this.handleSubtractProperties(collection).map((field, index) => {
                    return (
                    <Form.Item label={field.name} key={index}>
                      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 400 }} />
                            <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            defaultValue={field.type || 'undefined'}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                            }
                            >
                            {
                              typeData.map((type, index)=>{
                                return <Option value={type} key={index}>{type}</Option>
                              })
                            }
                            </Select>
                         
                          </Form.Item>
                        
                          )
                        })
                      ): null
                    }
                  </Form>
                </Col>
              </Row>
 */
