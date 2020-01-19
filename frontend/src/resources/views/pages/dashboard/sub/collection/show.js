import React, { Component } from "react";
import { 
  Select, 
  Icon, 
  Button, 
  message as boxMessage, 
  Collapse, 
  Tabs,
  Skeleton,
  Card,
  Avatar} from "antd";
import inflec from "inflection";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";
import EditableTable from "../../../../../../components/tables/tableEditable"
//import SessionStorage from "../../../../../../services/storage/session";
import LocalStorage from '../../../../../../services/storage/local';
//import typeData from '../../../../../json/type_data';
import columns from '../../../../../json/columns_data';
import rows from  '../../../../../json/rows_data';
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
const { TabPane }    = Tabs;
const { Meta } = Card;

class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      collapsed: false,
      loanding: true,
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
    this.renderColumns  = columns(this.state.collection);
    this.renderRows     = rows(this.state.collection);
    this.dataComparison = this.dataComparison.bind(this);
    this.handleStateDefault     = this.handleStateDefault.bind(this);
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
    const { name, collection } = await this.state;
    const response = await modelAxios.show(name);
    const { model, verbatim, structure, message } = response;
    const comparison = !this.dataComparison(structure, this.state.collection);
    this.setState({ loanding: true});
  
    if(comparison){
      boxMessage.loading('updating collection list, please wait a moment', 1.5);
    }
    //console.log('Type: ' , this.state.collection)

    setTimeout(()=>{
      this.handlestatePreparer(model, verbatim, structure, message, true);
    }, 2000);
    
  };

  handlestatePreparer(model, verbatim, structure, message, comparison){
    if((typeof verbatim) == 'object' && (typeof structure) == 'object' ){ 
      if(comparison){ boxMessage.success(message) }
        this.handleUpdateCollection(structure);
        console.log({structure})
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
          title={`Schema: ${params.name }`}
          headsubTitle ={`Structure view:`}
          subTitle="Schema fields"
          buttons={buttonTitle}
          history={history}
        />
        <div className="container-page">
        {//<div className={loanding ? 'subloanding' : ''} />
        }
        <Tabs defaultActiveKey="2" type="card">
          <TabPane 
            tab={
              <span>
                <Icon type="pic-right" />
                Structure JSON
              </span>
            }
            key="1"
          >
            <Skeleton loading={loanding} active>
              {
                (typeof collection == 'object') ? 
                <pre>
                  {
                    JSON.stringify(collection, null, 4)
                  }
                </pre>: null
                
              }
            </Skeleton>
            
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type="bars"/>
                Structure component
              </span>
            }
            key="2"
          >
            <Skeleton loading={loanding} active>
            {
              (typeof collection == 'object') ? 
              <EditableTable
              columns={columns(collection)}
              rows={rows(collection)}
              count={rows(collection).lengths}
              /> : null
              
            }
            </Skeleton>
          </TabPane>
        </Tabs>
        </div>
      </div>
    );
  }
}


export default DashboardPage;
/**
 * <table>
              <thead>
                <tr>
                  {
                    collection ? (
                      columns(collection).map((item, index)=>{
                        return <th key={index} type={item.type}>
                          {
                            item.title
                          }
                        </th>
                      })
                    ): null
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Lennon</td>
                  <td>Rhythm Guitar</td>
                </tr>
              </tbody>
            </table>
 *         <Panel 
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
              
              <EditableTable 
                columns={this.handleColumn(collection)} 
                data={rows(collection)}
                count={rows(collection).length || 0}
              />
            </div>
          </Panel>
 * <Table columns={this.handleColumn(collection)} dataSource={rows(collection)} scroll={{ x: 1500}} />
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
