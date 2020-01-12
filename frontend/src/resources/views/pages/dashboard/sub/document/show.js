import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Button, Input, message as boxMessage, List, Collapse } from "antd";
import inflec from "inflection";


/* Import Custom Components */
import SessionStorage from "../../../../../../services/storage/session";
import LocalStorage from '../../../../../../services/storage/local';
import services from '../../../../../../services' ;
import { HtitleHeader as Title } from "../../../../../../components/header";

let buttonTitle = [
  {
    icon: 'delete',
    url: '/create'
  },
  {
    icon: 'edit',
    url: '/create',
    tooltip: ''
  },
  {
    icon: 'unordered-list',
    url: '/create'
  }
  
];

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

const { documentAxios } = services;
const { Panel }         = Collapse;

class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      documents: LocalStorage.get('documents') || [],
      collapsed: false,
      loanding: false,
      message: false,
      success: false,
      error: false,
      alert: false,
      name: this.props.match.params.name || false
    };
    this.dataComparison = this.dataComparison.bind(this);
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
  }

  componentDidMount(){
    this.handleDocuments();
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collections.length);
  }

  dataComparison(documents_response, documents_estate){
    documents_response.sort(); 
    documents_estate.sort();
    let isComparison = (JSON.stringify(documents_response) === JSON.stringify(documents_estate));
    return isComparison;
  }

  handleDocuments = async()=>{
    const { name } = await this.props.match.params;
    const response = await documentAxios.index(name);
    const { documents, message } = response;
    const comparison = !this.dataComparison(documents, this.state.documents);
    this.setState({ loanding: true});

    if(comparison){
      boxMessage.loading('updating collection list, please wait a moment', 1.5);
    }

    setTimeout(()=>{
      this.handlestatePreparer(documents, message, comparison);
    }, 2000);
    
  };

  handlestatePreparer(res, msg, comp){
    if(res.length){ 
      if(comp){ boxMessage.success(msg)}
      this.handleUpdateCollection(res);
    }else if(res.length && res.length <= 0){ 
      boxMessage.success('Empty document list');
      this.handleUpdateCollection(res);
    }else{
      boxMessage.error(msg)
      this.handleUpdateCollection([]);
      LocalStorage.remove('documents');
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(documents){
    this.setState({documents});
    LocalStorage.set('documents', documents);
  }

  handleStateDefault(){
    this.setState({
      loanding: false,
      success: false,
      message: false,
      error: false
    });
  }

  handleSubtractProperties(data){
    let result = [];
     for(var i in data){
      result.push([[i], data[i]])
     }
    return result;
  }

  render() {
    let { documents, loanding } = this.state;
    let { routes, match } = this.props;
    let { params } = match;
    
    //console.log(this.documents);
  
    return (
      <div className="content-sub-page">
        <Title toBack={false} 
          title={`Collection: ${params.name }`}
          headsubTitle ={`10 Documents `}
          subTitle="list of documents"
          buttons={buttonTitle}
        />
        <div className="container-page">
        <div className={loanding ? 'subloanding' : ''} />
        <Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={'right'}
        >
          {
            documents.length ? (
              documents.map((document, index) => {
                return <Panel 
                header={<a href="">
                  <span style={{
                  color: 'var(--color-second-2)',
                  fontWeight: "bold"}}>ObjecId:
                  </span> {document._id}
                  </a>} 
                key={document._id} 
                extra={genExtra()}>
                  <div className={"content-props"}>
                    {
                      (this.handleSubtractProperties(document)) ? (
                        <List
                        itemLayout="horizontal"
                        dataSource={this.handleSubtractProperties(document)}
                        renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Icon type="unordered-list" />}
                                title={<a href=""><span style={{
                                  color: 'var(--color-second-3)',
                                  fontWeight: "bold"
                                }}>item: </span> {item}</a>}
                              />
                            </List.Item>
                          )}
                        />
                      ): null
                    }

                  </div>
                </Panel>
              })
            ): null
          }
          
        </Collapse>
        </div>
      </div>
    );
  }
}


export default DashboardPage;

/*
<Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={'right'}
        >
          {
            documents.length ? (
              documents.map((document, index) => {
                return <Panel 
                header={<a href="">
                  <span style={{
                  color: 'var(--color-second-2)',
                  fontWeight: "bold"}}>ObjecId:
                  </span> {document._id}
                  </a>} 
                key={document._id} 
                extra={genExtra()}>
                  <div className={"content-props"}>
                    {
                      (this.handleSubtractProperties(document)) ? (
                        <List
                        itemLayout="horizontal"
                        dataSource={this.handleSubtractProperties(document)}
                        renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Icon type="unordered-list" />}
                                title={<a href=""><span style={{
                                  color: 'var(--color-second-3)',
                                  fontWeight: "bold"
                                }}>item: </span> {item}</a>}
                              />
                            </List.Item>
                          )}
                        />
                      ): null
                    }

                  </div>
                </Panel>
              })
            ): null
          }
          
        </Collapse>

*/